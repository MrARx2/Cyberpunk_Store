const ServerError = require('../errors/ServerError');
const ErrorType = require('../errors/errorType');

class CartItemUtils {
    constructor() {}

    // ----- cart item validations

    static validateCartItem = (newCartItem) => {
        CartItemUtils.validateProductID(newCartItem.productID);
        CartItemUtils.validateProductAmount(newCartItem.amount);
        return true;
    }

    static validateProductID = (productID) => {
        if (typeof +productID === "number") {
            return true;
        }
        throw new ServerError(ErrorType.INVALID_PRODUCT_ID);
    }

    static validateProductAmount = (amount) => {
        if (typeof amount === "number") {
            if (amount > 0 && amount < 100) {
                return true;
            }
        }
        throw new ServerError(ErrorType.INVALID_PRODUCT_AMOUNT);
    }
}

module.exports = CartItemUtils;