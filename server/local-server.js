import { createServer } from '../app.js'
import { MovieModel } from '../models/local-file-system/movie.js'

createServer({ movieModel: MovieModel })
