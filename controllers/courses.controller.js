const Curso = require('../models/courses.model');

const controller = {};

//  Funciones de cursos general
controller.save = async (req, res, next) => {
    try {
        const curso = new Curso(req.body);
        const savedCurso = await curso.save();
        res.status(201).json(savedCurso);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

controller.findAll = async (req, res, next) => {
    try {
        
        const courses = await Curso.find().select('-recursos');
        return res.status(200).json({ courses });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error'});
    }
}

controller.findAllPagination = async (req, res, next) => {
    try {
        const page = parseInt(req.query.page) || 1; 
        const limit = parseInt(req.query.limit) || 10; 
        const startIndex = (page - 1) * limit;

        const total = await Curso.countDocuments(); 
        const courses = await Curso.find().select('-recursos').limit(limit).skip(startIndex);

        const totalPages = Math.ceil(total / limit);
        const hasPrevPage = page > 1;
        const hasNextPage = page < totalPages;

        return res.status(200).json({
            totalCourses: total,
            totalPages: totalPages,
            currentPage: page,
            hasNextPage: hasNextPage,
            hasPrevPage: hasPrevPage,
            courses
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error'});
    }
}

controller.findOneById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const curso = await Curso.findById(id).lean();

        if (!curso) {
            return res.status(404).json({ error: "Course not found" });
        }

        return res.status(200).json(curso);

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}

controller.deleteById = async (req, res,next) => {
    try {
        const { id } = req.params;

        const curso = await Curso.findByIdAndDelete(id);

        if (!curso) {
            return res.status(404).json({error: "Course not found"});
        }

        return res.status(200).json({message: "Course deleted"});
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error'}); 
    }
}

controller.filterCoursesSubject = async (req, res) => {
    try {
        const { materia } = req.body;

        if (!materia) {
            return res.status(400).send({ message: 'Materia is required' });
        }

        const regex = new RegExp(materia, 'i'); 

        let cursos = await Curso.find({ materia: regex }).lean(); 

        res.json(cursos);

    } catch (error) {
        res.status(500).send({ message: 'Error retrieving courses', error });
    }
};

controller.filterCoursesName = async (req, res) => {
    try {
        const { materia } = req.body;

        if (!materia) {
            return res.status(400).send({ message: 'Materia is required' });
        }

        const regex = new RegExp(materia, 'i'); 

        let cursos = await Curso.find({ nombre: regex }).lean(); 

        res.json(cursos);

    } catch (error) {
        res.status(500).send({ message: 'Error retrieving courses', error });
    }
};

//  Funciones para la gestion de recursos
controller.saveResource = async (req, res) => {
    const cursoId = req.params.id; 
    const newResource = req.body; 

    try {
        const curso = await Curso.findById(cursoId);
        if (!curso) {
            return res.status(404).json({ message: 'Curso not found' });
        }

        curso.recursos.push(newResource); 
        await curso.save(); 

        res.status(201).json(curso);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

controller.updateResource = async (req, res) => {
    const cursoId = req.params.courseId;
    const resourceId = req.params.resourceId;
    const newData = req.body;

    try {
        const course = await Curso.findById(cursoId);
        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }

        const resource = course.recursos.id(resourceId);
        if (!resource) {
            return res.status(404).json({ message: 'Resource not found' });
        }

        Object.assign(resource, newData); 
        await course.save();

        res.status(200).json(course);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

controller.deleteResource = async (req, res) => {
    const courseId = req.params.courseId;
    const resourceId = req.params.resourceId;

    try {
        const curso = await Curso.findById(courseId);
        if (!curso) {
            return res.status(404).json({ message: 'Curso not found' });
        }

        const resourceIndex = curso.recursos.findIndex(r => r._id.toString() === resourceId);
        if (resourceIndex === -1) {
            return res.status(404).json({ message: 'Resource not found' });
        }

        curso.recursos.splice(resourceIndex, 1);
        await curso.save();

        res.status(200).json({message: "Resource deleted"});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

controller.findResources = async (req, res, next) => {
    try {
        const cursoId = req.params.id;  
        const curso = await Curso.findById(cursoId, 'recursos');
        if (!curso) {
            return res.status(404).json({ message: 'Curso not found' });
        }
        res.status(200).json(resources);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error'});
    }
}

// Funcion para obtener los cursos pertenecientes a un usuario
controller.filterByUserId = async (req, res) => {
    try {
        // Obtener el id_tutor de los parámetros de la URI
        const idTutor = req.params.id;
        // Buscar cursos que tengan el mismo id_tutor
        const cursos = await Curso.find({ id_tutor: idTutor }, { recursos: 0, tutorados: 0 });
        // Si no se encuentran cursos, enviar un mensaje adecuado
        if (!cursos || cursos.length === 0) {
            return res.status(201).json({ message: "No se encontraron cursos para el tutor especificado" });
        }
        // Enviar respuesta con los cursos encontrados
        res.status(200).json(cursos);
    } catch (error) {
        // Manejar errores (por ejemplo, error de conexión a la base de datos)
        res.status(500).json({ message: "Error al buscar los cursos", error: error.message });
        console.log(error);
    }
};

module.exports = controller;
