const User = require("../models/user.model");
const { createToken, verifyToken } = require("../utils/jwt.tools");

const controller = {};

controller.register = async (req, res, next) => {
    try {
        const {username, password, nombre, tipo, imagen} = req.body;
    
        const user = await User.findOne({$or: [{username: username}]});
        if (user) {
            return res.status(201).json(user._id);
        }

        const newUser = new User({
            username: username,
            password: password,
            nombre: nombre,
            tipo: tipo,
            imagen: imagen
        })

        await newUser.save();

        return res.status(201).json(newUser._id);

    } catch (error) {
        console.error(error);
        return res.status(500).json({error: "Internal Server Error"});        
    }
}

controller.login = async (req, res, next) => {
    try {
        // Obtener la info -- identificador, password
        const { id, password } = req.body;
        
        // Verificar si el usuario existe
        const user = 
        await User.findOne({$or: [{username: id},{email: id}] });
        
        // Si no existe retornar 404
        if (!user) {
            return res.status(404).json({error: "User not found"});
        }
        
        // Si existe, verificamos la password
        // Si la password no coincide -- 401
        if (!user.comparePassword(password)) {
            return res.status(401).json({error: "Incorrect Password"});
        }

        // Si la password coincide -- logueamos (TO DO)
        
        // Crear un token
        const token = await createToken(id);
        
        // Almacenar token
        
        // Verificar la integridad de los tokens actuales = max 5 sesiones
        let _tokens = [...user.tokens];
        const _verifyPromises = _tokens.map(async (_t) => {
            const status = await verifyToken(_t);
            return status ? _t : null;
        });

        _tokens = (await Promise.all(_verifyPromises))
        .filter(_t => _t)
        .slice(0,4);

        _tokens = [token, ..._tokens];
        user.tokens = _tokens;

        await user.save();
        
        // Devolver token
        return res.status(200).json({token});

    } catch (error) {
        console.error(error);
        return res.status(500).json({error: "Internal Server Error"});        
    }
}

module.exports = controller;