class SuccesfulLoginServerResponse {
    constructor(token, userType, userFirstName) {
        this.token = token,
        this.userType = userType,
        this.firstName = userFirstName
     };
}

module.exports = SuccesfulLoginServerResponse;