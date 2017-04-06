var token = require('./../models/token');

function checkToken(tokenId, res) {
    if (!tokenId) {
        res.status(400)
        res.send("Token not received");
    }

    token.isActive(tokenId, (active) => {
        if (!active) {
            res.status(401);
            res.send("You don't have authorization for this action!");
        }
    });
}

module.exports = checkToken;