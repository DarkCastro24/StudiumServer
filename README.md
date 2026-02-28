# Dependencias de Studium

El servicio web (backend) de Studium utiliza varias dependencias y complementos para su funcionamiento. A continuación, se detallan con una breve descripción de su propósito en el proyecto:

## Dependencias

- *express*:  Framework de Node.js para la creación de aplicaciones Web y APIs. 
- *mongoose*: Una biblioteca de modelado de objetos para MongoDB que facilita la interacción con la base de datos.
- *cookie-parser*: Utilizado para analizar las cookies de las solicitudes HTTP.
- *cors*: Un paquete para proporcionar un middleware Connect/Express que se puede usar para habilitar CORS.
- *debug*: Una pequeña biblioteca de JavaScript para crear un simple depurador de aplicaciones.
- *dotenv*: Carga variables de entorno de un archivo `.env` a `process.env`, proporcionando una forma fácil de configurar la aplicación.
- *express-validator*: Un conjunto de middlewares express que envuelve funciones de validador y saneamiento de validator.js.
- *http-errors*: Crea errores HTTP para Express, Koa, Connect, etc. con facilidad.
- *jose*: Biblioteca JavaScript para realizar operaciones JOSE (JWT, JWS, JWE, JWK, JWA) para Node.js.
- *morgan*: Middleware de registro de solicitudes HTTP para Node.js.
- *nodemailer*: Un módulo para aplicaciones Node.js que permite enviar correos electrónicos de manera fácil.

## Dependencias de Desarrollo

- *nodemon*: Una herramienta que ayuda a desarrollar aplicaciones basadas en Node.js al reiniciar automáticamente la aplicación cuando se detectan cambios en los archivos.

## Scripts

- `start`: Inicia la aplicación usando Node.js.
- `dev`: Inicia la aplicación en modo de desarrollo con `nodemon` para reiniciar automáticamente en caso de cambios.