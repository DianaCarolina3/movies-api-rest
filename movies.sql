-- Crear base de datos
CREATE DATABASE IF NOT EXISTS moviesdb;
USE moviesdb;

-- Crear tabla de películas
CREATE TABLE IF NOT EXISTS movies (
                                      id       BINARY(16) PRIMARY KEY DEFAULT (UUID_TO_BIN(UUID())),
                                      title    VARCHAR(255) NOT NULL,
                                      year     INT NOT NULL,
                                      director VARCHAR(255) NOT NULL,
                                      duration INT NOT NULL,
                                      poster   TEXT,
                                      rate     DECIMAL(2,1) UNSIGNED NOT NULL
);

-- Crear tabla de géneros
CREATE TABLE IF NOT EXISTS genres (
                                      id   BINARY(16) PRIMARY KEY DEFAULT (UUID_TO_BIN(UUID())),
                                      name VARCHAR(255) NOT NULL UNIQUE
);

-- Crear tabla intermedia movie_genres
CREATE TABLE IF NOT EXISTS movie_genres (
                                            movie_id BINARY(16),
                                            genre_id BINARY(16),
                                            PRIMARY KEY (movie_id, genre_id),
                                            FOREIGN KEY (movie_id) REFERENCES movies(id) ON DELETE CASCADE ON UPDATE CASCADE,
                                            FOREIGN KEY (genre_id) REFERENCES genres(id) ON DELETE CASCADE ON UPDATE CASCADE
);

-- Insertar géneros
INSERT INTO genres (name)
VALUES ('Drama'),
       ('Action'),
       ('Crime'),
       ('Adventure'),
       ('Sci-Fi'),
       ('Romance'),
       ('Animation'),
       ('Biography'),
       ('Comedy'),
       ('Horror'),
       ('Thriller');

-- Insertar películas
INSERT INTO movies (id, title, year, director, duration, poster, rate)
VALUES
    (UUID_TO_BIN(UUID()), 'Avatar', 2009, 'James Cameron', 162, 'https://i.etsystatic.com/35681979/r/il/dfe3ba/3957859451/il_fullxfull.3957859451_h27r.jpg', 7.8),
    (UUID_TO_BIN(UUID()), 'The Social Network', 2010, 'David Fincher', 120, 'https://i.pinimg.com/originals/7e/37/b9/7e37b994b613e94cba64f307b1983e39.jpg', 7.7),
    (UUID_TO_BIN(UUID()), 'Titanic', 1997, 'James Cameron', 195, 'https://i.pinimg.com/originals/42/42/65/4242658e6f1b0d6322a4a93e0383108b.png', 7.8),
    (UUID_TO_BIN(UUID()), 'Jurassic Park', 1993, 'Steven Spielberg', 127, 'https://vice-press.com/cdn/shop/products/Jurassic-Park-Editions-poster-florey.jpg?v=1654518755&width=1024', 8.1),
    (UUID_TO_BIN(UUID()), 'The Avengers', 2012, 'Joss Whedon', 143, 'https://img.fruugo.com/product/7/41/14532417_max.jpg', 8.0),
    (UUID_TO_BIN(UUID()), 'The Lion King', 1994, 'Roger Allers, Rob Minkoff', 88, 'https://m.media-amazon.com/images/I/81BMmrwSFOL._AC_UF1000,1000_QL80_.jpg', 8.5),
    (UUID_TO_BIN(UUID()), 'The Lord of the Rings: The Return of the King', 2003, 'Peter Jackson', 201, 'https://i.ebayimg.com/images/g/0hoAAOSwe7peaMLW/s-l1600.jpg', 8.9);

-- Insertar relaciones movie-genres
INSERT INTO movie_genres (movie_id, genre_id)
VALUES
    ((SELECT id FROM movies WHERE title = 'Avatar'), (SELECT id FROM genres WHERE name = 'Action')),
    ((SELECT id FROM movies WHERE title = 'The Social Network'), (SELECT id FROM genres WHERE name = 'Biography')),
    ((SELECT id FROM movies WHERE title = 'Titanic'), (SELECT id FROM genres WHERE name = 'Drama')),
    ((SELECT id FROM movies WHERE title = 'Jurassic Park'), (SELECT id FROM genres WHERE name = 'Adventure')),
    ((SELECT id FROM movies WHERE title = 'The Avengers'), (SELECT id FROM genres WHERE name = 'Action')),
    ((SELECT id FROM movies WHERE title = 'The Lion King'), (SELECT id FROM genres WHERE name = 'Animation')),
    ((SELECT id FROM movies WHERE title = 'The Lord of the Rings: The Return of the King'), (SELECT id FROM genres WHERE name = 'Adventure'));
