-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 17, 2023 at 07:07 AM
-- Server version: 10.4.22-MariaDB
-- PHP Version: 8.1.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `capymusic`
--

-- --------------------------------------------------------

--
-- Table structure for table `instrumenttype`
--

CREATE TABLE `instrumenttype` (
  `type` int(11) NOT NULL,
  `name` varchar(25) DEFAULT NULL,
  `discount` float DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `instrumenttype`
--

INSERT INTO `instrumenttype` (`type`, `name`, `discount`) VALUES
(1, 'string', 0),
(2, 'percussion', 0),
(3, 'woodwind', 0),
(4, 'brass', 0),
(5, 'electric', 0),
(6, 'parts', 0),
(7, 'other', 0);

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `name` varchar(256) DEFAULT NULL,
  `price` float DEFAULT NULL,
  `description` varchar(512) DEFAULT NULL,
  `instrumentType` int(1) DEFAULT NULL,
  `filters` longtext DEFAULT NULL,
  `seller` varchar(120) DEFAULT NULL,
  `owner` varchar(320) DEFAULT 'no-owner'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `name`, `price`, `description`, `instrumentType`, `filters`, `seller`, `owner`) VALUES
(37, 'Capybara', 20000, 'un hermoso capybara que nos permite ver la belleza de la vida con su música, de capymusic para ti, te queremos', 7, 'hermoso,capybara,belleza,guitarra,Other,Brown', 'dydierripe@gmail.com', 'no-owner'),
(64, 'Electric guitar', 120000, 'a very cool electric guitar, the best of the best, no damage, I used it 20 years.', 1, 'electric,cool,rad,best,String,Red', 'dydierripe@gmail.com', 'dydierripe@gmail.com'),
(65, 'Banjo', 60000, 'A lovely banjo inherited by my grandpa, I don\'t want it anymore since his death, it just reminds me of him.', 1, 'old,beautiful,String,White', 'dydierripe@gmail.com', 'no-owner'),
(66, 'Ukelin', 150000, 'A collection piece of a Ukelin, a kind of hybrid I cant understand, I dont want it', 1, 'odd,Ukelin,worthy,String,Brown', 'dydierripe@gmail.com', 'no-owner'),
(68, 'Vendo puas', 10000, 'vendo puas de todo tipo, solo vienen 5 al azar, pero puedes ver cuales te pueden salir', 7, 'puas,guitarra,multicolor,llamativo,Other', 'dydierripe@gmail.com', 'no-owner'),
(70, 'Fonografo antiguo', 40000, 'un antiguo fonógrafo que vi por ahi en la basura, lo prometo. ', 7, 'fonografo,viejo,old,odd,extrano,Other,Brown', 'dydierripe@gmail.com', 'no-owner'),
(71, 'Schone geigen ', 60000, 'diese geigen sind meines opa, sagen sie nichts ihm bitte.', 1, 'geige,musik,schon,String,Red', 'dydierripe@gmail.com', 'yeikmauriciopulidoquitian@gmail.com'),
(72, 'flauta traversa', 40000, 'es gris, me la regalaron, pero no se como se toca, tampoco se como es escribe', 4, 'plateada,rara,odd,Brass,Gray', 'dydierripe@gmail.com', 'no-owner'),
(73, 'noisy battery', 100000, 'my son has been playing it several times, but I don\'t get the point of it, I\'d rather him to study geography.', 2, 'noisy,stupid,anti-sleep,weird,useless,Percussion,White', 'dydierripe@gmail.com', 'no-owner'),
(74, 'saxofon en buen estado', 78000, 'mi padre me lo compro cuando era niña, pero ahora paso necesidad y debo venderlo', 4, 'hermoso,preciado,amor,Brass,White', 'dydierripe@gmail.com', 'no-owner'),
(75, 'Trombon', 91200, 'I used to make youtube videos with it, but now that I moved away of my mother, my youtube channel hast lost its sense.', 4, 'used,beautiful,odd,Brass,Yellow', 'dydierripe@gmail.com', 'no-owner'),
(76, 'beautiful bass', 200000, 'I used to play with a band, the band fell apart and now I need money.', 5, 'Girly,odd,great,Electric,Purple', 'dydierripe@gmail.com', 'no-owner'),
(77, 'clarinete', 84500, 'el intrumento tocado por calamardo, que mas quieres, que lo toque patricio?', 4, 'elegante,gracia,belleza,Brass,Black', 'dydierripe@gmail.com', 'no-owner'),
(78, 'cello', 40000, 'someone else\'s trash is other\'s treasure I guess, I really suffered tryna play this, I was never able.', 1, 'awful,String,Red', 'dydierripe@gmail.com', 'no-owner'),
(79, 'Una mandolina', 110000, 'un producto raro para quien le gusten los desafios', 1, 'mandolina,odd,raro,desafiante,String,Brown', 'dydierripe@gmail.com', 'no-owner'),
(82, 'xilofono insano', 10000, 'el mas insano brrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr', 2, 'insanidad,wazaaaa,esquizofrenia,raro,odd,Percussion,Gray', 'yeikmauriciopulidoquitian@gmail.com', 'no-owner'),
(84, 'Oboe for everyone', 87000, 'I thought this oboe was a clarinete, but it looks like not, I wanted to play clarinete, not oboe', 3, 'odd,oboe,schwarz,weird,:(,Woodwind,Black', 'yeikmauriciopulidoquitian@gmail.com', 'no-owner'),
(85, 'flute for the school', 5000, 'I used this flute, my friend too, also did my boyfriend, I have not washed it.', 3, 'dirty,used,overused,school,Woodwind,White', 'yeikmauriciopulidoquitian@gmail.com', 'no-owner'),
(86, 'Fagot wtfffff', 6000, 'es un chiste en ingles, resulta que este instrumento se llama fagot, en ingles no es muy bonita la palabra, si eres el que lo compra, te dejo este mensaje: \n????????????', 4, 'faggot,odd,funny,Brass,Black', 'yeikmauriciopulidoquitian@gmail.com', 'no-owner');

