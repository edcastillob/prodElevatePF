// const passport = require("passport")
const { Router } = require("express");
const { isAuthenticated } = require("../middleware/isAuthenticated");
const { getAllProducts } = require("../controllers/GET/getAllProducts")
const { getProductId } = require("../controllers/GET/getProductId")
const { postProduct } = require("../controllers/POST/postProduct");
const { postCategory } = require("../controllers/POST/postCategory");
const { postProvider } = require("../controllers/POST/postProvider");
const { postRole } = require("../controllers/POST/postRole");
const { postUser } = require("../controllers/POST/postUser");
const { putProduct } = require("../controllers/PUT/putProduct");
const { putUser } = require("../controllers/PUT/putUser");
const { putCategory } = require("../controllers/PUT/putCategory");
const { putProvider } = require("../controllers/PUT/putProvider");
const { getAllUsers } = require("../controllers/GET/getAllUsers");
const { loginJS, logout } = require("../controllers/LOGIN-USER/login");
const { getAllCategories } = require("../controllers/GET/getAllCategories");
const { getAllProviders } = require("../controllers/GET/getAllProviders");
const express = require("express");
const passport = require('passport');
const authController = require('../controllers/authController');

const router = Router();


router.get('/', function(req, res) {
    res.send('Backend prodElevate');
});

router.post("/login", passport.authenticate("local"), loginJS);
router.get("/logout", logout)

router.post('/role', postRole);

router.get('/user', getAllUsers);
router.post('/user', postUser);
router.put('/user/:id', putUser);

router.get('/product', getAllProducts);
router.get('/productid/:id', getProductId);

router.post('/product', postProduct);
router.put('/product/:id', putProduct);

router.get('/category', getAllCategories);
router.post('/category', postCategory);
router.put('/category/:id', putCategory);

router.get('/provider', getAllProviders);
router.post('/provider', postProvider);
router.put('/provider/:id', putProvider);

module.exports = router;
