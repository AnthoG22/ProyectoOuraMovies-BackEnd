const express = require('express')
const router = express.Router()
const { createMovie, deleteMovie, getMovies,updateMovies } = require('../controllers/peliculaController')
const { protect } = require('../middleware/authMiddleware')

router.post('/create', protect, createMovie)
router.delete('/delete/:id',protect, deleteMovie)
router.get('/movies',  getMovies)
router.put('/update/:id', updateMovies)

module.exports = router
