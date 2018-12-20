var client_id = "88dff42612e443f8a8aa5b293bd401d2",
    client_secret = "f44600e7fa5c418d97e73d15362e78a0",
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

