//import { MovieModel } from '../models/local-file-system/movie.js'
import { validate as uuidValidate } from 'uuid'
import { validateMovie, validatePartialMovie } from '../schema/schema.js'

export class MovieController {
  constructor({ movieModel }) {
    this.movieModel = movieModel
  }

  getAll = async (req, res) => {
    const { genre } = req.query
    const movies = await this.movieModel.getAll({ genre })

    return res.json(movies)
  }

  getById = async (req, res) => {
    const { id } = req.params
    const movie = await this.movieModel.getById({ id })

    if (movie) {
      return res.json(movie)
    } else {
      return res.status(404).json({ message: 'Movie not found' })
    }
  }

  create = async (req, res) => {
    const result = validateMovie(req.body)
    if (!result.success) {
      // 422 es que la request funciona bien pero la sintaxis del recurso en una validacion que no es correcta
      return res.status(422).json({ error: result.error })
    }

    const newMovie = await this.movieModel.create({ body: result.data })

    return res.status(201).json(newMovie)
  }

  update = async (req, res) => {
    const result = validatePartialMovie(req.body)
    if (!result.success) {
      return res.status(400).json({ error: result.error })
    }

    const { id } = req.params

    if (uuidValidate(id) === false) {
      return res.status(400).json({ message: 'Invalid id' })
    }

    const updatedMovie = await this.movieModel.update({ id, body: result.data })

    if (updatedMovie === false) {
      return res.status(404).json({
        message: 'Movie not found',
      })
    } else {
      return res.json(updatedMovie)
    }
  }

  delete = async (req, res) => {
    const { id } = req.params

    if (uuidValidate(id) === false) {
      return res.status(400).json({ message: 'Invalid id' })
    }

    const deletedMovie = await this.movieModel.delete({ id })

    if (deletedMovie === false) {
      return res.status(404).json({ message: 'Movie not found' })
    } else {
      return res.json({ message: 'Movie deleted' })
    }
  }
}
