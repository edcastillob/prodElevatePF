
const { Product, Review } = require('../../../db');

async function getProductReviews(productId) {
    let product = await Product.findByPk(productId);
    if (!product) throw new Error('El producto no existe en la base de datos.');
  
 
    const reviewList = await Review.findAll({ where: { productId } });
  
    return reviewList;
  }
  


async function getScore (productId) {
    let score = {numReviews: 0, averageScore: 0};
    let reviewList = await getProductReviews(productId);
    score.numReviews = reviewList.length;
    if (score.numReviews > 0)
        score.averageScore = Math.round(2*(reviewList.reduce(
                                (pre, curr) => pre + curr.score, 0)
                            )/score.numReviews)/2;
    return score;
}

module.exports = {getProductReviews , getScore};