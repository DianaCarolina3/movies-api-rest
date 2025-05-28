import { createServer } from '../app.js'
import { MovieModel } from '../models/mysql/movie.js'

createServer({ movieModel: MovieModel })
