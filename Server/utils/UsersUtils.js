const ServerError = require('../errors/ServerError');
const ErrorType = require('../errors/errorType');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

const config = require('../config/config.json');
const usersCache = require('../cache/UserDataCache');


class UsersUtils {
    constructor() {};

    // ----- Validations

    static validateUserID = ID => {
        if (typeof ID === "number") {
            const IDToString = ID.toString();
            if (IDToString.length == 9) {
                return true;
            }
            throw new ServerError(ErrorType.INVALID_ID_LENGTH)
        }
        throw new ServerError(ErrorType.INVALID_ID);
    };
    
    static validateUserEmail = email => {
        if (typeof email === "string") {
            const trimmedEmail = email.trim();
        
            // validating the email is in valid format, using RegExp
            const emailRegExp = /\S+@\S+\.\S+/;
            const isEmailRegExpValid = emailRegExp.test(trimmedEmail);
    
            if (isEmailRegExpValid) {
                if (trimmedEmail.length <= 35) {
                    return true;
                }
                throw new ServerError(ErrorType.INVALID_EMAIL_LENGTH);
            }
            throw new ServerError(ErrorType.INVALID_EMAIL_FORMAT);
        }
        throw new ServerError(ErrorType.INVALID_EMAIL_TYPE);
    };
    
    static validateUserPassword = (password, verifiedPassword) => {
        const passwordToString = password.toString();
        const verifiedPasswordToString = verifiedPassword.toString();

        const trimmedPassword = passwordToString.trim();
        const trimmedVerifiedPassword = verifiedPasswordToString.trim();
    
        if (trimmedPassword.length >= 6 && trimmedPassword.length <= 15) {
            if (trimmedPassword === trimmedVerifiedPassword) {
                return true;
            }
            throw new ServerError(ErrorType.PASSWORDS_DO_NOT_MATCH);
        }
        throw new ServerError(ErrorType.INVALID_PASSWORD_LENGTH);
    };
    
    static validateUserFirstName = firstName => {
        if (typeof firstName === "string") {
            const trimmedFirstName = firstName.trim();
    
            if (trimmedFirstName.length >= 2 && trimmedFirstName.length <= 15) {
                return true;
            }
            throw new ServerError(ErrorType.INVALID_FIRST_NAME_LENGTH);
        }
        throw new ServerError(ErrorType.INVALID_FIRST_NAME_TYPE);
    };
    
    static validateUserLastName = lastName => {
        if (typeof lastName === "string") {
            const trimmedLastName = lastName.trim();
    
            if (trimmedLastName.length >= 2 && trimmedLastName.length <= 15) {
                return true;
            }
            throw new ServerError(ErrorType.INVALID_LAST_NAME_LENGTH);
        }
        throw new ServerError(ErrorType.INVALID_LAST_NAME_TYPE);
    };
    
    static validateUserCity = city => {
        if (typeof city === "string") {
            const trimmedCity = city.trim();
    
            if (trimmedCity.length >= 2 && trimmedCity.length <= 15) {
                return true;
            }
            throw new ServerError(ErrorType.INVALID_CITY_LENGTH);
        }
        throw new ServerError(ErrorType.INVALID_CITY_TYPE);
    };
    
    static validateUserStreet = street => {
        if (typeof street === "string") {
            const trimmedStreet = street.trim();
    
            if (trimmedStreet.length >= 2 && trimmedStreet.length <= 15) {
                return true;
            }
            throw new ServerError(ErrorType.INVALID_STREET_LENGTH);
        }
        throw new ServerError(ErrorType.INVALID_STREET_TYPE);
    };

    
    // ----- Hashing

    /**
     * This function salts a password
     * @param password of type `string`
     */
    static getSaltedPassword = password => {
        const leftPasswordSalt = '!@$g00gl3A$$i$t4nt$@!';
        const rightPasswordSalt = 'I-L0v3-Fu115t4ck';
        const saltedPassword = leftPasswordSalt + password + rightPasswordSalt;

        return saltedPassword;
    };

    /**
     * This function accepts a salted password (or a regular `string` password) and returns a hashed password
     * @param saltedPassword of type `string`
     */
    static generateHashedPassword = saltedPassword => {
        return crypto.createHash('md5').update(saltedPassword).digest('hex');
    };

    /**
     * Generating a salted email based on a regular email. Can be used with normal `string`
     * @param email of type `string`
     */
    static generateSaltedEmail = email => {
        const leftSalt = `b12%e3&$n!`;
        const rightSalt = 'xHzG$!*^&!';
        const saltedUserName = leftSalt + email + rightSalt;
    
        return saltedUserName;
    };

    /**
     * Generating a JWT token using an email of type `string` and a secret of type `json`. Can be used with normal `string`
     * @param saltedEmail - of type `string` and an `Email` format - `address@hosting.com`
     */
    static generateJWTtoken = saltedEmail => {
        return jwt.sign( { sub: saltedEmail }, config.secret);
    }


    // ----- Is logged checker

    static isUserLoggedIn = (request) => {
        const authorizationString = request.headers['authorization'];
        const token = authorizationString.substring("Bearer ".length);
        const userCacheData = usersCache.get(token);
        if (userCacheData !== undefined) {
            return true;
        }
        return false;
    }


    // ----- Caching

    /**
     * Saves a succesfull login response from the DB into the users cache
     * @param succesfulLoginServerResponse - of type `succesfulLoginServerResponse`
     */
    static saveUserInfoToServerCache = (token, succesfulLoginServerResponse) => {
        usersCache.set(token, succesfulLoginServerResponse)
    }

    static extractUserInfoFromCache = (request) => {

        // Attempting to get the user from the server's cache, from the Token received from the client
        const authorizationString = request.headers['authorization'];
        const token = authorizationString.substring("Bearer ".length);
        const userCacheData = usersCache.get(token);

        // If the token that was sent was not found, alert the client that the user is no longer logged in
        if (userCacheData === undefined) {
            throw new ServerError(ErrorType.USER_IS_NOT_LOGGED_IN);
        }
        return userCacheData;
    }

    static deleteUserFromCache = (request) => {
        // Attempting to get the user from the server's cache, from the Token received from the client
        const authorizationString = request.headers['authorization'];
        const userToken = authorizationString.substring("Bearer ".length);
        const userCacheData = usersCache.get(userToken);

        // If the token that was sent was not found, alert the client that the user is no longer logged in
        if (userCacheData === undefined) {
            throw new ServerError(ErrorType.USER_IS_NOT_LOGGED_IN);
        }
        usersCache.delete(userToken);
    }
}


module.exports = UsersUtils;