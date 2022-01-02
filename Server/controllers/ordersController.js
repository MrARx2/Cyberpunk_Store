const express = require('express');
const router = express.Router();

const ordersLogic = require('../logic/ordersLogic');


// ----- Handling the requests related to the orders

router.get('/totalAmount', async (request, response, next) => {

    try {
        const successfullOrdersAmountData = await ordersLogic.getTotalOrdersAmount();

        // converting the response to JSON before sending it to the client
        response.json(successfullOrdersAmountData);
    }

    catch (error) {
        // Handling the error with our Error Handler
        return next(error);
    }
});

router.get('/lastOrderDate', async (request, response, next) => {

    try {
        const successfullLastOrderDateData = await ordersLogic.getLastOrderDateByOwner(request);

        // converting the response to JSON before sending it to the client
        response.json(successfullLastOrderDateData);
    }

    catch (error) {
        // Handling the error with our Error Handler
        return next(error);
    }
});

router.post('/', async (request, response, next) => {

    const newOrder = request.body;

    try {
        const successfulNewOrderData = await ordersLogic.addNewOrder(request, newOrder);

        // converting the response to JSON before sending it to the client
        response.json(successfulNewOrderData);
    }

    catch (error) {
        // Handling the error with our Error Handler
        return next(error);
    }
});


module.exports = router;