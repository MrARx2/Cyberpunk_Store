const productsDao = require('../dao/productsDao');
const ErrorType = require('../errors/errorType');
const ServerError = require('../errors/serverError');
const ProductsUtils = require('../utils/ProductUtils');
const UsersUtils = require('../utils/UsersUtils');

const getAllProducts = async () => {
    const allProducts = await productsDao.getAllProducts();
    return allProducts;
}

const updateProduct = async (request, updatedProduct, productID) => {
    // updates the product's image
    if (!updatedProduct.imageURL.includes('http://localhost:3001/')) {
        updatedProduct.imageURL = 'http://localhost:3001/' + updatedProduct.imageURL
    }
    updatedProduct.name = updatedProduct.name.toUpperCase();
    
    // validating the product's details
    ProductsUtils.validateProductData(updatedProduct);
    const userCacheData = UsersUtils.extractUserInfoFromCache(request);
    const userType = userCacheData.userType;

    // if the user's type is type ADMIN
    if (userType === "ADMIN") {
        const newlyUpdatedProduct = await productsDao.updateProduct(updatedProduct, productID);
        return newlyUpdatedProduct;
    }
    else {
        throw new ServerError(ErrorType.USER_IS_NOT_AUTHORIZED);
    }
}

const addProduct = async (request, newProduct) => {
    // updates the product's image
    newProduct.imageURL = 'http://localhost:3001/' + newProduct.imageURL
    newProduct.name = newProduct.name.toUpperCase();

    // valdiating the product's details
    ProductsUtils.validateProductData(newProduct);
    const userCacheData = UsersUtils.extractUserInfoFromCache(request);
    const userType = userCacheData.userType;

    // if the user's type is type ADMIN
    if (userType === "ADMIN") {
        console.log("all good");
        const newProductFromServer = await productsDao.addProduct(newProduct);
        return newProductFromServer;
    }
    else {
        throw new ServerError(ErrorType.USER_IS_NOT_AUTHORIZED);
    }
}


module.exports = {
    getAllProducts,
    addProduct,
    updateProduct
}