-- --------------------------------------------------------

--
-- Table structure for table `reports`
--

CREATE TABLE `reports` (
  `id` int(11) NOT NULL,
  `reason` varchar(45) DEFAULT NULL,
  `issueId` int(11) NOT NULL,
  `productId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `solditems`
--

CREATE TABLE `solditems` (
  `id` int(11) NOT NULL,
  `price` float DEFAULT NULL,
  `name` varchar(256) DEFAULT NULL,
  `seller` varchar(120) DEFAULT NULL,
  `owner` varchar(120) DEFAULT NULL,
  `adress` varchar(30) DEFAULT NULL,
  `description` varchar(512) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `email` varchar(120) NOT NULL,
  `username` varchar(256) DEFAULT NULL,
  `passwrd` varchar(60) DEFAULT NULL,
  `permissionlevel` int(11) NOT NULL DEFAULT 0,
  `points` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`email`, `username`, `passwrd`, `permissionlevel`, `points`) VALUES
('anthonellam14@gmail.com', 'anthoxo', '$2b$10$ofjseIHqUVweRtefUC6rOuLjt6CLonfbyFAwArAI/gwKIKapHQSsO', 2, 0),
('carlosjripe@gmail.com', 'carloos', '$2b$10$f6PHxwTXt5P1U4sNvZ8GNOeju/ZSvTohdSVSWlZjgGF/dky.omJLK', 0, 0),
('dydierripe@gmail.com', 'dydierripe', '$2b$10$ZMOeF4ubQ4tmFWqL0Qdrfu9otHcPQAFTz/YnWj7PgO5I6H.MXbo56', 2, 0),
('fernandezfabianafernandez1@gmail.com', 'sofiua', '$2b$10$lqA0uU/NZeytI3n4Zzejp.os5iYau3LFpnPqPlgWN5IkrCTYkfTQG', 0, 0),
('lacanastasegura@gmail.com', 'Canasta', '$2b$10$DHVLKsmQB2BrFitlFdV.GOqd/tVxk3xgv/1iV/aR2vU1gvq/rnCkK', 0, 0),
('yeikmauriciopulidoquitian@gmail.com', 'Jake', '$2b$10$qeBbZ1CDJ.Pv5hsvvrkVZ.Pim2gAU5gn9GlwzimPiPYBMOscfOZES', 0, 0);

-- --------------------------------------------------------

--
-- Table structure for table `waitlist`
--

CREATE TABLE `waitlist` (
  `email` varchar(120) NOT NULL,
  `username` varchar(256) DEFAULT NULL,
  `passwrd` varchar(256) DEFAULT NULL,
  `verifyCode` int(6) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `instrumenttype`
--
ALTER TABLE `instrumenttype`
  ADD PRIMARY KEY (`type`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD KEY `instrumentType` (`instrumentType`),
  ADD KEY `seller` (`seller`);

--
-- Indexes for table `reports`
--
ALTER TABLE `reports`
  ADD PRIMARY KEY (`id`),
  ADD KEY `issueId` (`issueId`),
  ADD KEY `productId` (`productId`);

--
-- Indexes for table `solditems`
--
ALTER TABLE `solditems`
  ADD PRIMARY KEY (`id`),
  ADD KEY `seller` (`seller`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`email`),
  ADD KEY `permissionlevel` (`permissionlevel`);

--
-- Indexes for table `waitlist`
--
ALTER TABLE `waitlist`
  ADD PRIMARY KEY (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `instrumenttype`
--
ALTER TABLE `instrumenttype`
  MODIFY `type` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=88;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_ibfk_1` FOREIGN KEY (`instrumentType`) REFERENCES `instrumenttype` (`type`),
  ADD CONSTRAINT `products_ibfk_2` FOREIGN KEY (`seller`) REFERENCES `users` (`email`) ON UPDATE CASCADE;

--
-- Constraints for table `reports`
--
ALTER TABLE `reports`
  ADD CONSTRAINT `reports_ibfk_4` FOREIGN KEY (`issueId`) REFERENCES `reporttype` (`id`),
  ADD CONSTRAINT `reports_ibfk_5` FOREIGN KEY (`productId`) REFERENCES `products` (`id`);

--
-- Constraints for table `solditems`
--
ALTER TABLE `solditems`
  ADD CONSTRAINT `solditems_ibfk_1` FOREIGN KEY (`seller`) REFERENCES `users` (`email`) ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
