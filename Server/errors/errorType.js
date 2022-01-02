// Defining an ENUM-like list, for specific errors definitions, and the data about the error

const ErrorType = {

    GENERAL_ERROR: {
        id: 1,
        httpCode: 600,
        message: "A General Error Has Occurred",
        isShowStackTrace: true,
    },

    USER_IS_NOT_AUTHENTICATED: {
        id: 2,
        httpCode: 403,
        message: "Login Failed, Invalid Username or Password",
        isShowStackTrace: true,
    },
    
    USER_IS_NOT_AUTHORIZED: {
        id: 3,
        httpCode: 401,
        message: "You are not authorized to do that",
        isShowStackTrace: true,
    },
  
    INVALID_ID: {
        id: 4,
        httpCode: 422,
        message: "Invalid ID",
        isShowStackTrace: true,
    },

    INVALID_ID_LENGTH: {
        id: 5,
        httpCode: 422,
        message: "ID Length should be 9 digits",
        isShowStackTrace: true,
    },

    ID_ALREADY_EXIST: {
        id: 6,
        httpCode: 601,
        message: "ID already exists",
        isShowStackTrace: true,
    },

    EMAIL_ALREADY_EXIST: {
        id: 7,
        httpCode: 601,
        message: "Email already exists",
        isShowStackTrace: true,
    },
  
    INVALID_EMAIL_LENGTH: {
        id: 8,
        httpCode: 422,
        message: "Invalid Email Length",
        isShowStackTrace: true,
    },

    INVALID_EMAIL_TYPE: {
        id: 9,
        httpCode: 422,
        message: "Invalid Email Type",
        isShowStackTrace: true,
    },

    INVALID_EMAIL_FORMAT: {
        id: 10,
        httpCode: 422,
        message: "Invalid Email Format",
        isShowStackTrace: true,
    },

    PASSWORDS_DO_NOT_MATCH: {
        id: 11,
        httpCode: 601,
        message: "Passwords do not match",
        isShowStackTrace: true,
    },
  
    INVALID_PASSWORD_LENGTH: {
        id: 12,
        httpCode: 422,
        message: "Invalid password length",
        isShowStackTrace: true,
    },

    INVALID_FIRST_NAME_TYPE: {
        id: 13,
        httpCode: 422,
        message: "Invalid First Name Type",
        isShowStackTrace: true,
    },
  
    INVALID_FIRST_NAME_LENGTH: {
        id: 14,
        httpCode: 422,
        message: "Invalid First Name Length",
        isShowStackTrace: true,
    },

    INVALID_LAST_NAME_TYPE: {
        id: 15,
        httpCode: 422,
        message: "Invalid Last Name Type",
        isShowStackTrace: true,
    },

    INVALID_LAST_NAME_LENGTH: {
        id: 16,
        httpCode: 422,
        message: "Invalid Last Name Length",
        isShowStackTrace: true,
    },

    INVALID_CITY_TYPE: {
        id: 17,
        httpCode: 422,
        message: "Invalid City Type",
        isShowStackTrace: true,
    },

    INVALID_CITY_LENGTH: {
        id: 18,
        httpCode: 422,
        message: "Invalid City Length",
        isShowStackTrace: true,
    },

    INVALID_STREET_TYPE: {
        id: 19,
        httpCode: 422,
        message: "Invalid Street Type",
        isShowStackTrace: true,
    },

    INVALID_STREET_LENGTH: {
        id: 20,
        httpCode: 422,
        message: "Invalid Street Length",
        isShowStackTrace: true,
    },

    USER_IS_NOT_LOGGED_IN: {
        id: 21,
        httpCode: 401,
        message: "User is not logged in",
        isShowStackTrace: true,
    },

    INVALID_PRODUCT_ID: {
        id: 22,
        httpCode: 422,
        message: 'Invalid product ID',
        isShowStackTrace: true
    },

    INVALID_PRODUCT_AMOUNT: {
        id: 23,
        httpCode: 422,
        message: 'Product amount can be between 1 - 99',
        isShowStackTrace: true
    },

    INVALID_DELIVERY_DATE: {
        id: 24,
        httpCode: 422,
        message: 'Invalid delivery date',
        isShowStackTrace: true
    },
    
    INVALID_CREDIT_CARD: {
        id: 25,
        httpCode: 422,
        message: 'Invalid credit card',
        isShowStackTrace: true
    },

    INVALID_CREDIT_CARD_LENGTH: {
        id: 26,
        httpCode: 422,
        message: 'Credit card number should be 16 digits long',
        isShowStackTrace: true
    },

    INVALID_PRODUCT_NAME: {
        id: 27,
        httpCode: 422,
        message: 'Invalid product name',
        isShowStackTrace: true
    },

    INVALID_PRODUCT_CATEGORY: {
        id: 28,
        httpCode: 422,
        message: 'Invalid product category',
        isShowStackTrace: true
    },

    INVALID_PRODUCT_ABILITY: {
        id: 33,
        httpCode: 422,
        message: 'Invalid product ability',
        isShowStackTrace: true
    },

    INVALID_PRODUCT_DESCRIPTION: {
        id: 29,
        httpCode: 422,
        message: 'Invalid product description',
        isShowStackTrace: true
    },

    INVALID_PRODUCT_PRICE: {
        id: 30,
        httpCode: 422,
        message: 'Invalid product price',
        isShowStackTrace: true
    },

    INVALID_PRODUCT_DAMAGE: {
        id: 34,
        httpCode: 422,
        message: 'Invalid product damage',
        isShowStackTrace: true
    },

    INVALID_PRODUCT_IMAGE: {
        id: 31,
        httpCode: 422,
        message: 'Invalid product image',
        isShowStackTrace: true
    }
};
  
  module.exports = ErrorType;