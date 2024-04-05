-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 05-04-2024 a las 17:03:52
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `blog_db`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categorias`
--

CREATE TABLE `categorias` (
  `id_categoria` int(11) NOT NULL,
  `nombre` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Volcado de datos para la tabla `categorias`
--

INSERT INTO `categorias` (`id_categoria`, `nombre`) VALUES
(1, 'Tecnología'),
(2, 'Salud'),
(3, 'Viajes'),
(4, 'Gastronomía'),
(5, 'Deporte'),
(7, 'Programacion'),
(8, 'Arte'),
(9, 'Noticias');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `comentarios`
--

CREATE TABLE `comentarios` (
  `id_comentario` int(11) NOT NULL,
  `contenido` varchar(255) NOT NULL,
  `fechaCreacion` date NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `id_publicacion` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Volcado de datos para la tabla `comentarios`
--

INSERT INTO `comentarios` (`id_comentario`, `contenido`, `fechaCreacion`, `id_usuario`, `id_publicacion`) VALUES
(1, 'Primer Comentario en tu publicacion', '2024-04-03', 5, 1),
(2, 'comentario en una publicacion', '2024-04-03', 5, 4),
(4, 'comentario', '2024-04-03', 5, 5),
(6, 'Comentario sobre la AI', '2024-04-04', 16, 3);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `publicaciones`
--

CREATE TABLE `publicaciones` (
  `id_publicacion` int(11) NOT NULL,
  `titulo` varchar(50) NOT NULL,
  `contenido` varchar(255) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `fecha_creacion` timestamp NOT NULL DEFAULT current_timestamp(),
  `fecha_actualizacion` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Volcado de datos para la tabla `publicaciones`
--

INSERT INTO `publicaciones` (`id_publicacion`, `titulo`, `contenido`, `id_usuario`, `fecha_creacion`, `fecha_actualizacion`) VALUES
(1, 'Título Actualizado', 'Contenido actualizado de la publicación.', 1, '2024-04-02 22:19:18', '2024-04-03 05:36:21'),
(2, 'Explorando el Espacio', 'Hoy vamos a hablar sobre los últimos avances en exploración espacial.', 5, '2024-04-02 23:05:18', '2024-04-02 23:05:18'),
(3, 'La Revolución de la IA', 'La inteligencia artificial está cambiando el mundo tal y como lo conocemos.', 7, '2024-04-02 23:05:38', '2024-04-02 23:05:38'),
(4, 'Recetas Saludables para el Desayuno', 'Descubre recetas fáciles y saludables para empezar tu día con energía.', 8, '2024-04-02 23:06:06', '2024-04-02 23:06:06'),
(5, 'Consejos para una Vida Sostenible', 'Pequeños cambios en tu día a día que pueden hacer una gran diferencia para el planeta.', 9, '2024-04-02 23:06:20', '2024-04-02 23:06:20'),
(6, 'Los Mejores Destinos de Viaje en 2024', 'Una lista de lugares increíbles que debes considerar visitar el próximo año.', 5, '2024-04-03 04:43:18', '2024-04-03 04:43:18'),
(7, 'Guía de Iniciación al Yoga', 'Todo lo que necesitas saber para empezar tu práctica de yoga, desde posturas básicas hasta consejos para principiantes.', 1, '2024-04-03 05:11:15', '2024-04-03 05:11:15'),
(9, 'Viajar en Tiempos de Pandemia', 'Consejos y mejores prácticas para viajar de manera segura durante la pandemia de COVID-19.', 1, '2024-04-03 05:13:13', '2024-04-03 05:13:13'),
(10, 'Mi nueva publicación', 'Contenido de la publicación aquí.', 1, '2024-04-03 16:06:23', '2024-04-03 16:06:23');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `publicaciones_categorias`
--

CREATE TABLE `publicaciones_categorias` (
  `id_publicacion` int(11) NOT NULL,
  `id_categoria` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Volcado de datos para la tabla `publicaciones_categorias`
--

INSERT INTO `publicaciones_categorias` (`id_publicacion`, `id_categoria`) VALUES
(10, 1),
(10, 2),
(10, 3);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `roles`
--

CREATE TABLE `roles` (
  `id_rol` int(11) NOT NULL,
  `nombre` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Volcado de datos para la tabla `roles`
--

INSERT INTO `roles` (`id_rol`, `nombre`) VALUES
(1, 'administrador'),
(2, 'usuario');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id_usuario` int(11) NOT NULL,
  `userName` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL,
  `id_rol` int(11) NOT NULL,
  `profilePhoto` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id_usuario`, `userName`, `email`, `password`, `id_rol`, `profilePhoto`) VALUES
(1, 'Admin', 'admin@example.com', 'pass0102', 1, NULL),
(5, 'H', 'adminH@example.com', 'pass0102', 2, NULL),
(7, 'UsuarioUno', 'usuario1@example.com', 'Contraseña1', 2, NULL),
(8, 'UsuarioDos', 'usuario2@example.com', 'Contraseña2', 1, NULL),
(9, 'UsuarioTres', 'usuario3@example.com', 'Contraseña3', 2, NULL),
(10, 'UsuarioCuatro', 'usuario4@example.com', 'Contraseña4', 2, NULL),
(11, 'UsuarioCinco', 'usuario5@example.com', 'Contraseña5', 2, NULL),
(16, 'Usuario 16', 'u16@example.com', 'pass16', 2, NULL),
(17, 'usuario 17', 'u17@example.com', 'pass17', 2, NULL),
(18, 'usuario 18', 'u18@example.com', 'pass18', 2, 'uploads\\profilePhoto-1712259696713-352884942.jpg');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `categorias`
--
ALTER TABLE `categorias`
  ADD PRIMARY KEY (`id_categoria`);

--
-- Indices de la tabla `comentarios`
--
ALTER TABLE `comentarios`
  ADD PRIMARY KEY (`id_comentario`),
  ADD KEY `id_usuario` (`id_usuario`),
  ADD KEY `id_publicacion` (`id_publicacion`);

--
-- Indices de la tabla `publicaciones`
--
ALTER TABLE `publicaciones`
  ADD PRIMARY KEY (`id_publicacion`),
  ADD KEY `id_usuario` (`id_usuario`);

--
-- Indices de la tabla `publicaciones_categorias`
--
ALTER TABLE `publicaciones_categorias`
  ADD PRIMARY KEY (`id_publicacion`,`id_categoria`),
  ADD KEY `id_categoria` (`id_categoria`);

--
-- Indices de la tabla `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id_rol`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id_usuario`),
  ADD UNIQUE KEY `email` (`email`),
  ADD KEY `id_rol` (`id_rol`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `categorias`
--
ALTER TABLE `categorias`
  MODIFY `id_categoria` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT de la tabla `comentarios`
--
ALTER TABLE `comentarios`
  MODIFY `id_comentario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `publicaciones`
--
ALTER TABLE `publicaciones`
  MODIFY `id_publicacion` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT de la tabla `roles`
--
ALTER TABLE `roles`
  MODIFY `id_rol` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id_usuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `comentarios`
--
ALTER TABLE `comentarios`
  ADD CONSTRAINT `comentarios_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id_usuario`),
  ADD CONSTRAINT `comentarios_ibfk_2` FOREIGN KEY (`id_publicacion`) REFERENCES `publicaciones` (`id_publicacion`);

--
-- Filtros para la tabla `publicaciones`
--
ALTER TABLE `publicaciones`
  ADD CONSTRAINT `publicaciones_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id_usuario`);

--
-- Filtros para la tabla `publicaciones_categorias`
--
ALTER TABLE `publicaciones_categorias`
  ADD CONSTRAINT `publicaciones_categorias_ibfk_1` FOREIGN KEY (`id_publicacion`) REFERENCES `publicaciones` (`id_publicacion`),
  ADD CONSTRAINT `publicaciones_categorias_ibfk_2` FOREIGN KEY (`id_categoria`) REFERENCES `categorias` (`id_categoria`);

--
-- Filtros para la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD CONSTRAINT `usuarios_ibfk_1` FOREIGN KEY (`id_rol`) REFERENCES `roles` (`id_rol`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
