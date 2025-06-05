import cors from 'cors'

// el paquete cors soluciona en todos los origins '*'
// sin embargo tiene opciones para limitarlo

const ACCEPTED_ORIGINS = [
  'https://movies-api-rest-owf5.onrender.com/',
  'http://localhost:10000',
  'http://localhost:8080',
  'http://localhost:4000',
  'https://movies.com',
]

// Aqui pasamos el acceptedOrigins por defecto, o asi lo podemos pasar en app.js si queremos tambien
export const corsMiddleware = ({ acceptedOrigins = ACCEPTED_ORIGINS } = {}) =>
  cors({
    origin: (origin, callback) => {
      if (acceptedOrigins.includes(origin) || !origin) {
        return callback(null, true)
      } else {
        return callback(new Error('Not allowed by CORS'))
      }
    },
  })

// Metodos normales: GET/HEAD/POST
// Metodos complejos: PUT/PATCH/DELETE

// CORS PRE-Fligth
// El CORS PRE-Fligth usa OPTIONS (peticion especial previa) en los metodos complejos

// const ACCEPTED_ORIGINS = [
//   'http://localhost:8080',
//   'http://localhost:3000',
//   'https://movies.com',
// ]
