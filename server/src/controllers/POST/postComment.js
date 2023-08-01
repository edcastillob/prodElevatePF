const { Comment, Product, User, Provider } = require("../../db");



const createComment = async (req, res) => {
    try {
      const { text, productId,userEmail,userId } = req.body;
     
  
      // Verificar que el producto existe y otros controles de validación si es necesario...
  
      // Crear el comentario en la base de datos
      const comment = await Comment.create({
        text,
        productId,
        userId, // Asociar el ID del usuario que realizó el comentario
      });
      const user = await User.findOne({ where: { email: userEmail } });
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      
      const commentWithUserData = {
        id: comment.id,
        text: comment.text,
        productId: comment.productId,
        userId: user.id,
        user: {
          name: user.name,
          image: user.image,
        },
      };
      
      res.status(201).json(commentWithUserData);
    } catch (error) {
        console.log(error);
      res.status(500).json({ error: 'Error creating the comment' });
    }
  };
  
  
  const createReply = async (req, res) => {
    try {
        const { text, commentId, userEmail } = req.body;
    
        // Check if the user exists based on the provided email
        const user = await User.findOne({ where: { email: userEmail } });
        if (!user) {
          return res.status(404).json({ error: "User not found" });
        }
    
        // Check if the comment exists
        const comment = await Comment.findByPk(commentId);
        if (!comment) {
          return res.status(404).json({ error: "Comment not found" });
        }
        
        // Check if the product exists
        const product = await Product.findByPk(comment.productId);
        if (!product) {
          return res.status(404).json({ error: "Product not found" });
        }
    
        // Check if the user email matches the provider email for this product
        const provider = await Provider.findOne({ where: { email: userEmail } });
        if (!provider || product.providerId !== provider.id) {
          return res.status(403).json({ error: "You are not authorized to reply to this comment" });
        }
    
        const reply = await Comment.create({
          text,
          productId: comment.productId,
          parentId: commentId,
          userId: user.id, // Set the user ID for the reply
        });
        
        res.status(201).json(reply);
      } catch (error) {
        res.status(500).json({ error: "Error creating the reply" });
      }
  };
  module.exports = {createComment, createReply}
  
  
  