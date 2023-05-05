const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    adult: {
        type: Boolean,
        required: [true, 'Por favor ingresa si es para adultos o no']
    },
    backdrop_path: {
        type: String,
        required: [true, 'Por favor tecla un path']
    },
    genre_ids: {
        type: Array,
        required: [true, 'Por favor teclea los ids']
    },
    id: {
        type: String,
        required: [true, 'Por favor teclea el id'],
        unique:true
    },
    original_language: {
        type: String,
        required: [true, 'Por favor teclea el idioma']
    },
    original_title: {
        type: String,
        required: [true, 'Por favor teclea el titulo']
    },
    overview: {
        type: String,
        required: [true, 'Por favor teclea el resumen']
    },
    popularity: {
        type: Number,
        required: [true, 'Por favor teclea la popularidad']
    },
    poster_path: {
        type: String,
        required: [true, 'Por favor teclea el path del poste']
    },
    release_date: {
        type: Date,
        required: [true, 'Por favor teclea la fecha']
    },
    title: {
        type: String,
        required: [true, 'Por favor teclea el titulo']
    },
    video: {
        type: Boolean,
        required: [true, 'Por favor teclea si es video']
    },
    vote_average: {
        type: Number,
        required: [true, 'Por favor teclea el promedio']
    },
    vote_count: {
        type: Number,
        required: [true, 'Por favor teclea la cantidad de votos']
    },
}, {
    timestamps: true
})

module.exports = mongoose.model('Pelicula', userSchema)