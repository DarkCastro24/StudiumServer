const debug = require("debug")("app:auth-middleware");
const {  verifyToken  } = require("../utils/jwt.tools");
const User = require("../models/user.model");
const middlewares = {};
const PREFIX = "Bearer"
const ROLES =require("../data/roles.constants.json")

middlewares.authentication = async (req, res, next) => {
    try {
        debug("User authentication");

        // Verificar el authorization
        const { authorization } = req.headers;

        if (!authorization) {
            return res.status(401).json({error: "Autenticacion es requerida"});
              debug("Missing auth property in request");
        }

        // Validez del token
        // Token -- Bearer 
        const [prefix, token] =  authorization.split(" ");

        if (prefix !== PREFIX) {
            return res.status(401).json({error: "Autenticacion es requerida"});  
             debug("Wrong auth method");  
        }

        if (!token) {
            return res.status(401).json({error: "Autenticacion es requerida"});
            debug("Missing token in the request");  
        }

        const payload = await verifyToken(token);

        if (!payload) {
            return res.status(401).json({error: "Autenticacion es requerida"});
              debug("The token is invalid"); 

        }

        const userId = payload["sub"];
        // Verificar el usuario
        const user = await User.findById(userId);
        if (!user) {
            return res.status(401).json({error: "Autenticacion es requerida"});
            debug("The user doesnt exists"); 

        }
        
        // Comparar el token con los token registrados
        const isTokenValid = user.tokens.includes(token);
        if (!isTokenValid) {
            return res.status(401).json({error: "Autenticacion es requerida"});
            debug("The token is expired"); 

        }

        // Modificar la req para añadir la info del usuario
        req.user = user;
        req.token = token;
        next();

    } catch (error) {
        console.error(error);
        return res.status(500).json({error: "Internal Server Error"});
    }
}

middlewares.authorization = (roleRequired = []) => {
    const allowedRoles = Array.isArray(roleRequired) ? roleRequired : [roleRequired];
    return (req, res, next) => {
        // Premisa: Debe haber sido autenticado primero
        try {
        const {roles = []} = req.user;
        // Tiene el usuario alguno de esos roles
        const hasRole = allowedRoles.some(role => roles.includes(role));
        // Si no esta, responder not authorized
        if(!hasRole){
            return res.status(403).json({error: "Forbidden"});
        } 
        next();  

        } catch(error) {    
            console.error(error);
            return res.status(500).json({error: "Internal Server Error"});     
    }
}
}

middlewares.isOwner = (req, res, next) => {
    const isOwner = req.user._id.toString() === req.params.userId;
    if(!isOwner){
        return res.status(403).json({error: "Forbidden"});
        debug("Only the user themselves can change this information");
    } 
    next();
}

middlewares.isOwnerOrAdmin = (req, res, next) => {
     const isOwner = req.user._id.toString() === req.params.userId;
     const isAdmin = req.user.roles.includes(ROLES.ADMIN) || req.user.roles.includes(ROLES.SYSADMIN);

       if(!isOwner && !isAdmin){
        return res.status(403).json({error: "Forbidden"});
       }
}

module.exports = middlewares;