const { Product, Review, User } = require('../../../db');
const Op = require ('sequelize')
async function getProductReviewsWithFilters(productId, filters) {
  let product = await Product.findByPk(productId);
  if (!product) throw new Error('El producto no existe en la base de datos.');

  const whereClause = { productId };
  
  if (filters.minScore !== undefined) {
    whereClause.score = { [Op.gte]: filters.minScore };
  }
  
  if (filters.maxScore !== undefined) {
    if (whereClause.score === undefined) whereClause.score = {};
    whereClause.score[Op.lte] = filters.maxScore;
  }

  if (filters.userEmail) {
    whereClause['$user.email$'] = filters.userEmail;
  }

  const reviewList = await Review.findAll({ 
    where: whereClause,
    include: {
      model: User,
      as: 'user',
      attributes: ['name', 'email', 'image']
    }
  });

  return reviewList;
}

module.exports = { getProductReviewsWithFilters };