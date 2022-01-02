const ErrorType = require('../errors/errorType');
const ServerError = require('../errors/ServerError');
const UsersUtils = require('../utils/UsersUtils');
const usersDao = require('../dao/usersDao');
const SuccesfulLoginServerResponse = require('../models/SuccesfulLoginServerResponse');
const ServerCacheDetails = require('../cache/ServerCacheDetails');


const validateUserInfo = (userInfo) => {
    UsersUtils.validateUserID(userInfo.ID);
    UsersUtils.validateUserEmail(userInfo.email);
    UsersUtils.validateUserPassword(userInfo.password, userInfo.verifiedPassword);
    UsersUtils.validateUserFirstName(userInfo.firstName);
    UsersUtils.validateUserLastName(userInfo.lastName);
    UsersUtils.validateUserCity(userInfo.city);
    UsersUtils.validateUserStreet(userInfo.street);
    return true;
}

const addUser = async (userInfo) => {
    const isUserExistByID = await usersDao.isUserExistByID(userInfo.ID);
    const isUserExistByEmail = await usersDao.isUserExistByEmail(userInfo.email);

    // checking if the user's ID already exists
    if (isUserExistByID) {
        throw new ServerError(ErrorType.ID_ALREADY_EXIST);
    }
    else if (isUserExistByEmail) {
        throw new ServerError(ErrorType.EMAIL_ALREADY_EXIST);
    }

    // checking if the user info is valid
    const isUserInfoValid = validateUserInfo(userInfo);

    if (isUserInfoValid) {
        const saltedPassword = UsersUtils.getSaltedPassword(userInfo.password);
        const hashedPassword = UsersUtils.generateHashedPassword(saltedPassword);
        userInfo.hashedPassword = hashedPassword;

        await usersDao.addUser(userInfo);

        return login(userInfo, true);
    }
}

const login = async (userInfo, isFreshUser) => {

    // Checking if the user is fresh (sent here from the registration function)
    if (!isFreshUser) {

        // Salting the user's password for a better Hash protection
        const saltedPassword = UsersUtils.getSaltedPassword(userInfo.password);

        // Changing the user's password to a Hashed password
        userInfo.hashedPassword = UsersUtils.generateHashedPassword(saltedPassword);
    }

    // Sending the user's data to the DAO preset, and waiting to get the response
    const userLoginData = await usersDao.login(userInfo);

    // Salting the user's email for a better token protection
    const saltedEmail = UsersUtils.generateSaltedEmail(userInfo.email);

    // Getting a token based on the salted email and a secret
    const token = UsersUtils.generateJWTtoken(saltedEmail);

    const serverCacheDetails = new ServerCacheDetails(userLoginData.ID, userLoginData.userType, userLoginData.firstName);

    // Saving the user's info to the server's cache
    UsersUtils.saveUserInfoToServerCache(token, serverCacheDetails);

    const succesfulLoginServerResponse = new SuccesfulLoginServerResponse(token, userLoginData.userType, userLoginData.firstName);

    // Returning the 'successful login response' object to the 'controller' preset
    return succesfulLoginServerResponse;
}

const logout = (request) => {
    UsersUtils.deleteUserFromCache(request);
}

const getUserType = (request) => {
    const userCacheData = UsersUtils.extractUserInfoFromCache(request);
    const userType = userCacheData.userType;

    return userType;
}


module.exports = {
    addUser,
    login,
    logout,
    getUserType
}