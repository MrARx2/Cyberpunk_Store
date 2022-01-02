let connection = require("./connectionWrapper");
let ErrorType = require("../errors/errorType");
let ServerError = require("../errors/serverError");


const login = async (user) => {
    // Creating the SQL query to get the user from the DB
    const SQL = "SELECT User_ID as ID, User_Type as userType, First_Name as firstName FROM users where User_Name =? and Password =?";
    const parameters = [user.email, user.hashedPassword];
    let userLoginResult;

    try {
        // Sending the SQL query and the user's login data to the 'connection wrapper' preset
        userLoginResult = await connection.executeWithParameters(SQL, parameters);
    }

    catch (error) {
        // Technical Error
        throw new ServerError(ErrorType.GENERAL_ERROR, SQL, error);
    }

    // If the user was not found in the DB
    if (userLoginResult === null || userLoginResult.length === 0) {
        throw new ServerError(ErrorType.USER_IS_NOT_AUTHENTICATED);
    }

    // In case the procedure went well, and we found the user in the DB
    return userLoginResult[0];
}

const addUser = async (userInfo) => {
    // Creating an SQL query for inserting a new user to the DB
    const SQL = "INSERT INTO users (User_ID, First_Name, Last_Name, User_Name, Password, City, Street, User_Type) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
    const parameters = [userInfo.ID, userInfo.firstName, userInfo.lastName, userInfo.email, userInfo.hashedPassword, userInfo.city, userInfo.street, "CUSTOMER"];
    
    try {
        // Sending the SQL query and the user's registration data to the 'connection wrapper' preset
        await connection.executeWithParameters(SQL, parameters);
    }
    
    catch (error) {
        
        // Technical Error
        throw new ServerError(ErrorType.GENERAL_ERROR, SQL, error);
    }
}

const isUserExistByID = async (ID) => {
    // Creating an SQL query to check if the user exists by ID
    const SQL = "SELECT User_ID FROM users WHERE User_ID =?";
    const parameter = [ID];

    try {
        // Sending the SQL query and the user's username to the 'connection wrapper' preset
        const IDAlreadyExists = await connection.executeWithParameters(SQL, parameter);

        // If the ID was not found in the DB
        if (IDAlreadyExists === null || IDAlreadyExists.length === 0) {
            return false;
        }
    }

    catch (error) {
        // Technical Error
        throw new ServerError(ErrorType.GENERAL_ERROR, SQL, error);
    }

    // Returning 'true', indicating that the ID already exists
    return true;
}

const isUserExistByEmail = async (email) => {
    // Creating an SQL query to check if the user exists by email
    const SQL = "SELECT User_Name FROM users WHERE User_Name =?";
    const parameter = [email];

    try {
        // Sending the SQL query and the user's username to the 'connection wrapper' preset
        const emailAlreadyExists = await connection.executeWithParameters(SQL, parameter);

        // If the ID was not found in the DB
        if (emailAlreadyExists === null || emailAlreadyExists.length === 0) {
            return false;
        }
    }

    catch (error) {
        // Technical Error
        throw new ServerError(ErrorType.GENERAL_ERROR, SQL, error);
    }

    // Returning 'true', indicating that the ID already exists
    return true;
}


module.exports = {
    login,
    addUser,
    isUserExistByID,
    isUserExistByEmail
};