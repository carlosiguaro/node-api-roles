const Product = require('../models/Product');

/**
 *  CREATE PRODUCTO
 * @param {Request} req 
 * @param {Response} res 
 */
exports.createProduct = async (req, res) => {
        
    const {name, category, price, imgURL} = req.body;

    const NewProduct = new Product({
        name, 
        category, 
        price, 
        imgURL
    });

    const ProductSaved = await NewProduct.save();

    res.status(201).json(ProductSaved);

};

/**
 *  OBTENER PRODUCT
 * @param {Request} req 
 * @param {Response} res 
 */
exports.getProducts = async (req, res) => {

    const products = await Product.find();

    res.status(201).json(products);
    
};

/**
 *  OBTENER PRODUCT BY ID
 * @param {Request} req 
 * @param {Response} res 
 */
exports.getProductsById = async (req, res) => {

    const product = await Product.findById(req.params.productId);

    res.status(201).json(product);

};

/**
 *  UPDATED PRODUCT BY ID
 * @param {Request} req 
 * @param {Response} res 
 */
exports.updateProductBtId = async (req, res) => {

    const productUpdated = await Product.findByIdAndUpdate(req.params.productId, req.body, {new: true});

    res.status(200).json(productUpdated);

};


/**
 *  UPDATED PRODUCT BY ID
 * @param {Request} req 
 * @param {Response} res 
 */
 exports.deleteProductBtId = async (req, res) => {

    const {productId} = req.params;

    await Product.findByIdAndDelete(productId);

    res.status(200).json();

};
