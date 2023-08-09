const { User, Role } = require("../../db");
const { Sequelize } = require('sequelize');
const { conn: sequelize  } = require("../../db");
const UserModel = sequelize.models.User;
const nodemailer = require("nodemailer");
const Mailgen = require("mailgen");

const ENDPOINT = 'http://localhost:5173/';


/**  Notificacion de Creacion de producto  **/
const sendMailer = async (product) => {
  const usersAdmin = await User.findAll({
    where: { roleId: 1 },
    include: [
      {
        model: Role,
        attributes: ["id"],
      },
    ],
  });

  if (!usersAdmin || usersAdmin.length === 0) {
    return console.log(error);
  }

  const emails = usersAdmin.map((user) => user.email);

  // console.log(emails)

  try {
     const transporter = nodemailer.createTransport({
      // port: 465 - true, 567 - false
      service: "gmail",
      auth: {
        user: "prodelevatepf@gmail.com",
        pass: "znykqbnouxqdrrjf",
      },
    });

    const MailGenerator = new Mailgen({
      theme: "cerberus",
      product: {
        name: "Alerta!! Creación de Nuevo producto",
        link: `${ENDPOINT}dashboard`,
        copyright: "Copyright © 2023 ProdElevate. All rights reserved.",
      },
    });

    const response = {
      body: {
        greeting: "Estimado,",
        signature: "Atte",
        name: "Administrador",
        intro: `El siguiente producto ha sido creado en Base de datos prodElevate: 
        debes dirigirte al panel administrativo para la configuración de Stock`,
        table: {
          data: [
            {
              Producto: `${product.dataValues.name}`,
              Descripción: `${product.dataValues.description}`,
            },
          ],
        },
        action: {
          instructions:
            "Puedes revisar el estatus del producto y más en el Dashboard Administrativo:",
          button: {
            color: "#000924",
            text: "Go to Dashboard",
            link: `${ENDPOINT}dashboard`,
          },
        },
        // outro: 'Revisa el inventario del producto'
      },
    };
    const mail = MailGenerator.generate(response);

    const message = {
      from: "prodelevatepf@gmail.com",
      to: emails,
      subject: "Registro de nuevo producto",
      html: mail,
    };

    await transporter.sendMail(message);
  } catch (error) {
    return console.log({ error: error.message });
  }
};

/**  Notificacion de nuevo usuario  **/
const sendMailNewUser = async (user) => {
  const usersAdmin = await User.findAll({
    where: { roleId: 1 },
    include: [
      {
        model: Role,
        attributes: ["id"],
      },
    ],
  });

  if (!usersAdmin || usersAdmin.length === 0) {
    // return res.status(404).json({ message: "Error Rol Users" });
    return console.log({ error: error.message });
  }

  const emails = usersAdmin.map((user) => user.email);

  console.log(emails);

  try {
    const transporter = nodemailer.createTransport({
      // port: 465 - true, 567 - false
      service: "gmail",
      auth: {
        user: "prodelevatepf@gmail.com",
        pass: "znykqbnouxqdrrjf",
      },
    });

    const MailGenerator = new Mailgen({
      theme: "cerberus",
      product: {
        name: "Registro de usuario ProdElevate",
        link: `${ENDPOINT}usuario`,
      },
    });

    const response = {
      body: {
        greeting: "Hola!",
        signature: "Atentamente",
        name: user.name,
        intro: [
          "¡Bienvenido a ProdElevate!",
          "Estamos muy emocionados de tenerte con nosotros.",
        ],
        action: {
          instructions:
            "Para comenzar con ProdElevate, por favor haga click aqui:",
          button: {
            color: "#000924", // Optional action button color
            text: "Confirm your account",
            link: `${ENDPOINT}login`,
          },
        },
        outro: [
          "Si necesita ayuda o tiene alguna consulta, solo responde a este correo.",
          "Nos encantaría ayudarte.",
        ],
      },
    };

    const mail = MailGenerator.generate(response);
    const emailRecipients = [user.email, ...emails];

    const message = {
      from: process.env.EMAIL,
      to: user.email,
      cc: emailRecipients.join(","),
      subject: "ProdElevate | Registro de usuario",
      html: mail,
    };

    await transporter.sendMail(message);
  } catch (error) {
    //  return res.status(400).json({ error: error.message });
    return console.log({ error: error.message });
    throw error;
  }
};

module.exports = {
  sendMailer,
  sendMailNewUser,
};
