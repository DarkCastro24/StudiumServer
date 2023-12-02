const nodemailer = require('nodemailer');


const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'studium.notification.uca@gmail.com',
    pass: 'lbiu gdyn ioxf ihbg'
  }
});

const sendEmail = (req, res) => {
  const { recipients, subject, message } = req.body;

  const mailOptions = {
    from: 'studium.notification.uca@gmail.com',
    to: recipients,
    subject: subject,
    text: message
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      res.status(500).send(error.toString());
    } else {
      res.status(200).send('Correo enviado: ' + info.response);
    }
  });
};

module.exports = { sendEmail };
