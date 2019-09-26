const superagent = require('superagent');
const fs = require('fs');
const request = require('request');

console.log('Début de la mise à jour de l\'image !');
getAPODImage().then((data) => {
    download(data.url, 'apod.jpg', (err) => {
    if (err) {
        console.error(err);
        return;
    }
    console.log('Téléchargement terminé !');
})
});

function getAPODImage() {
	return new Promise((resolve, reject) => {
		superagent.get(`https://api.nasa.gov/planetary/apod?concept_tags=false&api_key=yournasaapikey`)
			.end((err, res) => {
				if (err) return reject(err);
				return resolve(res.body);
			});
	});
}

function download(url, dest, cb) {
    const file = fs.createWriteStream(dest);

    const sendReq = request.get(url);

    sendReq.on('response', (response) => {
        if (response.statusCode !== 200) {
            return cb(response.statusCode);
        }
    });

    sendReq.on('error', (err) => {
        fs.unlink(dest);
        cb(err.message);
    });

    sendReq.pipe(file);

    file.on('finish', () => {
        file.close(cb);
    });

    file.on('error', (err) => {
        fs.unlink(dest);
        cb(err.message);
    });
};