const mongoose = require('mongoose');

const cursoSchema = new mongoose.Schema({
    id_tutor:{
        type: String,
        required: true
    },
    nombre_tutor: {
        type: String,
        required: true,
        minlenght: 5,
        maxlength: 50
    },
    materia: {
        type: String,
        required: true
    },
    nombre: { // Nombre del curso 
        type: String,
        required: true
    },
    horario: {
        type: String,
        required: true
    },
    fecha_inicio: {
        type: Date,
        required: true
    },
    fecha_fin: {
        type: Date,
        required: true,
        validate: {
            validator: function(value) {
                return value > this.fecha_inicio;
            },
            message: 'La fecha de finalización debe ser posterior a la fecha de inicio.'
        }
    },
    imagen: {
        type: String,
        required: true,
        default: "https://vilmanunez.com/wp-content/uploads/2016/03/herramientas-y-recursos-para-crear-curso-online.png",
        validate: {
            validator: function(value) {
                // Validación simple de URL
                return /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([\/\w .-]*)*\/?$/.test(value);
            },
            message: 'Por favor, ingresa una URL válida para la imagen.'
        }
    },
    estado: {
        type: Boolean,
        required: true,
        default: true
    },
    objetivos: {
        type: String,
        required: true
    },
    descripcion: {
        type: String,
        required: true
    },
    recursos: [{
        titulo: {
            type: String,
            required: true
        },
        descripcion: {
            type: String,
            required: true
        },
        url: {
            type: String
        }
    }],
    tutorados: [{
        username: {
            type: String,
            required: true
        },
        nombre: {
            type: String,
            required: true
        }
    }]
});

module.exports = mongoose.model('Curso', cursoSchema);
