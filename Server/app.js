const express = require('express');
const cors = require('cors');
const errorHandler = require('./errors/errorHandler');
const loginFilter = require('./middleware/login-filter');

const usersController = require('./controllers/usersController');
const productsController = require('./controllers/productsController');
const ordersController = require('./controllers/ordersController');
const cartController = require('./controllers/cartController');


// creating an Express application
const server = express();

// The default folder for the images is 'uploads'
server.use(express.static('./uploads'));

// express.json() is parsing the requests recieved to the server side
server.use(express.json());

// using Cors on port 4200 (Angular's port)
server.use(cors({origin: "http://localhost:4200"}));

// Signing the 'login filter' to our server
server.use(loginFilter());

server.use('/users', usersController);
server.use('/products', productsController);
server.use('/orders', ordersController);
server.use('/cart', cartController);

// Registering the use of our Error Handler
server.use(errorHandler);

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});