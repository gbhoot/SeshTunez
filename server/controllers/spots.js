var client_id = "1e530d7e14fc4d2986e6d3554dd3bb83",
    client_secret = "3c673f6446cd418f894b78e9d0d77a8c",
    spotifyWebAPI = require('spotify-web-api-node'),
    Sesh = require('../models/sesh.js');

var spotifyAPI = new spotifyWebAPI({
    clientId: client_id,
    clientSecret: client_secret
});

module.exports = {
    songSearch: function(req, res) {
        let sid = req.params.id;
        let query = req.body['query'];
        spotifyAPI.clientCredentialsGrant().then(
            function(data) {
                // Save the access token so that it's used in future calls
                spotifyAPI.setAccessToken(data.body['access_token']);
                spotifyAPI.searchTracks(query).then(
                    function(data) {
                        let items = data.body['tracks']['items'];
                        let idx = Math.floor(Math.random() * 9);
                        let song = items[idx];
                        let response = {
                            message: "Success",
                            song: song
                        };
                        res.json(response);
                    }, function(error) {
                        console.log("There was an issue: ", error);
                        res.json(error);
                    }
                )
            }
        )
    }
}

