// Validacion de esquemas con typescript ejecutado en runtime
import zShema from 'zod'

// Esquema de la crecion de una pelicula
const movieSchema = zShema.object({
  title: zShema.string({
    invalid_type_error: 'Movie title must be a string',
    required_error: 'Movie title is required',
  }),
  year: zShema.number().int().min(1900).max(2025),
  director: zShema.string({
    invalid_type_error: 'Movie director must be a string',
    required_error: 'Movie director is required',
  }),
  duration: zShema.number().int().positive(),
  poster: zShema.string().url({
    message: 'Poster movie must be a valid URL',
  }), //.endsWith('jpg'),
  genre: zShema.array(
    zShema.enum(
      [
        'Action',
        'Adventure',
        'Crime',
        'Comedy',
        'Drama',
        'Fantasy',
        'Horror',
        'Thriller',
        'Sci-Fi',
      ],
      {
        invalid_type_error: 'Movie genre must be a string',
        required_error: 'Movie genre is required',
      },
    ),
  ),
  rate: zShema.number().min(0).max(10).default(5),
})

export function validateMovie(object) {
  return movieSchema.safeParse(object)
}

export function validatePartialMovie(object) {
  return movieSchema.partial().safeParse(object)
}
