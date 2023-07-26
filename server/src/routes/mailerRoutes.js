const { Router } = require("express");
const { sendMailer } =require("../controllers/MAILER/mailerController")
const mailerRoutes = Router();

/** HTTP Request */
mailerRoutes.post('/:email', sendMailer)

module.exports = mailerRoutes;