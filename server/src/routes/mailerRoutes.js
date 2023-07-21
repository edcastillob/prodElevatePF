const { Router } = require("express");
const { sendMailer } =require('../controller/mailerController')
const mailerRoutes = Router();

/** HTTP Request */
mailerRoutes.post('/:email', sendMailer)

module.exports = mailerRoutes;