const cartDao = require('../dao/cartDao');
const CartItemUtils = require('../utils/CartItemUtils');
const UsersUtils = require('../utils/UsersUtils');


const openCustomerNewCart = async (request) => {
    const userCacheData = UsersUtils.extractUserInfoFromCache(request);
    const userID = userCacheData.ID;
    await cartDao.openCustomerNewCart(userID);
}

const getCurrentCartItems = async (request) => {

    const userCacheData = UsersUtils.extractUserInfoFromCache(request);
    const userID = userCacheData.ID;
    const successfulCurrentCartItemsData = await cartDao.getCurrentCartItems(userID);
    return successfulCurrentCartItemsData;
}

const getCustomerCurrentCartCreationDate = async (request) => {
    const userCacheData = UsersUtils.extractUserInfoFromCache(request);
    const userID = userCacheData.ID;
    const successfulCurrentCartCreationDate = await cartDao.getCustomerCurrentCartCreationDate(userID);
    return successfulCurrentCartCreationDate;
}

const addItemToCart = async (request, newCartItem) => {
    // validating the new cart item. If it fails, it will throw an error and will not continue
    CartItemUtils.validateCartItem(newCartItem);
    
    const userCacheData = UsersUtils.extractUserInfoFromCache(request);
    const userID = userCacheData.ID;
    await cartDao.addItemToCart(userID, newCartItem);
}

const updateCartItem = async (request, updatedCartItem, cartItemID) => {
    // validating the updated cart item. If it fails, it will throw an error and will not continue
    CartItemUtils.validateCartItem(updatedCartItem);

    const userCacheData = UsersUtils.extractUserInfoFromCache(request);
    const userID = userCacheData.ID;
    await cartDao.updateCartItem(userID, updatedCartItem, cartItemID);
}

const removeCartItem = async (request, cartItemID) => {
    // validating the desired cart item ID. If it fails, it will throw an error and will not continue
    CartItemUtils.validateProductID(cartItemID);

    const userCacheData = UsersUtils.extractUserInfoFromCache(request);
    const userID = userCacheData.ID;
    await cartDao.removeCartItem(userID, cartItemID);
}

const removeAllCartItems = async (request) => {
    const userCacheData = UsersUtils.extractUserInfoFromCache(request);
    const userID = userCacheData.ID;
    await cartDao.removeAllCartItems(userID);
}


module.exports = {
    openCustomerNewCart,
    getCurrentCartItems,
    getCustomerCurrentCartCreationDate,
    addItemToCart,
    updateCartItem,
    removeCartItem,
    removeAllCartItems
}