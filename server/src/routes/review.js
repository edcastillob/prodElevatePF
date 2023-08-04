const {Router} = require('express');
const createReview = require("../controllers/Reviews/POST/createReview");
const deleteReview = require("../controllers/Reviews/DELETE/deteleReview");
const editReview = require("../controllers/Reviews/PUT/editReview");
const { getProductReviews } = require("../controllers/Reviews/GET/getProductReviews");


const router = Router();
const { v4: uuidv4 } = require('uuid');
const {Product , Review} = require('../db')
router.post('/create', async (req, res) => {
    try {
      const { title, text, score, productId, userMail } = req.body; // Cambiamos userId a email
  
      // Aquí puedes usar el campo email para asociar la reseña con el usuario
      // en lugar del campo userId
      // ... (código para asociar la reseña con el usuario)
  
      let product = await Product.findByPk(productId);
      if (!product) {
        throw new Error('El producto no existe en la base de datos.');
      }
  
      const review = await Review.create({
        title,
        text,
        score,
        productId,
        userMail, // Cambiamos userId a email
      });
  
      return res.status(201).json({ review });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Error al crear la revisión' });
    }
  });

router.put('/:id', async (req, res) => {
    const {id} = req.params;
    const reviewData = req.body;
    try {
        const review = await editReview(id, reviewData);
        return res.json("Reseña modificada");
    }
    catch (err) {
        return res.status(500).send(`No se pudo modificar la reseña (${err})`);
    }
});

router.delete('/:id', async (req, res) => {
    const {id} = req.params;
    try {
        let rows = await deleteReview(id);

        return res.status(204).json("Reseña eliminada");
    }
    catch (err) {
        return res.status(500).send(`No se pudo eliminar la reseña (${err})`);
    }
});

router.get('/product/:productId', async (req, res) => {
    const {productId} = req.params;
    try {
        const reviewList = await getProductReviews(productId);
        console.log(reviewList);
        return res.json(reviewList);
    }
    catch (err) {
        console.log(err);
        return res.status(500).send(`No se pudo cargar la lista de reseñas (${err})`);
    }
});

router.get('/UserProducts', async (req, res) => {
    const {productId, userId} = req.body;
    try {
        const review = await getReview(productId, userId);
        return res.json(review);
    }
    catch (err) {
        return res.status(500).send(`No se pudo cargar la reseña (${err})`);
    }
});


module.exports = router;