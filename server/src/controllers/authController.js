// controllers/authController.js
function login(req, res) {
    // Aquí puedes devolver los datos del usuario que desees
    res.status(200).json({
      message: 'Inicio de sesión exitoso',
      user: req.user,
    });
  }
  
  module.exports = {
    login,
  };
  