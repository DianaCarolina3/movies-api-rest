import movies from '../../movies.json' with { type: 'json' }
import { randomUUID } from 'node:crypto'

// Programación por Contratos:
// Es una forma de documentar y validar el código asegurando que las funciones cumplen con sus requisitos,
// para especificar las condiciones y expectativas de una función o metodo.

// Podemos hacerlo como modulos
// contrato con modulos: proyecto o servicio se divide en unidades o módulos más pequeños, que pueden contratarse y ejecutarse de forma independiente o según un orden específico
// export const getAll = () => {}

// Podemos hacerlo como clases
// Contrato con Clases: Otras clases pueden "heredar" de la clase base, implementando los métodos y propiedades necesarios para cumplir con el contrato
// Nos ayudara a tipar en ts

// con los metodos estaticos función definida dentro de una clase que significa que podemos usarlos sin necesidad de crear una instancia de la clase
// Se llama directamente a la clase, en lugar de a un objeto, y puede ser útil para tareas que no requieren acceder a los atributos de un objeto específico
export class MovieModel {
  //({ genre }) lo pasamos como objeto porque permite extenderlo mas facil y heredarlo
  static async getAll({ genre }) {
    if (genre) {
      return movies.filter((movie) =>
        movie.genre.some((g) => g.toLowerCase() === genre.toLowerCase()),
      )
    }
    return movies
  }

  static async getById({ id }) {
    const movie = movies.find((movie) => movie.id === id)
    if (movie) {
      return movie
    }
  }

  static async create({ body }) {
    const newMovie = {
      id: randomUUID(),
      ...body,
    }
    movies.push(newMovie)
    return newMovie
  }

  static async update({ id, body }) {
    const movieIndex = movies.findIndex((movie) => movie.id === id)

    if (movieIndex === -1) {
      return false
    } else {
      return {
        ...movies[movieIndex],
        ...body,
      }
    }
  }

  static async delete({ id }) {
    const movieIndex = movies.findIndex((movie) => movie.id === id)

    if (movieIndex === -1) {
      return false
    } else {
      movies.splice(movieIndex, 1)
      return true
    }
  }
}
