const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const Pelicula = require('../models/peliculaModel')


const createMovie = asyncHandler(async (req, res) => {

    //desestructuramos el body request
    const { adult, backdrop_path, genre_ids, id,original_language,original_title,overview,
        popularity,poster_path,release_date, title,video,vote_average,vote_count} = req.body

    //verificamos que recibamos la informacion que el modelo User necesita
    if (!adult || !backdrop_path || !genre_ids || !id || !original_language || !original_title ||!overview || !popularity || !poster_path ||!release_date || !title || !video ||!vote_average ||!vote_count) {
        res.status(400)
        throw new Error('Favor de verificar que esten todos los datos')
    }

    //verificamos que no exista ya ese usuario en la coleccion
    const idExiste = await Pelicula.findOne({ id })
    if (idExiste) {
        res.status(400)
        throw new Error('Ese id ya fué registrado, la pelicula ya existe')
    }

    //Verificamos que la tarea pertenece al usuario del token
    if (!req.user.admin) {
        res.status(401)
        throw new Error('Acceso no Autorizado, no eres admin para crear peliculas')
    }

    //creamos la pelicula
    const pelicula = await Pelicula.create({
        adult, backdrop_path, genre_ids, id,original_language,original_title,overview,
        popularity,poster_path,release_date, title,video,vote_average,vote_count
    })

    //mandamos la respuesta de la funcion
    if (pelicula) {
        res.status(201).json({
            adult, backdrop_path, genre_ids, id,original_language,original_title,overview,
            popularity,poster_path,release_date, title,video,vote_average,vote_count
        })
    } else {
        res.status(400)
        throw new Error('No se pudo crear la pelicula, datos incorrectos')
    }
})

const deleteMovie = asyncHandler(async (req, res) => {

    const pelicula = await Pelicula.findById(req.params.id)

    if (!pelicula) {
        res.status(400)
        throw new Error('Pelicula no encontrada')
    }

    //Verificamos que la tarea pertenece al usuario del token
    if (!req.user.admin) {
        res.status(401)
        throw new Error('Acceso no Autorizado, no eres admin para borrar peliculas')
    }

    //await tarea.remove()
    await pelicula.deleteOne()

    //const tareaBorrada = await Tarea.findByIdAndDelete(req.params.id)

    res.status(200).json({ id: req.params.id })
})

const getMovies = asyncHandler(async (req, res) => {

    const peliculas = await Pelicula.find()

    res.status(200).json(peliculas)
})

const updateMovies = asyncHandler(async (req, res) => {

    const pelicula = await Pelicula.findById(req.params.id)

    //Verificamos que la pelicula exista
    if (!pelicula) {
        res.status(400)
        throw new Error('Pelicula no encontrada')
    }
    const likes = pelicula.vote_count

    likes = likes +1

    const peliculaModificada = await Pelicula.findByIdAndUpdate(req.params.id, {vote_count : likes}, { new: true })

    res.status(200).json(peliculaModificada)
})

module.exports = {
    createMovie, 
    deleteMovie, 
    getMovies,
    updateMovies
}