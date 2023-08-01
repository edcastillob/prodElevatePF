
const { Comment } = require("../../db");

const getCommentsByProduct = async (req, res) => {
    try {
      const { productId } = req.params;
      const comments = await Comment.findAll({
        where: { productId },
        include: {
          model: Comment,
          as: "replies",
        },
      });
      res.status(200).json(comments);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Error al obtener los comentarios" });
    }
  };
  module.exports = getCommentsByProduct