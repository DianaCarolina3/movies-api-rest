-- MySQL dump 10.13  Distrib 9.3.0, for macos15 (arm64)
--
-- Host: localhost    Database: moviesdb
-- ------------------------------------------------------
-- Server version	9.3.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `genres`
--

DROP TABLE IF EXISTS `genres`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `genres` (
  `id` binary(16) NOT NULL DEFAULT (uuid_to_bin(uuid())),
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `genres`
--

LOCK TABLES `genres` WRITE;
/*!40000 ALTER TABLE `genres` DISABLE KEYS */;
INSERT INTO `genres` VALUES (_binary '�\���4\�\�|\�\�@~�','Action'),(_binary '�\�F4\�\�|\�\�@~�','Adventure'),(_binary '�ࡸ4\�\�|\�\�@~�','Animation'),(_binary '�\�b4\�\�|\�\�@~�','Biography'),(_binary 's5�&7v𭉍\�\�\nPr','Comedy'),(_binary '�\���4\�\�|\�\�@~�','Crime'),(_binary '�\�m\Z4\�\�|\�\�@~�','Drama'),(_binary '�\�\�4\�\�|\�\�@~�','Fantasy'),(_binary 's7&�7v𭉍\�\�\nPr','Horror'),(_binary '�\�@4\�\�|\�\�@~�','Romance'),(_binary '�\�\�4\�\�|\�\�@~�','Sci-Fi'),(_binary 's7\'�7v𭉍\�\�\nPr','Thriller');
/*!40000 ALTER TABLE `genres` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `movie_genres`
--

DROP TABLE IF EXISTS `movie_genres`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `movie_genres` (
  `movie_id` binary(16) NOT NULL,
  `genre_id` binary(16) NOT NULL,
  PRIMARY KEY (`movie_id`,`genre_id`),
  KEY `genre_id` (`genre_id`),
  CONSTRAINT `movie_genres_ibfk_1` FOREIGN KEY (`movie_id`) REFERENCES `movies` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `movie_genres_ibfk_2` FOREIGN KEY (`genre_id`) REFERENCES `genres` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `movie_genres`
--

LOCK TABLES `movie_genres` WRITE;
/*!40000 ALTER TABLE `movie_genres` DISABLE KEYS */;
INSERT INTO `movie_genres` VALUES (_binary 'S6�\�	�2zϞ�',_binary '�\�m\Z4\�\�|\�\�@~�'),(_binary '\��6�\�	�2zϞ�',_binary '�\�m\Z4\�\�|\�\�@~�'),(_binary '�\�e4\�\�|\�\�@~�',_binary '�\�m\Z4\�\�|\�\�@~�'),(_binary '��L87v𭉍\�\�\nPr',_binary '�\�m\Z4\�\�|\�\�@~�'),(_binary 'S6�\�	�2zϞ�',_binary '�\���4\�\�|\�\�@~�'),(_binary '\��6�\�	�2zϞ�',_binary '�\���4\�\�|\�\�@~�'),(_binary '�\�R�4\�\�|\�\�@~�',_binary '�\���4\�\�|\�\�@~�'),(_binary '�\�f�4\�\�|\�\�@~�',_binary '�\���4\�\�|\�\�@~�'),(_binary '��L87v𭉍\�\�\nPr',_binary '�\���4\�\�|\�\�@~�'),(_binary 'S6�\�	�2zϞ�',_binary '�\���4\�\�|\�\�@~�'),(_binary '\��6�\�	�2zϞ�',_binary '�\���4\�\�|\�\�@~�'),(_binary '�\�f<4\�\�|\�\�@~�',_binary '�\�F4\�\�|\�\�@~�'),(_binary '�\�g�4\�\�|\�\�@~�',_binary '�\�F4\�\�|\�\�@~�'),(_binary '��L87v𭉍\�\�\nPr',_binary '�\�@4\�\�|\�\�@~�'),(_binary '�\�g,4\�\�|\�\�@~�',_binary '�ࡸ4\�\�|\�\�@~�'),(_binary '�\�a�4\�\�|\�\�@~�',_binary '�\�b4\�\�|\�\�@~�');
/*!40000 ALTER TABLE `movie_genres` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `movies`
--

DROP TABLE IF EXISTS `movies`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `movies` (
  `id` binary(16) NOT NULL DEFAULT (uuid_to_bin(uuid())),
  `title` varchar(255) NOT NULL,
  `year` int NOT NULL,
  `director` varchar(255) NOT NULL,
  `duration` int NOT NULL,
  `poster` text,
  `rate` decimal(2,1) unsigned NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `movies`
--

LOCK TABLES `movies` WRITE;
/*!40000 ALTER TABLE `movies` DISABLE KEYS */;
INSERT INTO `movies` VALUES (_binary 'S6�\�	�2zϞ�','The Hello123',1995,'Francis Ford Coppola',175,'https://img.fruugo.com/product/4/49/14441494      sd  sydsss      ',5.0),(_binary '\��6�\�	�2zϞ�','The Godfather',1972,'Francis Ford Coppola',175,'https://img.fruugo.com/product/4/49/14441494_max.jpg',5.0),(_binary '�\�R�4\�\�|\�\�@~�','Avatar',2009,'James Cameron',162,'https://i.etsystatic.com/35681979/r/il/dfe3ba/3957859451/il_fullxfull.3957859451_h27r.jpg',7.8),(_binary '�\�a�4\�\�|\�\�@~�','The Social Network',2010,'David Fincher',120,'https://i.pinimg.com/originals/7e/37/b9/7e37b994b613e94cba64f307b1983e39.jpg',7.7),(_binary '�\�e4\�\�|\�\�@~�','Titanic',1997,'James Cameron',195,'https://i.pinimg.com/originals/42/42/65/4242658e6f1b0d6322a4a93e0383108b.png',7.8),(_binary '�\�f<4\�\�|\�\�@~�','Jurassic Park',1993,'Steven Spielberg',127,'https://vice-press.com/cdn/shop/products/Jurassic-Park-Editions-poster-florey.jpg?v=1654518755&width=1024',8.1),(_binary '�\�f�4\�\�|\�\�@~�','The Avengers',2012,'Joss Whedon',143,'https://img.fruugo.com/product/7/41/14532417_max.jpg',8.0),(_binary '�\�g,4\�\�|\�\�@~�','The Lion King',1994,'Roger Allers, Rob Minkoff',88,'https://m.media-amazon.com/images/I/81BMmrwSFOL._AC_UF1000,1000_QL80_.jpg',8.5),(_binary '�\�g�4\�\�|\�\�@~�','The Lord of the Rings: The Return of the King',2003,'Peter Jackson',201,'https://i.ebayimg.com/images/g/0hoAAOSwe7peaMLW/s-l1600.jpg',8.9),(_binary '��L87v𭉍\�\�\nPr','Top Gun: Maverick',2022,'Joseph Kosinski',171,'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcTb0I81g39NGDx0sKP5F_DECCsdzoOwh9MVUD0PLSVvQpf3rpIM',5.0);
/*!40000 ALTER TABLE `movies` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-05-27 18:13:15
