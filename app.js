import express from 'express'
import router from './routes/movies.js'
import { corsMiddleware } from './middlewares/cors.js'

const PORT = process.env.PORT ?? 3000

const app = express()

app.use(express.json())
app.use(corsMiddleware())
// Elimina del header la info de la tecnologia usada por seguridad
app.disable('x-powered-by')

app.get('/', (req, res) => {
  res.redirect('/movies')
})

// Todos los recursos que sean MOVIES se identifican con /movies
app.use('/movies', router)

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
