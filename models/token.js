var tokens = []

class Token { 
  constructor(tokenId, createDate, active, userId) {
    this.tokenId = tokenId;
    this.createDate = createDate;
    this.active = active;
    this.userId = userId;
  }

  static createToken(userId){
    var tokenId = this.CreateGUID();
    tokens.push(new Token(tokenId, Date.now(), true, userId));
    return tokenId;
  }

  static changeStatus(tokenId){
    var token = tokens.find(function(o){ return o.tokenId==tokenId;});

    if(token==undefined)
      return false;

    var index = tokens.indexOf(token);
    tokens[index].active = false;

    return true;
  }

  static checkUser(tokenId){
    var token = tokens.find(function(o){ return o.tokenId == tokenId && o.active == true;});

    if(token==undefined)
      return false;

    return true;
  }

  static getActiveTokenByUserId(userId) {
    var token = tokens.find(function(o){ return o.userId==userId && o.active==true;});
       
    if(token==undefined)
      token = -1;

    return token;
  }

  static S4() {
    return (((1+Math.random())*0x10000)|0).toString(16).substring(1); 
  }

  static CreateGUID(){
    return (this.S4() + this.S4() + "-" + this.S4() + "-4" + this.S4().substr(0,3) + "-" + this.S4() + "-" + this.S4() + this.S4() + this.S4()).toLowerCase();
  }
}

module.exports = Token;