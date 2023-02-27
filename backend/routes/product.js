const express = require('express')
const router = express.Router();

const { newProduct , getProducts, getSingleProduct, updateProduct, deleteProduct} = require('../controllers/productController')

const { isAuthenicatedUser } = require('../middlewares/auth')

router.route('/products').get(getProducts);
router.route('/product/:id').get(getSingleProduct);
router.route('/admin/product/new').post(isAuthenicatedUser, newProduct);
router.route('/admin/product/:id').put(isAuthenicatedUser, updateProduct);
router.route('/admin/product/:id').delete(isAuthenicatedUser, deleteProduct)

module.exports = router;