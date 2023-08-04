const { Product, Review, User } = require('../../../db');

async function getProductReviews(productId) {
  let product = await Product.findByPk(productId);
  if (!product) throw new Error('El producto no existe en la base de datos.');

  const reviewList = await Review.findAll({ 
    where: { productId },
    include: {
      model: User,
      as: 'user',
      attributes: ['name', 'email', 'image']
    }
  });

  return reviewList;
}

async function getScore(productId) {
  let score = { numReviews: 0, averageScore: 0 };
  let reviewList = await getProductReviews(productId);
  score.numReviews = reviewList.length;
  if (score.numReviews > 0) {
    score.averageScore = Math.round(2 * (reviewList.reduce((pre, curr) => pre + curr.score, 0)) / score.numReviews) / 2;
  }
  return score;
}

const getAllReviews = async (req, res) => {
  try {
    // Utilizamos el método findAll de Sequelize para obtener todas las reviews de la base de datos
    const reviews = await Review.findAll({ 
      include: {
        model: User,
        as: 'user',
        attributes: ['name', 'email', 'image']
      }
    });

    // Enviamos las reviews como respuesta en formato JSON
    res.json(reviews);
  } catch (error) {
    console.error("Error al obtener las reviews:", error);
    res.status(500).json({ error: "Error al obtener las reviews" });
  }
};

module.exports = { getProductReviews, getScore, getAllReviews };
