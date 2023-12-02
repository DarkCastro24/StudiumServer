const debug = require("debug")("app:auth-middleware");
const {  verifyToken  } = require("../utils/jwt.tools");
const User = require("../models/user.model");

const middlewares = {};
const PREFIX = "Bearer"

middlewares.authentication = async (req, res, next) => {
    try {
        debug("User authentication");

        // Verificar el authorization
        const { authorization } = req.headers;

        if (!authorization) {
            return res.status(401).json({error: "User not authorized 1"});
        }

        // Validez del token
        // Token -- Bearer 
        const [prefix, token] =  authorization.split(" ");

        if (prefix !== PREFIX) {
            return res.status(401).json({error: "User not authenticated 2"});    
        }

        if (!token) {
            return res.status(401).json({error: "User not authenticated 3"});
        }

        const payload = await verifyToken(token);

        if (!payload) {
            return res.status(401).json({error: "User not authenticated 4"});
        }

        const userId = payload["sub"];
        
        // Verificar el usuario
        const user = await User.findById(userId);

        if (!user) {
            return res.status(401).json({error: "User not authenticated 5"});
        }
        
        // Comparar el token con los token registrados
        /*const isTokenValid = user.tokens.includes(token);
        if (!isTokenValid) {
            return res.status(401).json({error: "User not authenticated 6"});
        }

        // Modificar la req para añadir la info del usuario
        req.user = user;
        req.token = token;*/
        
        next();

    } catch (error) {
        console.error(error);
        return res.status(500).json({error: "Internal Server Error"});
    }
}

module.exports = middlewares;