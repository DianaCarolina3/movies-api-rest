// En node JS podemos crear una funcion para crear el require
// El import posee no solo los modulos si no tambien informacion de nuestro proyecto
import { createRequire } from 'node:module'

// Aqui para leer archivos json

const require = createRequire(import.meta.url)
// lo podemos exportar para usarlo en varios lugares
export const readJSON = (path) => require(path)

const movies = readJSON('../movies.json')

console.log(movies[0])
