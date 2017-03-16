class Token { 
  constructor(tokenID, token, createdate, active, userID) {
    this.tokenID = tokenID;
    this.token = token;
    this.createdate = createdate;
    this.active = active;
    this.userID = userID;
  }
}

module.exports = Token;