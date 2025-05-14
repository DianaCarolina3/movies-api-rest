const express = require('express')
const crypto = require('node:crypto')
const cors = require('cors')
const movies = require('../movies.json')
const { validateMovie, validatePartialMovie } = require('../schema/schema.js')

const PORT = process.env.PORT ?? 3000

const app = express()
app.use(express.json())
// el paquete cors soluciona en todos los origins '*'
// sin embargo tiene opciones para limitarlo
app.use(cors())
// Elimina del header la info de la tecnologia usada por seguridad
app.disable('x-powered-by')

// Metodos normales: GET/HEAD/POST
// Metodos complejos: PUT/PATCH/DELETE

// CORS PRE-Fligth
// El CORS PRE-Fligth usa OPTIONS (peticion especial previa) en los metodos complejos

// const ACCEPTED_ORIGINS = [
//   'http://localhost:8080',
//   'http://localhost:3000',
//   'https://movies.com',
// ]

// Todos los recursos que sean MOVIES se identifican con /movies
// filtra peliculas por genero
app.get('/movies', (req, res) => {
  // //CORS
  // const origin = req.header('origin')
  // // si la peticion es del mismo origin no lo muestra en el header
  // if (ACCEPTED_ORIGINS.includes(origin) || !origin) {
  //   // Todos los origenes diferente al nuestro esta permitido con '*'
  //   res.header('Access-Control-Allow-Origin', origin)
  // }

  const { genre } = req.query

  if (genre) {
    const filteredMovies = movies.filter((movie) =>
      movie.genre.some((g) => g.toLowerCase() === genre.toLowerCase()),
    )
    return res.json(filteredMovies)
  }

  res.json(movies)
})

// Recuperar pelicula por id
app.get('/movies/:id', (req, res) => {
  const { id } = req.params
  const movie = movies.find((movie) => movie.id === id)

  if (movie) {
    return res.json(movie)
  }

  res.status(404).json({ message: 'Movie not found' })
})

// Crear peliculas
app.post('/movies', (req, res) => {
  const result = validateMovie(req.body)

  if (!result.success) {
    // 422 es que la request funciona bien pero la sintaxis del recurso en una validacion no es correcta
    return res.status(422).json({ error: result.error })
  }

  const newMovie = {
    id: crypto.randomUUID(),
    ...result.data,
  }

  movies.push(newMovie)

  res.status(201).json(newMovie)
})

// Actualizar una parte de la movie
app.patch('/movies/:id', (req, res) => {
  const result = validatePartialMovie(req.body)

  if (!result.success) {
    return res.status(400).json({ error: result.error })
  }

  const { id } = req.params
  const movieIndex = movies.findIndex((movie) => movie.id === id)

  if (movieIndex === -1) {
    return res.status(404).json({
      message: 'Movie not found',
    })
  }

  const updateMovie = {
    ...movies[movieIndex],
    ...result.data,
  }

  return res.json(updateMovie)
})

// Eliminar pelicula por id
app.delete('/movies/:id', (req, res) => {
  // DELETE MOVIE
  const { id } = req.params

  const movieIndex = movies.findIndex((movie) => movie.id === id)

  if (movieIndex === -1) {
    return res.status(404).json({ message: 'Movie not found' })
  }

  movies.splice(movieIndex, 1)

  return res.json({ message: 'Movie deleted' })
})

// app.options('/movies/:id', (req, res) => {
//   const origin = req.header('origin')
//
//   if (ACCEPTED_ORIGINS.includes(origin) || !origin) {
//     res.header('Access-Control-Allow-Origin', origin)
//     res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE')
//   }
//
//   res.send(200)
// })

//En lugar de usar app.listen(), simplemente exportas la instancia de express y Vercel se encargará de ejecutarla como una función serverless.
// const server = app.listen(PORT, () => {
//   console.log(
//     `Server listening on the port http://localhost:${server.address().port}`,
//   )
// })

module.exports = app
