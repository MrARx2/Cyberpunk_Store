let connection = require("./connectionWrapper");
let ErrorType = require("../errors/errorType");
let ServerError = require("../errors/serverError");


const getAllProducts = async () => {
    // Creating an SQL query to get all products from the DB
    const SQL = "SELECT Product_ID as ID, Product_Name as name, Product_Description as description, (SELECT Category_Name FROM `products-categories` WHERE `products-categories`.Category_ID = `products`.Product_Category) as category, (SELECT Ability_Name FROM `products_abilities` WHERE `products_abilities`.Ability_ID = `products`.Product_Ability) as ability, Product_Damage as damage, Product_Price as price, Product_Image_URL as imageURL FROM products";
    
    try {
        // Sending the SQL query to the 'connection wrapper' preset
        const allProducts = await connection.execute(SQL);
        return allProducts;
    }
    
    catch (error) {
        // Technical Error
        throw new ServerError(ErrorType.GENERAL_ERROR, SQL, error);
    }
}

const updateProduct = async (updatedProduct, productID) => {
    // Creating an SQL query to update a product in the DB
    const SQL = "UPDATE products SET Product_Name = ?, Product_Description = ?, Product_Category = (SELECT Category_ID FROM `products-categories` WHERE Category_Name = ?), Product_Ability = (SELECT Ability_ID FROM `products_abilities` WHERE Ability_Name = ?), Product_Damage = ?, Product_Price = ?, Product_Image_URL = ? WHERE Product_ID = ?";
    const parameters = [updatedProduct.name, updatedProduct.description, updatedProduct.category, updatedProduct.ability, updatedProduct.damage, updatedProduct.price, updatedProduct.imageURL, productID]

    try {
        // Sending the SQL query to the 'connection wrapper' preset
        await connection.executeWithParameters(SQL, parameters);

        // creating an SQL query to get the newly updated product from the DB, in order to display it with it's new image in the UI
        const updatedProductSQL = "SELECT Product_ID as ID, Product_Name as name, Product_Description as description, (SELECT Category_Name FROM `products-categories` WHERE `products-categories`.Category_ID = `products`.Product_Category) as category, Product_Price as price, Product_Image_URL as imageURL FROM products WHERE Product_ID = ?";
        const updatedProductParameters = [productID];
        
        const newlyUpdatedProduct = await connection.executeWithParameters(updatedProductSQL, updatedProductParameters);
        return newlyUpdatedProduct[0];
    }
    
    catch (error) {
        // Technical Error
        console.log(error);
        throw new ServerError(ErrorType.GENERAL_ERROR, SQL, error);
    }
}

const addProduct = async (newProduct) => {
    // Creating an SQL query to add a product to the DB
    const SQL = "INSERT INTO products (Product_Name, Product_Description, Product_Category, Product_Ability, Product_Damage, Product_Price, Product_Image_URL) VALUES (?, ?, (SELECT Category_ID FROM `products-categories` WHERE Category_Name = ?), (SELECT Ability_ID FROM `products_abilities` WHERE Ability_Name = ?), ?, ?, ?)";
    const parameters = [newProduct.name, newProduct.description, newProduct.category, newProduct.ability, newProduct.damage, newProduct.price, newProduct.imageURL]

    try {
        // Sending the SQL query to the 'connection wrapper' preset
        await connection.executeWithParameters(SQL, parameters);

        // creating an SQL query to get the newly added product from the DB, in order to display it with it's ID in the UI
        const newlyAddedProductSQL = "SELECT Product_ID as ID, Product_Name as name, Product_Description as description, (SELECT Category_Name FROM `products-categories` WHERE `products-categories`.Category_ID = `products`.Product_Category) as category, Product_Price as price, Product_Image_URL as imageURL FROM products WHERE Product_ID = (SELECT MAX(Product_ID) FROM products)";
        
        const newlyAddedProduct = await connection.execute(newlyAddedProductSQL);
        return newlyAddedProduct[0];
    }

    catch (error) {
        // Technical Error
        console.log(error);
        throw new ServerError(ErrorType.GENERAL_ERROR, SQL, error);
    }
}


module.exports = {
    getAllProducts,
    addProduct,
    updateProduct
}