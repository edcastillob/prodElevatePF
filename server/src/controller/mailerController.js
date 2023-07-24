const nodemailer = require('nodemailer');
const Mailgen = require('mailgen');

const sendMailer = async (product) => {
  console.log(product.dataValues, 'dataValues ')
  try {
    // const { email } = req.params;
    
    const transporter = nodemailer.createTransport({
      // port: 465 - true, 567 - false
      service: 'gmail',
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
      }
    });

    const MailGenerator = new Mailgen({
      theme: 'salted',
      product: {
        name: "Aviso de Stock Minimo",
        link: 'https://mailgen.js'
      }
    })

    const response = {
      body: {
        name: 'Administrador',
        intro: `El producto ${product.dataValues.name} ha llegado a su stock minimo`,
        table : {
          data: [
            {
              ID: `${product.dataValues.id}`,
              Producto: `${product.dataValues.name}`,
              Descripción: `${product.dataValues.description}`,
              Stock_Min: `${product.dataValues.minStock} und.`
            }
          ]
        },
        action: {
          instructions: 'To get started with Mailgen, please click here:',
          button: {
              color: '#22BC66', // Optional action button color
              text: 'Confirm your account',
              link: 'https://mailgen.js/confirm?s=d9729feb74992cc3482b350163a1a010'
          }
      },
        outro: 'Outro aqui...'   
      }
    }

    const mail = MailGenerator.generate(response)

    const message = {
      from: process.env.EMAIL, // sender address
      to: 'mendozaveralucia@gmail.com', // list of receivers
      subject: "Advertencia de Stock Mínimo", // Subject line
      // text: "Hello world?", // plain text body
      // html: "<b>Hello world  test</b>", // html body
      html: mail
    }

    const info = await transporter.sendMail(message);
    // console.log(info, 'infoo')
    //   .then((info) => {
    //   return res.status(201)
    //   .json({ 
    //     msg: 'debes recibir un email',
    //     info: info.messageId,
    //     preview: nodemailer.getTestMessageUrl(info)
    //   })
    // })
    // .catch(error => {
    //   return res.status(500).json({ error })
    // })
  
  

    // console.log(email, 'email')
    // res.status(201).json('Enviado...')
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
}

module.exports = {
  sendMailer
}