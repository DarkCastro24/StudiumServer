const Curso = require("../models/courses.model");
const mongoose = require('mongoose');

const controller = {};

controller.save = async (req, res) => {
    try {
        const curso = await Curso.findById(req.params.cursoId);
        const tutorado = curso.tutorados.some(t => t.username === req.body.username);

        if (tutorado) {
            return res.status(201).json({ mensaje: "El tutorado ya esta registrado" });
        }
        curso.tutorados.push(req.body);
        await curso.save();
        res.status(201).json(curso);
    } catch (error) {
        console.log(error);
        res.status(500).json({ mensaje: "Error al agregar tutorado", error });
    }
};

controller.getAll = async (req, res) => {
    try {
        const cursoId = req.params.cursoId;
        const curso = await Curso.findById(cursoId).select('tutorados -_id');
        if (!curso) {
            return res.status(404).json({ mensaje: "Curso no encontrado" });
        }
        res.status(200).json(curso.tutorados);
    } catch (error) {
        res.status(500).json({ mensaje: "Error al obtener tutorados", error });
    }
};


controller.delete = async (req, res) => {
    try {
        await Curso.updateOne(
            { _id: req.params.cursoId },
            { $pull: { tutorados: { username: req.params.username } } }
        );
        res.status(200).json({ mensaje: "Tutorado eliminado" });
    } catch (error) {
        res.status(500).json({ mensaje: "Error al eliminar tutorado", error });
    }
};

controller.getTutorings = async (req, res) => {
    try {
        const curso = await Curso.findById(req.params.cursoId);
        const usernames = curso.tutorados.map(t => t.username).join(", ");
        res.status(200).json({ usernames });
    } catch (error) {
        res.status(500).json({ mensaje: "Error al obtener usernames", error });
    }
};


module.exports = controller;
