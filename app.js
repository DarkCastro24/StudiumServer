// Importar módulos necesarios
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const database = require('./config/database.config');
const cors = require('cors');
const apiRouter = require("./routes/index.router");

// Inicializar la aplicación Express
const app = express();

// Conectar a la base de datos
database.connect();

// Usar CORS para manejar solicitudes de diferentes orígenes
app.use(cors());

// Configurar el logger para el seguimiento de solicitudes HTTP
app.use(logger('dev'));

// Configurar body parsers para analizar JSON y datos de formulario URL-encoded
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Usar cookie parser para analizar las cookies de las solicitudes
app.use(cookieParser());

// Servir archivos estáticos desde el directorio 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Configurar el enrutador de la API para manejar las solicitudes en la ruta '/api'
app.use("/api", apiRouter);

// Exportar la aplicación para su uso en otros archivos
module.exports = app;

