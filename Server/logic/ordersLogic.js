const ordersDao = require('../dao/ordersDao');
const OrdersUtils = require('../utils/OrdersUtils');
const UsersUtils = require('../utils/UsersUtils');


const getTotalOrdersAmount = async () => {
    const totalOrdersAmount = await ordersDao.getTotalOrdersAmount();
    return totalOrdersAmount;
}

const getLastOrderDateByOwner = async (request) => {

    const userCacheData = UsersUtils.extractUserInfoFromCache(request);
    const userID = userCacheData.ID;
    const successfullLastDateResponse = await ordersDao.getLastOrderDateByOwner(userID);
    if (successfullLastDateResponse === null) {
        return null;
    }
    const successfullLastDateData = successfullLastDateResponse.lastOrderDate;
    return successfullLastDateData;
}

const addNewOrder = async (request, newOrder) => {
    // validating the new order details. If the validation fails, the request will not continue
    OrdersUtils.validateOrderDetails(newOrder);

    const userCacheData = UsersUtils.extractUserInfoFromCache(request);
    const userID = userCacheData.ID;
    
    newOrder.creditCardNumber = getLastFourDigitsOfCreditCard(newOrder.creditCardNumber);
    newOrder.orderDate = new Date();
    newOrder.totalCartPrice = await getTotalCartPrice(userID);

    await ordersDao.addNewOrder(userID, newOrder);
    await closeCustomerOpenCart(userID);
}

const closeCustomerOpenCart = async (userID) => {
    await ordersDao.closeCustomerOpenCart(userID);
}

const getTotalCartPrice = async (userID) => {
    const allCartItemsPrices = await ordersDao.getAllCartItemsPricesForTotalPriceCalculation(userID);
    let totalCartPrice = 0;
    for (cartPrice of allCartItemsPrices) {
        totalCartPrice += +cartPrice.price;
    }
    return totalCartPrice;
}

const getLastFourDigitsOfCreditCard = (creditCardNumber) => {
    let lastFourDigits = 0;
    let creditCardNumberCopy = creditCardNumber;
    for (let x = 0; x < 4; x ++) {
        let lastDigit = creditCardNumberCopy % 10;
        creditCardNumberCopy = Math.trunc(creditCardNumberCopy / 10);
        lastFourDigits += lastDigit * Math.pow(10, x);
    }
    return lastFourDigits;
}


module.exports = {
    getTotalOrdersAmount,
    getLastOrderDateByOwner,
    addNewOrder
}