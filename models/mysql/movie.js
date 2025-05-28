import connection from './connection.js'

export class MovieModel {
  //({ genre }) lo pasamos como objeto porque permite extenderlo mas facil y heredarlo
  static async getAll({ genre }) {
    if (genre) {
      const genreLowerCase = genre.toLowerCase()
      const [moviesForGenres] = await connection.query(
        `SELECT
            BIN_TO_UUID(movies.id) AS id,
            movies.title,
            movies.year,
            movies.director,
            movies.duration,
            movies.poster,
            movies.rate
          FROM movies
              JOIN movie_genres ON movies.id = movie_genres.movie_id
              JOIN genres ON movie_genres.genre_id = genres.id
          WHERE LOWER(genres.name) = ?;`,
        [genre],
      )

      //si no la encuentra
      if (moviesForGenres.length === 0) {
        return 'Genre Not Found'
      }

      return { [genreLowerCase]: moviesForGenres }
    }

    // si al pasar el parametro de genre viene vacio retorna []
    if (genre === '') {
      return []
    }

    const [movies] = await connection.query(`SELECT
                                              BIN_TO_UUID(movies.id) AS id,
                                              movies.title,
                                              movies.year,
                                              movies.director,
                                              movies.duration,
                                              movies.poster,
                                              movies.rate,
                                              ### DISTINCT se utiliza para eliminar filas duplicadas en los resultados de una consulta.
                                              GROUP_CONCAT(DISTINCT genres.name ORDER BY genres.name SEPARATOR ', ') AS genres
                                            FROM movies
                                                LEFT JOIN movie_genres ON movies.id = movie_genres.movie_id
                                                LEFT JOIN genres ON movie_genres.genre_id = genres.id
                                            GROUP BY movies.id, movies.title, movies.year, movies.director, movies.duration, movies.poster, movies.rate`)
    return movies
  }

  static async getById({ id }) {
    const [movieForId] = await connection.query(
      `SELECT
           BIN_TO_UUID(movies.id) AS id,
           movies.title,
           movies.year,
           movies.director,
           movies.duration,
           movies.poster,
           movies.rate,
           GROUP_CONCAT(DISTINCT genres.name ORDER BY genres.name SEPARATOR ', ') AS genres
        FROM movies
            LEFT JOIN movie_genres ON movies.id = movie_genres.movie_id
            LEFT JOIN genres ON movie_genres.genre_id = genres.id
        WHERE movies.id = UUID_TO_BIN(?);`,
      [id],
    )

    if (movieForId[0].id === null) {
      return null
    }

    return movieForId
  }

  static async create({ body }) {
    // validar en db si existe title y poster
    const [validateTitleAndPosterMovie] = await connection.query(
      `
      SELECT BIN_TO_UUID(id) AS id
        FROM movies
        WHERE LOWER(movies.title) = ? OR LOWER(movies.poster) = ?
    ;`,
      [body.title.toLowerCase(), body.poster.toLowerCase()],
    )

    // si existe el title o el poster
    if (validateTitleAndPosterMovie.length !== 0) {
      return 'Movie title or poster exits'
    }

    try {
      // al insertar mysql no devuleve los datos ni el id
      // con mysql podemos generarlo y extraerlo
      const [uuidResult] = await connection.query(`
      SELECT UUID() uuid;
    `)
      const idMovie = uuidResult[0].uuid

      // insertar pelicula
      await connection.query(
        `INSERT INTO movies (id, title, year, director, duration, poster, rate)
          VALUES (UUID_TO_BIN('${idMovie}'), ?, ?, ?, ?, ?, ?);`,
        [
          body.title,
          body.year,
          body.director,
          body.duration,
          body.poster,
          body.rate,
        ],
      )

      // buscar generos por nombre y extraer su id
      for (const genre of body.genre) {
        const [result] = await connection.query(
          `
        SELECT BIN_TO_UUID(id) AS id
            FROM genres
            WHERE genres.name = ?;`,
          [genre],
        )
        const idGenres = result[0].id

        // insertar generos relacionados a la pelicula
        await connection.query(
          `
        INSERT INTO movie_genres (movie_id, genre_id) 
            VALUES (UUID_TO_BIN('${idMovie}'), UUID_TO_BIN('${idGenres}'));`,
        )
      }

      // retornar movie creada
      const [movieCreated] = await MovieModel.getById({ id: idMovie })
      return movieCreated
    } catch (e) {
      // Puede enviar info sensible
      // No lo debe ver el usuario
      throw new Error('Error creating movie')
      // Enviar la traza a un servicio interno
      // sendLog(e)
    }
  }

  static async update({ id, body }) {
    if (!id && !body) {
      return false
    }

    try {
      // Traer los datos de la pelicula por el id
      const [result] = await connection.query(
        `
        SELECT BIN_TO_UUID(movies.id) AS id,
               movies.title,
               movies.year,
               movies.director,
               movies.duration,
               movies.poster,
               movies.rate
        FROM movies
        WHERE movies.id = UUID_TO_BIN(?)
      `,
        [id],
      )

      // si no encuentra id
      if (result.length === 0) {
        return false
      }

      const movie = result[0]

      // de manera que si no vienen por el body tome los existentes
      const movieUpdate = {
        title: body.title ?? movie.title,
        year: body.year ?? movie.year,
        director: body.director ?? movie.director,
        duration: body.duration ?? movie.duration,
        poster: body.poster ?? movie.poster,
        rate: body.rate ?? movie.rate,
      }

      // si encuentra id actualizar la pelicula sin los generos
      await connection.query(
        `
        UPDATE movies
        SET title    = ?,
            year     = ?,
            director = ?,
            duration = ?,
            poster   = ?,
            rate     = ?
        WHERE id = UUID_TO_BIN(?)
        ;`,
        [
          movieUpdate.title,
          movieUpdate.year,
          movieUpdate.director,
          movieUpdate.duration,
          movieUpdate.poster,
          movieUpdate.rate,
          id,
        ],
      )

      // si en el body vienen los generos
      if (body.genre) {
        // eliminar relacion de genres con la pelicula
        await connection.query(
          `
          DELETE
          FROM movie_genres
          WHERE movie_id = UUID_TO_BIN(?)
          ;`,
          [id],
        )
      }

      // buscar generos por nombre y extraer su id
      for (const genre of body.genre) {
        const [result] = await connection.query(
          `
          SELECT BIN_TO_UUID(id) AS id
          FROM genres
          WHERE genres.name = ?;`,
          [genre],
        )
        const idGenres = result[0].id

        // luego agregar los nuevos genros relacionados a la pelicula
        await connection.query(
          `
          INSERT INTO movie_genres (movie_id, genre_id)
          VALUES (UUID_TO_BIN(?), UUID_TO_BIN('${idGenres}'));`,
          [id],
        )
      }

      // retornar movie actualizada
      const [movieUpdated] = await MovieModel.getById({ id })
      return movieUpdated
    } catch (e) {
      throw new Error('Error updating movie')
    }
  }

  static async delete({ id }) {
    if (!id) {
      return false
    }

    const [result] = await connection.query(
      `
      DELETE FROM movies
        WHERE id = UUID_TO_BIN(?)
    ;`,
      [id],
    )

    if (result.affectedRows.length === 0) {
    }
    const rows = { ...result }
    if (rows.affectedRows === 0) {
      return false
    }

    return rows.affectedRows
  }
}
