import { Router } from 'express'
import { MovieController } from '../controllers/movies.js'
// en ESmodule no podemos importar json tal cual, hay que especificar

const router = Router()

// filtra peliculas por genero o si no las devuelve todas
router.get('/', MovieController.getAll)
// Recuperar pelicula por id
router.get('/:id', MovieController.getById)
// Crear peliculas
router.post('/', MovieController.create)
// Actualizar una parte de la movie
router.patch('/:id', MovieController.update)
// Eliminar pelicula por id
router.delete('/:id', MovieController.delete)

export default router
