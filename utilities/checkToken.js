var Token = require('./../models/token');

function checkToken(tokenId, res, callback) {
    if (!tokenId) {
        res.status(400);
        res.send("Token not received");
        callback(false);
        return;
    }

    Token.getActiveToken(tokenId, (result) => {
        if (!result.success) {
            res.status(401);
            res.send("You don't have authorization for this action!");
            callback(false);
        }else
            callback(true);
    });
}

module.exports = checkToken;