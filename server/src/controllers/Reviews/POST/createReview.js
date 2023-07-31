const { Product, Review, User } = require('../../../db');
const sequelize = require('sequelize');
async function createReview(productId, userId, reviewData) {
    const { score, title, text } = reviewData;
  
  
    let product = await Product.findByPk(productId);
    if (!product) {
      throw new Error('El producto no existe en la base de datos.');
    }
  
    
    if (!(score && title)) {
      throw new Error('Falta enviar datos obligatorios de la reseña');
    }
  
   
    const newReview = await Review.create({ score, title, text, userId });
    product.addReview(newReview);
  
    return newReview;
  }
module.exports = createReview;