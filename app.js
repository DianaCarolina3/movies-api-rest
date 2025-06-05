import express from 'express'
import { createMovieRouter } from './routes/movies.js'
import { corsMiddleware } from './middlewares/cors.js'
import * as path from 'node:path'

export const createServer = ({ movieModel }) => {
  const PORT = process.env.PORT || 3000

  const app = express()

  const __dirname = path.resolve()

  app.use(express.json())
  app.use(corsMiddleware())
  // Elimina del header la info de la tecnologia usada por seguridad
  app.disable('x-powered-by')

  // app.get('/', (req, res) => {
  //   res.redirect('/movies')
  // })

  app.use('/', express.static(path.join(__dirname, 'web')))

  // Todos los recursos que sean MOVIES se identifican con /movies
  app.use('/movies', createMovieRouter({ movieModel }))

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

  const server = app.listen(PORT, () => {
    console.log(
      `Server listening on the port http://localhost:${server.address().port}`,
    )
  })
}
