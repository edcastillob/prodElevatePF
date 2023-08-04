const nodemailer = require('nodemailer');
const Mailgen = require('mailgen');

/**  Notificacion de stock minimo  **/
const sendMailer = async (product) => {
  try {
     const { email } = req.params;
    
    const transporter = nodemailer.createTransport({
      // port: 465 - true, 567 - false
      service: 'gmail',
      auth: {       
        user: 'mendozaveralucia@gmail.com',
        pass: 'pgazpnjfbfvbkpxe'
      }
    });

    const MailGenerator = new Mailgen({
      theme: 'cerberus',
      product: {
        name: "Aviso de Stock Minimo",
        link: 'http://localhost:5173/dashboard',
        copyright: 'Copyright © 2023 ProdElevate. All rights reserved.'
      }
    });

    const response = {
      body: {
        greeting: 'Estimado,',
        signature: 'Atte',
        name: 'Administrador',
        intro: `El siguiente producto ha sido creado en Base de datos prodElevate:`,
        table : {
          data: [
            {
              Producto: `${product.dataValues.name}`,
              Descripción: `${product.dataValues.description}`,
              Min_Stock: `${product.dataValues.minStock} und.`
            }
          ]
        },
        action: {
          instructions: 'Puedes revisar el estatus del producto y más en el Dashboard Administrativo:',
          button: {
              color: '#22BC66', // Optional action button color
              text: 'Go to Dashboard',
              link: 'http://localhost:5173/dashboard'
          }
      },
        // outro: 'Revisa el inventario del producto'   
      }
    }

    const mail = MailGenerator.generate(response);

    const message = {
      from: "prodelevatepf@gmail.com", // sender address
      to: 'mendozaveralucia@gmail.com', // list of receivers
      subject: "Notificación de Stock Mínimo", // Subject line
      html: mail
    };

    await transporter.sendMail(message);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
}

/**  Notificacion de nuevo usuario  **/
const sendMailNewUser = async (user) => {
  try {
    const transporter = nodemailer.createTransport({
      // port: 465 - true, 567 - false
      service: 'gmail',
      auth: {
        user: 'mendozaveralucia@gmail.com',
        pass: 'pgazpnjfbfvbkpxe'
      }
    });

    const MailGenerator = new Mailgen({
      theme: 'cerberus',
      product: {
        name: "Registro de usuario ProdElevate",
        link: 'http://localhost:5173/usuario'
      }
    })

    const response = {
      body: {
        greeting: 'Hola!',
        signature: 'Atentamente',
        name: user.name,
        intro: ['¡Bienvenido a ProdElevate!', 'Estamos muy emocionados de tenerte con nosotros.'],
        action: {
          instructions: 'Para comenzar con ProdElevate, por favor haga click aqui:',
          button: {
              color: '#22BC66', // Optional action button color
              text: 'Confirm your account',
              link: 'http://localhost:5173/login'
          }
      },
        outro: ['Si necesita ayuda o tiene alguna consulta, solo responde a este correo.', 'Nos encantaría ayudarte.']   
      }
    }

    const mail = MailGenerator.generate(response);

    const message = {
      from: process.env.EMAIL, // sender address
      to: user.email, // list of receivers,
      cc: 'mendozaveralucia@gmail.com', // cc admin fyi
      subject: "ProdElevate | Registro de usuario", // Subject line
      html: mail
    }

    await transporter.sendMail(message);

  } catch (error) {
    // return res.status(400).json({ error: error.message });
    throw error;
  }
}

module.exports = {
  sendMailer,
  sendMailNewUser
}