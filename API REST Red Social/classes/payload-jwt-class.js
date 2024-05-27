class PayloadJWT {
    constructor(id, role, iat, exp){
        this.id = id;
        this.role = role;
        this.iat = iat;
        this.exp = exp;
    }
}

module.exports = PayloadJWT