let connection = require("./connectionWrapper");
let ErrorType = require("../errors/errorType");
let ServerError = require("../errors/serverError");


const getTotalOrdersAmount = async () => {
    // Creating an SQL query for getting the total orders amount
    const SQL = `SELECT COUNT(Order_ID) as totalOrdersAmount from orders`;
    
    try {
        // Sending the SQL query to the 'connection wrapper' preset
        const totalOrdersAmount = await connection.execute(SQL);
        return totalOrdersAmount[0].totalOrdersAmount;
    }
    
    catch (error) {
        
        // Technical Error
        throw new ServerError(ErrorType.GENERAL_ERROR, SQL, error);
    }
}

const getLastOrderDateByOwner = async (userID) => {
    // Creating an SQL query for getting the customer's last order date
    const SQL = "SELECT DATE_FORMAT(Order_Date, '%d/%m/%Y') as lastOrderDate FROM orders WHERE Order_Owner = ? ORDER BY Order_Date DESC LIMIT 1";
    const parameter = [userID];
    let ownerLastOrderDate;

    try {
        // Sending the SQL query and the user's login data to the 'connection wrapper' preset
        ownerLastOrderDate = await connection.executeWithParameters(SQL, parameter);
    }

    catch (error) {
        // Technical Error
        throw new ServerError(ErrorType.GENERAL_ERROR, SQL, error);
    }

    // If the the customer does not have a previous order
    if (ownerLastOrderDate === null || ownerLastOrderDate.length === 0) {
        return null;
    }

    // returning the last order date of the customer
    return ownerLastOrderDate[0];
}

const addNewOrder = async (userID, newOrder) => {
    // Creating an SQL query for adding a new order to the DB
    const SQL = "INSERT INTO orders (Order_Owner, Cart, Total_Price, Delivery_City, Delivery_Street, Delivery_Date, Order_Date, Last_Four_Card_Digits) VALUES (?, (SELECT Cart_ID FROM `shopping-carts` WHERE Cart_Owner = ? AND Is_Open = '1'), ?, ?, ?, ?, ?, ?)";
    const parameter = [userID, userID, newOrder.totalCartPrice, newOrder.deliveryCity, newOrder.deliveryStreet, newOrder.deliveryDate, newOrder.orderDate, newOrder.creditCardNumber];

    try {
        // Sending the SQL query and the user's login data to the 'connection wrapper' preset
        await connection.executeWithParameters(SQL, parameter);
    }

    catch (error) {
        // Technical Error
        throw new ServerError(ErrorType.GENERAL_ERROR, SQL, error);
    }
}

const closeCustomerOpenCart = async (userID) => {
    // creating an SQL query for closing a customer's open cart
    const SQL = "UPDATE `shopping-carts` SET Is_Open = '0' WHERE Cart_Owner = ? AND Is_Open = '1'";
    const parameter = [userID];

    try {
        // Sending the SQL query and the the the 'connection wrapper' preset
        await connection.executeWithParameters(SQL, parameter);
    }

    catch (error) {
        // Technical Error
        throw new ServerError(ErrorType.GENERAL_ERROR, SQL, error);
    }
}

const getAllCartItemsPricesForTotalPriceCalculation = async (userID) => {
    // Creating an SQL query for getting all cart items prices, for the total price calculation
    const SQL = "SELECT Total_Price as price FROM `cart-items` WHERE Cart_ID = (SELECT Cart_ID FROM `shopping-carts` WHERE Cart_Owner = ? AND Is_Open = '1')";
    const parameter = [userID];

    try {
        // Sending the SQL query to the 'connection wrapper' preset
        const totalPricesOfCartItems = await connection.executeWithParameters(SQL, parameter);
        return totalPricesOfCartItems;
    }

    catch (error) {
        // Technical Error
        throw new ServerError(ErrorType.GENERAL_ERROR, SQL, error);
    }
}


module.exports = {
    getTotalOrdersAmount,
    getLastOrderDateByOwner,
    addNewOrder,
    getAllCartItemsPricesForTotalPriceCalculation,
    closeCustomerOpenCart
}