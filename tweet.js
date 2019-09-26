var Twit = require('twit')
const superagent = require('superagent');
const fs = require('fs');
const request = require('request');
 
var T = new Twit({
  consumer_key:         'consumer_key',
  consumer_secret:      'consumer_secret',
  access_token:         'access_token',
  access_token_secret:  'access_token_secret',
  timeout_ms:           60*1000,
  strictSSL:            true,
})

    console.log('Et c\'est partit pour un tweet !');
    getAPODImage().then((jsonapod) => {
    var b64content = fs.readFileSync('apod.jpg', { encoding: 'base64' })
 
    T.post('media/upload', { media_data: b64content }, function (err, data, response) {
      var mediaIdStr = data.media_id_string
      var altText = jsonapod.title + ', ' + jsonapod.copyright
      var meta_params = { media_id: mediaIdStr, alt_text: { text: altText } }
      var status_text = 'Image astronomique du jour : ' + jsonapod.title + '\nCopyright : ' + jsonapod.copyright
 
      T.post('media/metadata/create', meta_params, function (err, data, response) {
        if (!err) {
          var params = { status: status_text, media_ids: [mediaIdStr] }

          T.post('statuses/update', params, function (err, data, response) {
           console.log(data)
         })
        }
     })
    })
  });

function getAPODImage() {
	return new Promise((resolve, reject) => {
		superagent.get(`https://api.nasa.gov/planetary/apod?concept_tags=false&api_key=yourapinasakey`)
			.end((err, res) => {
				if (err) return reject(err);
				return resolve(res.body);
			});
	});
}