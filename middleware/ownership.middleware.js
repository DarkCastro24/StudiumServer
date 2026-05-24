const debug = require("debug")("app:auth-middleware");
const { verifyToken } = require("../utils/jwt.tools");
const User = require("../models/user.model");
const Curso = require("../models/courses.model");
const middlewares = {};
const PREFIX = "Bearer"
const ROLES = require("../data/roles.constants.json")


middlewares.isOwner = (req, res, next) => {
    const isOwner = req.user._id.toString() === req.params.userId;
    if (!isOwner) {
        debug("Only the user themselves can change this information");
        return res.status(403).json({ error: "Forbidden" });
    }
    next();
}

middlewares.canAccessResources = async (req, res, next) => {
    try {
         const courseId = req.params.courseId || req.params.cursoId || req.params.id;
        const course = await Curso.findById(courseId);
        if (!course) {
            return res.status(404).json({ error: "Curso no encontrado" });
        }

        const isOwner = course.id_tutor.toString() === req.user._id.toString();
        const isEnrolled = course.tutorados.some(
            t => t.username === req.user.username.toString()
        );
        if(!isEnrolled){
            console.log("not enrroled");
        }
        const isAdmin = req.user.roles.includes(ROLES.ADMIN) ||
                        req.user.roles.includes(ROLES.SYSADMIN);
        if (!isOwner && !isEnrolled && !isAdmin) {
            return res.status(403).json({ error: "Forbidden" });
        }

        next();
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}

middlewares.isOwnerOrAdmin = async (req, res, next) => {
     try {
        const courseId = req.params.courseId || req.params.cursoId || req.params.id;
        const course = await Curso.findById(courseId);
        if (!course) {
            return res.status(404).json({ error: "Curso no encontrado" });
        }
        const isOwner = course.id_tutor.toString() === req.user._id.toString();
        const isAdmin = req.user.roles.includes(ROLES.ADMIN) ||
                        req.user.roles.includes(ROLES.SYSADMIN);
        if (!isOwner && !isAdmin) {
            console.log("id_tutor:", course.id_tutor.toString());
console.log("user._id:", req.user._id.toString());
            return res.status(403).json({ error: "Forbidden" });
        }
        next();
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}









module.exports = middlewares;