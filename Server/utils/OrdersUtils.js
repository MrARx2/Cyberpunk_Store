const ServerError = require('../errors/ServerError');
const ErrorType = require('../errors/errorType');
const UsersUtils = require('./UsersUtils');

class OrdersUtils {
    constructor() {}

    // ----- order validations

    static validateOrderDetails = (orderDetails) => {
        UsersUtils.validateUserCity(orderDetails.deliveryCity);
        UsersUtils.validateUserStreet(orderDetails.deliveryStreet);
        OrdersUtils.validateDeliveryDate(orderDetails.deliveryDate);
        OrdersUtils.validateCreditCardNumber(orderDetails.creditCardNumber);

        return true;
    }

    static validateDeliveryDate = (deliveryDate) => {
        if (typeof deliveryDate === "string") {
            const currentDate = new Date().setHours(0, 0, 0, 0);
            const deliveryDateToBe = new Date(deliveryDate).setHours(0, 0, 0, 0);
    
            // Checking if the delivery date is not in the past
            if (deliveryDateToBe >= currentDate) {
                return true;
            }
        }
        throw new ServerError(ErrorType.INVALID_DELIVERY_DATE);
    }

    static validateCreditCardNumber = (creditCardNumber) => {
        if (typeof creditCardNumber === "number") {
            const creditCardNumberTrimmedStr = creditCardNumber.toString().trim();
            if (creditCardNumberTrimmedStr.length === 16) {
                return true;
            }
            throw new ServerError(ErrorType.INVALID_CREDIT_CARD_LENGTH);
        }
        throw new ServerError(ErrorType.INVALID_CREDIT_CARD);
    }
}

module.exports = OrdersUtils;