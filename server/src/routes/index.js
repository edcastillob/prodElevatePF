// const passport = require("passport")
const { Router } = require("express");
const { isAuthenticated } = require("../middleware/isAuthenticated");
const {
  getAllProducts,
  getAllProductsByName,
  getAllProductsHighestPrice,
  getAllProductsLowestPrice,
} = require("../controllers/GET/getAllProducts");
const { getProductId } = require("../controllers/GET/getProductId");

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
const { getAllCategories } = require("../controllers/GET/getAllCategories");
const { getCategoryId } = require("../controllers/GET/getCategoryId");
const { getAllProviders } = require("../controllers/GET/getAllProviders");
const express = require("express");
const passport = require("passport");
const authController = require("../controllers/authController");
const { postStripe } = require("../controllers/POST/postStripe");
const { postFavorite } = require("../controllers/POST/postFavorite");
const { deleteUser } = require("../controllers/DELETE/deleteUser");
const { deleteProduct } = require("../controllers/DELETE/deleteProduct");
const { deleteProvider } = require("../controllers/DELETE/deteleProvider");
const { deleteCategory } = require("../controllers/DELETE/deleteCategory");
const { getProviderId } = require("../controllers/GET/getProviderId");
const { deleteFavorite } = require("../controllers/DELETE/deleteFavorite");

const { getUserId } = require("../controllers/GET/getUserId");
const { getUserByEmail } = require("../controllers/GET/getUserByEmail");
const { checkEmail } = require("../controllers/authGoogle");

const router = Router();

const mailerRoutes = require("./mailerRoutes");
const { postFilterData } = require("../controllers/POST/postFilterData");
const { getAllRole } = require("../controllers/GET/getAllRole");
const {
  getAllProductsInactive,
} = require("../controllers/GET/getAllProductsInactive");
const { putProductActive } = require("../controllers/PUT/putProductActive");
const { verifyUser } = require("../controllers/POST/postVerifyUser");
const {
  getAllUsersInactive,
} = require("../controllers/GET/getAllUsersInactive");
const { getUserByName } = require("../controllers/GET/getUserByName");
const { getAllFavorite } = require("../controllers/GET/getAllFavorite");
const { postReview } = require("../controllers/POST/postReview");
const { getAllReviewsId } = require("../controllers/GET/getAllReviewsId");
const { postStripeWebhook } = require("../controllers/POST/postStripeWebhook");
const { getSearchUsersName } = require("../controllers/GET/getSearchUsersName");
const { getAllReviews } = require("../controllers/GET/getAllReviews");

router.use("/notification", mailerRoutes);

router.get("/", function (req, res) {
  res.send("Backend prodElevate");
});

// Ruta login
// router.get('/login', (req, res) => {
//     res.render('login');
// });

router.post("/login", passport.authenticate("local"), (req, res) => {
  const { name, identification, numPhone, address, image, email } =
    req.user.dataValues;
  res.setHeader("Access-Control-Allow-Credentials", "true"); // Habilitar las credenciales
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173"); // Define aquí la URL de tu frontend
  res.send({
    User: {
      name,
      identification,
      email,
      numPhone,
      address,
      image,
    },
  });
});

// Ruta Logout
router.get("/logout", function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    req.session.destroy();
    res.send("Session Closed Correctly");
  });
});

// Ruta protegida
router.get("/profile", isAuthenticated, (req, res) => {
  const { name, identification, numPhone, address, image, isActive } = req.user;
  res.send({
    User: {
      name,
      identification,
      numPhone,
      address,
      image,
      isActive,
    },
  });
});

router.post("/check-email", checkEmail);

router.post("/role", postRole);
router.get("/role", getAllRole);

router.get("/user", getAllUsers);
router.get("/user/:id", getUserId);
router.get("/user-inactive", getAllUsersInactive);
router.get("/user-by-name", getUserByName);
router.get("/useremail/:email", getUserByEmail);
router.get("/userlog/:email", getUserByEmail);
router.post("/user", postUser);
router.get("/user-name", getSearchUsersName);
router.post("/verifyUser", verifyUser);
router.put("/user/:id", putUser);
router.delete("/user/:id", deleteUser);

router.get("/product", getAllProducts);
router.get("/product/name", getAllProductsByName);
router.get("/product/highest-price", getAllProductsHighestPrice);
router.get("/product/lowest-price", getAllProductsLowestPrice);
router.get("/productinactive", getAllProductsInactive);
router.put("/productactive/:id", putProductActive);
router.get("/productid/:id", getProductId);

router.post("/product", postProduct);
router.put("/product/:id", putProduct);
router.delete("/product/:id", deleteProduct);

router.get("/category", getAllCategories);
router.get("/category/:id", getCategoryId);
router.post("/category", postCategory);
router.put("/category/:id", putCategory);
router.delete("/category/:id", deleteCategory);

router.get("/provider", getAllProviders);
router.get("/provider/:id", getProviderId);
router.post("/provider", postProvider);
router.put("/provider/:id", putProvider);
router.delete("/provider/:id", deleteProvider);

router.post("/stripe", postStripe);
router.post("/webhook", postStripeWebhook);

router.post("/favorite", postFavorite);
router.get("/favorite-all", getAllFavorite);
router.delete("/favorite/:id", deleteFavorite);

router.post("/filter/data", postFilterData);

router.post("/comment", postReview);
router.get("/comment/:id", getAllReviewsId);
router.get("/comment", getAllReviews);

module.exports = router;
