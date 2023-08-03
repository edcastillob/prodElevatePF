const { Comment, User } = require("../../db");

const getCommentsByProduct = async (req, res) => {
  const { productId } = req.params;

  try {
    // Obtener los comentarios del producto junto con sus respuestas (replies)
    const comments = await Comment.findAll({
      where: { productId },
      include: [
        {
          model: User,
          as: "user",
          attributes: ["name", "image"],
        },
        {
          model: Comment,
          as: "respuestas", // Este es el alias que se utilizó en la definición de la relación
          include: [
            {
              model: User,
              as: "replyUser",
              attributes: ["name", "image"],
            },
          ],
        },
      ],
    });

    res.status(200).json(comments);
  } catch (error) {
    console.error("Error fetching comments:", error);
    res.status(500).json({ error: "Error fetching comments" });
  }
};



  module.exports = getCommentsByProduct