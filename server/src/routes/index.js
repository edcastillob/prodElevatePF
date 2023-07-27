// const passport = require("passport")
const { Router } = require("express");
const { isAuthenticated } = require("../middleware/isAuthenticated");
const { getAllProducts } = require("../controllers/GET/getAllProducts");
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
// const { loginJS, logout } = require("../controllers/LOGIN-USER/login");
const { getAllCategories } = require("../controllers/GET/getAllCategories");
const { getAllProviders } = require("../controllers/GET/getAllProviders");
const express = require("express");
const passport = require("passport");
const authController = require("../controllers/authController");
const { postStripe } = require("../controllers/POST/postStripe");
const { postFavorite } = require("../controllers/POST/postFavorite");

const router = Router();

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

router.post("/role", postRole);

// router.post(
//     '/login',
//     passport.authenticate('local'),
//     (req, res) => {
//         const { name, identification, numPhone, address, image, email } = req.user.dataValues;
//         res.setHeader("Access-Control-Allow-Credentials", "true"); // Habilitar las credenciales
//         res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173"); // Define aquí la URL de tu frontend
//         res.send({
//             User: {
//                 name,
//                 identification,
//                 email,
//                 numPhone,
//                 address,
//                 image
//             }
//         });
//     }
// );

// // Ruta Logout
// router.get('/logout', function(req, res, next) {
//     req.logout(function(err) {
//         if (err) { return next(err); }
//         res.send('Session Closed Correctly');
//     });
// });

// Ruta protegida
// router.get('/profile', isAuthenticated, (req, res) => {
//     const { name, identification, numPhone, address, image, isActive } = req.user;
//     res.send({
//         User: {
//             name,
//             identification,
//             numPhone,
//             address,
//             image,
//             isActive
//         }
//     });
// });

router.post("/role", postRole);

router.get("/user", getAllUsers);
router.post("/user", postUser);
router.put("/user/:id", putUser);

router.get("/product", getAllProducts);
router.get("/productid/:id", getProductId);

router.post("/product", postProduct);
router.put("/product/:id", putProduct);

router.get("/category", getAllCategories);
router.post("/category", postCategory);
router.put("/category/:id", putCategory);

router.get("/provider", getAllProviders);
router.post("/provider", postProvider);
router.put("/provider/:id", putProvider);

router.post("/stripe", postStripe);

router.post("/favorite", postFavorite);

module.exports = router;
