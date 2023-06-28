const express = require("express");
const router = express.Router();
const AdminController = require('../controller/AdminController');
const AuthController = require('../controller/AuthController')
const ProductController = require('../controller/ProductController');
const CartController = require('../controller/CartController');
const multerInstance = require("../../multer");
const PaymentController = require("../controller/PaymentController")
const SessionController = require('../controller/SessionController')

// Authentication
router.route('/auth/login').post(AuthController.login)
router.route('/auth/register').post(AuthController.register)

// Admin
router.route('/admin/:id').get(AdminController.findAdminById)
router.route('/admin-email/:email').get(AdminController.findByEmail)
router.route('/admins').get(AdminController.findAllAdmins)
router.route('/admin-email/:email').get(AdminController.findByEmail)
router.route('/admin-phoneNumber/:phoneNumber').get(AdminController.findAdminByPhoneNumber);

// Product
router.route('/product/create').post(multerInstance.single('image'), ProductController.createProduct);
router.route('/product/all').get(ProductController.getAllProducts);
router.route('/product/:id').get(ProductController.getProductById);
router.route('/product/:id').put(ProductController.updatedProduct);
router.route('/product/:id').delete(ProductController.deleteProductById);

// Cart
router.route('/cart/addItem').post(CartController.addToCart);
router.route('/cart/:itemId').put(CartController.updateCartItem);
router.route('/cart/:itemId').delete(CartController.removeCartItem);
router.route('/cart').get(CartController.getAllItemsInCart);

// Payment
router.route('/payment/initialize-payment').post(PaymentController.initializePayment);
router.route('/payment/verify-payment/:reference').get(PaymentController.verifyPayment);

// Session
router.route('/session/all').get(SessionController.getAllSession);
router.route('/session/:id').get(SessionController.getSessionById);
router.route('/session').post(SessionController.createSession);
router.route('/session/:id').delete(SessionController.deleteSession);

module.exports = router;