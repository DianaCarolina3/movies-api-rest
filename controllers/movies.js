import { MovieModel } from '../models/local-file-system/movie.js'
import { validateMovie, validatePartialMovie } from '../schema/schema.js'

export class MovieController {
  static async getAll(req, res) {
    const { genre } = req.query
    const movies = await MovieModel.getAll({ genre })

    return res.json(movies)
  }

  static async getById(req, res) {
    const { id } = req.params
    const movie = await MovieModel.getById({ id })

    if (movie) {
      return res.json(movie)
    } else {
      return res.status(404).json({ message: 'Movie not found' })
    }
  }

  static async create(req, res) {
    const result = validateMovie(req.body)
    if (!result.success) {
      // 422 es que la request funciona bien pero la sintaxis del recurso en una validacion que no es correcta
      return res.status(422).json({ error: result.error })
    }

    const newMovie = await MovieModel.create({ body: result.data })

    return res.status(201).json(newMovie)
  }

  static async update(req, res) {
    const result = validatePartialMovie(req.body)
    if (!result.success) {
      return res.status(400).json({ error: result.error })
    }

    const { id } = req.params

    const updatedMovie = await MovieModel.update({ id, body: result.data })

    if (updatedMovie === false) {
      return res.status(404).json({
        message: 'Movie not found',
      })
    } else {
      return res.json(updatedMovie)
    }
  }

  static async delete(req, res) {
    const { id } = req.params

    const deletedMovie = await MovieModel.delete({ id })

    if (deletedMovie === false) {
      return res.status(404).json({ message: 'Movie not found' })
    } else {
      return res.json({ message: 'Movie deleted' })
    }
  }
}
