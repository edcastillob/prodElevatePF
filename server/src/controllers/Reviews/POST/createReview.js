const { Product, Review, User } = require('../../../db');
const sequelize = require('sequelize');

async function createReview(productId, userMail, reviewData) {
  const { score, title, text } = reviewData;

  let product = await Product.findByPk(productId);
  if (!product) {
    throw new Error('El producto no existe en la base de datos.');
  }

  if (!(score && title)) {
    throw new Error('Falta enviar datos obligatorios de la reseña');
  }

  // Buscar el usuario con el userMail proporcionado
  const user = await User.findOne({ where: { email: userMail } });
  if (!user) {
    throw new Error('El usuario no existe en la base de datos.');
  }

  // Crear la nueva reseña con el nombre y la imagen del usuario
  const newReview = await Review.create({
    score,
    title,
    text,
    userMail,
    userName: user.displayName,
    userImage: user.photoURL,
  });

  // Agregar la reseña al producto
  await product.addReview(newReview);

  return newReview;
}

module.exports = createReview;
