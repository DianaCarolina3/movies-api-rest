import { createServer } from '../app.js'
import { MovieModel } from '../models/mysql/movie.js'

console.log('🟢 Ejecutando mysql-server.js...')

createServer({ movieModel: MovieModel })
