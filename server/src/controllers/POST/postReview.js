const { Review } = require("../../db");

async function postReview(req, res) {
    try {
        const { productId, score, comment, date, email, isActive } = req.body;
        console.log(req.body)
        
        if (!productId || !score || !comment || !date || !email) {
            return res.status(400).json({ message: "Missing data" });
        }

        const newReview = await Review.create({
            productId,
            score,
            comment,
            date,
            email,
            isActive
        });

        return res.status(201).json(newReview);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

module.exports = {
    postReview
};
