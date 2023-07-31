const {Review} = require('../../../db');

async function deleteReview (id) {
    const where = {id};
    let review = await Review.findByPk(id);
    if (!review) return 0;
    return await Review.destroy({ where });
}

module.exports = deleteReview;