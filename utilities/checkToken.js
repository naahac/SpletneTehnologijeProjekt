var Token = require('./../models/token');

function checkToken(tokenId, res, callback) {
    if (!tokenId) {
        res.status(400);
        res.send({success: false, status: "Token not received"});
        callback({success: false});
        return;
    }

    Token.getActiveToken(tokenId, (getActiveTokenResult) => {
        if (!getActiveTokenResult.success) {
            res.status(401);
            res.send({success: false, status: "You don't have authorization for this action!"});
            callback({success: false});
        }else
            callback(getActiveTokenResult);
    });
}

module.exports = checkToken;