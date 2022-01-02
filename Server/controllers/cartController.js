const express = require('express');
const router = express.Router();

const cartLogic = require('../logic/cartLogic');


// ----- Handling the requests related to the orders

router.get('/currentItems', async (request, response, next) => {

    try {
        const successfulCurrentCartItemsData = await cartLogic.getCurrentCartItems(request);

        // converting the response to JSON before sending it to the client
        response.json(successfulCurrentCartItemsData);
    }

    catch (error) {
        // Handling the error with our Error Handler
        return next(error);
    }
});

router.post('/', async (request, response, next) => {

    try {
        const succesfullNewCartResponse = await cartLogic.openCustomerNewCart(request);

        // converting the response to JSON before sending it to the client
        response.json(succesfullNewCartResponse);
    }

    catch (error) {
        // Handling the error with our Error Handler
        return next(error);
    }
});

router.get('/creationDate', async (request, response, next) => {
    try {
        const successfulCurrentCartCreationDate = await cartLogic.getCustomerCurrentCartCreationDate(request);

        // converting the response to JSON before sending it to the client
        response.json(successfulCurrentCartCreationDate);
    }

    catch (error) {
        // Handling the error with our Error Handler
        return next(error);
    }
});

router.post('/addItem', async (request, response, next) => {

    const newCartItem = request.body;

    try {
        const succesfulItemAdditionResponse = await cartLogic.addItemToCart(request, newCartItem);

        // converting the response to JSON before sending it to the client
        response.json(succesfulItemAdditionResponse);
    }

    catch (error) {
        // Handling the error with our Error Handler
        return next(error);
    }
});

router.delete('/', async (request, response, next) => {

    try {
        const succesfulCartItemsRemovalResponse = await cartLogic.removeAllCartItems(request);

        // converting the response to JSON before sending it to the client
        response.json(succesfulCartItemsRemovalResponse);
    }

    catch (error) {
        // Handling the error with our Error Handler
        return next(error);
    }
});

router.patch('/:id', async (request, response, next) => {

    const updatedCartItem = request.body;
    const cartItemID = request.params.id;

    try {
        const succesfulItemUpdateResponse = await cartLogic.updateCartItem(request, updatedCartItem, cartItemID);

        // converting the response to JSON before sending it to the client
        response.json(succesfulItemUpdateResponse);
    }

    catch (error) {
        // Handling the error with our Error Handler
        return next(error);
    }
});

router.delete('/:id', async (request, response, next) => {

    const cartItemID = request.params.id;

    try {
        const succesfulCartItemRemovalResponse = await cartLogic.removeCartItem(request, cartItemID);

        // converting the response to JSON before sending it to the client
        response.json(succesfulCartItemRemovalResponse);
    }

    catch (error) {
        // Handling the error with our Error Handler
        return next(error);
    }
});


module.exports = router;