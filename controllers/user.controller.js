const User = require("../models/user.model");

const controller = {};

controller.getAll = async (req, res, next) => {
    try {

        const user = await User.find();
        
        if (!user) {
            return res.status(404).send({ message: "User not found" });
        }
        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Server error" });
    }
}

controller.filterUsers = async (req, res, next) => {
    try {
        // Obtener el nombre del query string y crear una expresión regular
        const name = req.body.nombre;
        const regex = new RegExp(name, 'i'); // 'i' para hacer la búsqueda insensible a mayúsculas y minúsculas

        // Buscar usuarios que coincidan con la expresión regular
        const users = await User.find({ nombre: regex });

        // Enviar respuesta con los usuarios encontrados
        res.status(200).json(users);
    } catch (error) {
        // Manejar errores (por ejemplo, error de conexión a la base de datos)
        res.status(500).json({ message: "Error al buscar usuarios", error: error.message });
    }
}

controller.addSubject = async (req, res) => {
    try {
        const userId = req.params.userId;
        const newSubject = req.body; 

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).send({ message: "User not found" });
        }

        const isSubjectExist = user.materias_interes.some(subject => 
            subject.materia=== newSubject.materia); 

        if (isSubjectExist) {
            return res.status(400).send({ message: "Subject already exists" });
        }

        user.materias_interes.push(newSubject);
        await user.save();

        res.status(201).send(user.materias_interes);
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Server error" });
    }
};


controller.getProfile = async (req, res, next) => {
    try {
        const userId = req.params.userId;
        const user = await User.findById(userId).select();

        if (!user) {
            return res.status(404).send({ message: "User not found" });
        }

        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Server error" });
    }
}

controller.updateProfile = async (req, res, next) => {
    try {
        const userId = req.params.userId;
        const { carrera, num_materias, cum } = req.body; 

        const updateData = {};
        if (carrera !== undefined) updateData.carrera = carrera;
        if (num_materias !== undefined) updateData.num_materias = num_materias;
        if (cum !== undefined) updateData.cum = cum;

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { $set: updateData },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).send({ message: "User not found" });
        }

        res.status(200).send(updatedUser);
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Server error" });
    }
}

controller.deleteSubject = async (req, res) => {
    try {
        const userId = req.params.userId;
        const materiaId = req.params.subjectId; 

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).send({ message: "User not found" });
        }

        user.materias_interes = user.materias_interes.filter(materia => materia._id.toString() !== materiaId);
        await user.save();

        res.status(200).send({ message: "Subject deleted"});
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Server error" });
    }
};

controller.deleteUser = async (req, res) => {
    try {
        const userId = req.params.userId;

        const result = await User.findByIdAndDelete(userId);

        if (!result) {
            return res.status(404).send({ message: "User not found" });
        }

        res.status(200).send({ message: "User successfully deleted" });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Error deleting user" });
    }
};

module.exports = controller;