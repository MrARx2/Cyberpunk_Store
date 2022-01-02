const express = require('express');
const router = express.Router();

const productsLogic = require('../logic/productsLogic');
const multer = require("multer");
const ServerError = require('../errors/serverError');
const ErrorType = require('../errors/errorType');

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, './uploads')
    },
    filename: (req, file, callback) => {
        callback(null, Date.parse(new Date()) + `_${file.originalname}`);
    }
})
const upload = multer( { storage: storage });


// ----- Handling the requests related to the products

router.get('/', async (request, response, next) => {

    try {
        const successfullProductsData = await productsLogic.getAllProducts();

        // converting the response to JSON before sending it to the client
        response.json(successfullProductsData);
    }

    catch (error) {
        // Handling the error with our Error Handler
        return next(error);
    }
});

router.post("/images", upload.single('file'), async (request, response, next) => {

    const file = request.file;
    if (!file) {
        next(new ServerError(ErrorType.INVALID_PRODUCT_IMAGE_URL));
    }
    response.json(file.filename);
});

router.post("/", async (request, response, next) => {

    const newProduct = request.body;

    try {
        const successfullNewProductData = await productsLogic.addProduct(request, newProduct);

        // converting the response to JSON before sending it to the client
        response.json(successfullNewProductData);
    }

    catch (error) {
        // Handling the error with our Error Handler
        return next(error);
    }
});

router.patch('/:id', async (request, response, next) => {

    const productID = request.params.id;
    const updatedProduct = request.body;

    try {
        const succesfullProductUpdateData = await productsLogic.updateProduct(request, updatedProduct, productID);

        // converting the response to JSON before sending it to the client
        response.json(succesfullProductUpdateData);
    }

    catch (error) {
        // Handling the error with our Error Handler
        return next(error);
    }
});


module.exports = router;