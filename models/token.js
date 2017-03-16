var tokens = []

class Token { 
  constructor(tokenID, createDate, active, userID) {
    this.tokenID = tokenID;
    this.createDate = createDate;
    this.active = active;
    this.userID = userID;
  }

  static createToken(userID){
    var tokenID = CreateGUID();
    tokens.push(tokenID, Date.now(), true, userID);
    return tokenID;
  }

  static login(username, password){

  }

  static logoff(tokenID){

  }

  static changeStatus(TokenID){
    var token = tokens.find(o => o.tokenID === tokenID);
    var index = tokens.indexOf(token);
    tokens[index].active = false;
  }

  S4() {
    return (((1+Math.random())*0x10000)|0).toString(16).substring(1); 
  }

  CreateGUID(){
    return (S4() + S4() + "-" + S4() + "-4" + S4().substr(0,3) + "-" + S4() + "-" + S4() + S4() + S4()).toLowerCase();
  }
}

tokens.push(createToken(1));

module.exports = Token;