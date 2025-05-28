import { Router } from 'express'
import { MovieController } from '../controllers/movies.js'
// en ESmodule no podemos importar json tal cual, hay que especificar

export const createMovieRouter = ({ movieModel }) => {
  const router = Router()

  const movieController = new MovieController({ movieModel })

  // filtra peliculas por genero o si no las devuelve todas
  router.get('/', movieController.getAll)
  // Recuperar pelicula por id
  router.get('/:id', movieController.getById)
  // Crear peliculas
  router.post('/', movieController.create)
  // Actualizar una parte de la movie
  router.patch('/:id', movieController.update)
  // Eliminar pelicula por id
  router.delete('/:id', movieController.delete)

  return router
}
