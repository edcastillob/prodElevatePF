const {Comment , User} = require('../../db')
const createComment = async (req, res) => {
  try {
    const { text, productId, userEmail } = req.body;

    // Verificar que el producto existe y otros controles de validación si es necesario...

    // Crear el comentario en la base de datos
    const comment = await Comment.create({
      text,
      productId,
      userEmail, // Utilizar el correo electrónico del usuario como identificador
    });

    const user = await User.findOne({ where: { email: userEmail } });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    comment.user = {
      name: user.name,
      image: user.image,
    };

    res.status(201).json(comment);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error creating the comment" });
  }
};
const createReply = async (req, res) => {
  const { commentId } = req.params;
  const { text, userEmail } = req.body;

  try {
    // Buscar el comentario padre al que se quiere responder
    const parentComment = await Comment.findByPk(commentId);
    if (!parentComment) {
      return res.status(404).json({ error: "Parent comment not found" });
    }

    // Crear una nueva entrada para la respuesta
    const newReply = await Comment.create({
      text,
      userEmail,
      parentId: commentId, // Establecer parentId para la relación
    });

    res.status(201).json(newReply); // Devolver la respuesta creada
  } catch (error) {
    console.error("Error creating reply:", error);
    res.status(500).json({ error: "Error creating reply" });
  }
};

module.exports = { createComment, createReply };