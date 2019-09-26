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
    // on créé un stream d'écriture qui nous permettra
    // d'écrire au fur et à mesure que les données sont téléchargées
    const file = fs.createWriteStream(dest);

    // on lance le téléchargement
    const sendReq = request.get(url);

    // on vérifie la validité du code de réponse HTTP
    sendReq.on('response', (response) => {
        if (response.statusCode !== 200) {
            return cb('Response status was ' + response.statusCode);
        }
    });

    // au cas où request rencontre une erreur
    // on efface le fichier partiellement écrit
    // puis on passe l'erreur au callback
    sendReq.on('error', (err) => {
        fs.unlink(dest);
        cb(err.message);
    });

    // écrit directement le fichier téléchargé
    sendReq.pipe(file);

    // lorsque le téléchargement est terminé
    // on appelle le callback
    file.on('finish', () => {
        // close étant asynchrone,
        // le cb est appelé lorsque close a terminé
        file.close(cb);
    });

    // si on rencontre une erreur lors de l'écriture du fichier
    // on efface le fichier puis on passe l'erreur au callback
    file.on('error', (err) => {
        // on efface le fichier sans attendre son effacement
        // on ne vérifie pas non plus les erreur pour l'effacement
        fs.unlink(dest);
        cb(err.message);
    });
};