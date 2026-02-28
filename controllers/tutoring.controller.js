// Importar el modelo de Curso y mongoose
const Curso = require("../models/courses.model");

// Crear un objeto controlador para agrupar las funciones
const controller = {};

// Función para guardar un nuevo tutorado en un curso
controller.save = async (req, res) => {
    try {
        // Buscar el curso por ID y comprobar si el tutorado ya está registrado
        const curso = await Curso.findById(req.params.cursoId);
        const tutorado = curso.tutorados.some(t => t.username === req.body.username);

        // Si el tutorado ya está registrado, devolver respuesta
        if (tutorado) {
            return res.status(201).json({ mensaje: "El tutorado ya esta registrado" });
        }

        // Añadir el nuevo tutorado y guardar el curso
        curso.tutorados.push(req.body);
        await curso.save();
        res.status(201).json(curso);
    } catch (error) {
        // Manejar errores y devolver respuesta con estado 500
        console.log(error);
        res.status(500).json({ mensaje: "Error al agregar tutorado", error });
    }
};

// Función para obtener todos los tutorados de un curso
controller.getAll = async (req, res) => {
    try {
        // Obtener el curso por ID y seleccionar solo los tutorados
        const cursoId = req.params.cursoId;
        const curso = await Curso.findById(cursoId).select('tutorados -_id');
        // Si el curso no se encuentra, devolver respuesta con estado 404
        if (!curso) {
            return res.status(404).json({ mensaje: "Curso no encontrado" });
        }
        // Devolver los tutorados del curso
        res.status(200).json(curso.tutorados);
    } catch (error) {
        // Manejar errores y devolver respuesta con estado 500
        res.status(500).json({ mensaje: "Error al obtener tutorados", error });
    }
};

// Función para eliminar un tutorado de un curso
controller.delete = async (req, res) => {
    try {
        // Eliminar el tutorado del curso mediante su username
        await Curso.updateOne(
            { _id: req.params.cursoId },
            { $pull: { tutorados: { username: req.params.username } } }
        );
        res.status(200).json({ mensaje: "Tutorado eliminado" });
    } catch (error) {
        // Manejar errores y devolver respuesta con estado 500
        res.status(500).json({ mensaje: "Error al eliminar tutorado", error });
    }
};

// Función para obtener los nombres de usuario de todos los tutorados de un curso
controller.getTutorings = async (req, res) => {
    try {
        // Obtener el curso por ID y generar una lista de usernames de los tutorados
        const curso = await Curso.findById(req.params.cursoId);
        const usernames = curso.tutorados.map(t => t.username).join(", ");
        res.status(200).json({ usernames });
    } catch (error) {
        // Manejar errores y devolver respuesta con estado 500
        res.status(500).json({ mensaje: "Error al obtener usernames", error });
    }
};

// Exportar el controlador
module.exports = controller;

