// DEPENDENCIES
const express = require('express');
const router = express.Router();

// CONTROLLER
const ProductController = require('../controllers/products.controller');

// MIDDLEWARE
const middlewares = require('../middlewares');
const { USERAUTH } = middlewares;

//ROUTES
router.post('/', 
    [USERAUTH.verifyJWT, USERAUTH.isModerator],
    ProductController.createProduct);

router.get('/',
    [USERAUTH.verifyJWT, USERAUTH.isModerator],
    ProductController.getProducts);

router.get('/:productId', 
    ProductController.getProductsById);

router.put('/:productId', 
    ProductController.updateProductBtId);

router.delete('/:productId',
    ProductController.deleteProductBtId);

module.exports = router;
