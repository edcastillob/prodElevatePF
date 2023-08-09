const { Review } = require("../../db");

async function getAllReviewsId(req, res) {
    try {
        const { id } = req.params;

        const reviews = await Review.findAll({
            attributes: [
                'score',
                'comment',
                'date',
                'email',
                'productId',
                'isActive'
            ],
            where: {
                productId: req.params.id 
            }
        });

        return res.status(200).json(reviews);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

module.exports = {
    getAllReviewsId
};
