const { Router } = require("express");
const { postProduct } = require("../controllers/postProduct");
const { postCategory } = require("../controllers/postCategory");
const { postProvider } = require("../controllers/postProvider");

const router = Router();

router.get('/', function(req, res) {
    res.send('Backend prodElevate');
})

router.post('/product', postProduct);
router.post('/category', postCategory);
router.post('/provider', postProvider);

module.exports = router;
