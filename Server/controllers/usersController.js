const express = require('express');
const { request } = require('http');
const router = express.Router();

const usersLogic = require('../logic/usersLogic');


// ----- Handling the requests related to the user

router.post('/register', async (request, response, next) => {

    // Extracting the user's info from the request's body
    const userInfo = request.body;

    try {

        const successfullLoginData = await usersLogic.addUser(userInfo);

        // convert the response (Token, userType & userName) to JSON before sending it to the client
        response.json(successfullLoginData);
    }

    catch (error) {
                
        // Handling the error with our Error Handler
        return next(error);
    }
});

router.post('/login', async (request, response, next) => {

    // Extracting the data from the request's body
    const userInfo = request.body;

    try {
        const successfullLoginData = await usersLogic.login(userInfo);

        // converting the response to JSON before sending it to the client
        response.json(successfullLoginData);
    }

    catch (error) {
        // Handling the error with our Error Handler
        return next(error);
    }
});

router.post('/logout', async (request, response, next) => {

    try {
        const successfullLogoutData = await usersLogic.logout(request);

        // converting the response to JSON before sending it to the client
        response.json(successfullLogoutData);
    }

    catch (error) {
        // Handling the error with our Error Handler
        return next(error);
    }
});

router.get('/type', async (request, response, next) => {

    try {
        const successfullUserTypeData = await usersLogic.getUserType(request);

        // converting the response to JSON before sending it to the client
        response.json(successfullUserTypeData);
    }

    catch (error) {
        // Handling the error with our Error Handler
        return next(error);
    }
});


module.exports = router;