const { Review } = require("../../db");

async function getAllReviews(req, res) {
    try {

        const reviews = await Review.findAll({
            attributes: [
                'score',
                'comment',
                'date',
                'email',
                'productId',
                'isActive'
            ]
        });

        return res.status(200).json(reviews);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

module.exports = {
    getAllReviews
};
