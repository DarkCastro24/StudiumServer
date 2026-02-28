// Importar el módulo nodemailer para enviar correos electrónicos
const nodemailer = require('nodemailer');

// Crear un transportador de correo electrónico con Nodemailer y configuración para Gmail
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    // Dirección de correo electrónico del remitente 
    user: process.env.EMAIL, 
    // Contraseña del correo electrónico del remitente 
    pass: process.env.PASS   
  }
});

// Función para enviar un correo electrónico
const sendEmail = (req, res) => {
  // Extraer destinatarios, asunto y mensaje del cuerpo de la solicitud
  const { recipients, subject, message } = req.body;

  // Configurar las opciones del correo electrónico
  const mailOptions = {
    from: process.env.EMAIL, 
    to: recipients,          
    subject: subject,        
    text: message            
  };

  // Enviar el correo electrónico usando el transportador definido
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      // Enviar respuesta con estado 500 en caso de error
      res.status(500).send(error.toString());
    } else {
      // Enviar respuesta con estado 200 y mensaje de éxito si el correo es enviado
      res.status(200).send('Correo enviado: ' + info.response);
    }
  });
};

// Exportar la función sendEmail para su uso en otras partes de la aplicación
module.exports = { sendEmail };

