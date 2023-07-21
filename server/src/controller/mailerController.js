const nodemailer = require('nodemailer');
const Mailgen = require('mailgen');

const sendMailer = async (req, res) => {
  
  try {
    const { email } = req.params;
    
    const transporter = nodemailer.createTransport({
      // port: 465 - true, 567 - false
      service: 'gmail',
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
      }
    });

    const MailGenerator = new Mailgen({
      theme: 'default',
      product: {
        name: "Mailgen",
        link: 'https://mailgen.js'
      }
    })

    const response = {
      body: {
        // name,
        intro: 'Intro de prueba',
        table : {
          data: [
            {
              item: 'Item 1',
              description: 'Description de item 1',
              price: "S/100"
            }
          ]
        },
        outro: 'Outro aqui...'   
      }
    }

    const mail = MailGenerator.generate(response)

    const message = {
      from: process.env.EMAIL, // sender address
      to: `${email}`, // list of receivers
      subject: "TEST MAILGEN: Hello ✔", // Subject line
      // text: "Hello world?", // plain text body
      // html: "<b>Hello world  test</b>", // html body
      html: mail
    }

    const info = await transporter.sendMail(message);
    console.log(info, 'infoo')
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