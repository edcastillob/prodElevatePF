const { Router } = require("express");
const { sendMailer } = require("../controllers/MAILER/mailerController");
const mailerRoutes = Router();

/** HTTP Request */
mailerRoutes.post('/:email', async (req, res) => {
  try {
        const product = req.body;   
    await sendMailer(product);  
    res.status(200).json({ message: 'Correo enviado correctamente' });
  } catch (error) {    
    res.status(400).json({ error: error.message });
  }
});

module.exports = mailerRoutes;


