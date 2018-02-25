-- phpMyAdmin SQL Dump
-- version 4.7.5
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Nov 25, 2017 at 11:53 AM
-- Server version: 5.7.20
-- PHP Version: 5.6.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `Flights`
--
CREATE DATABASE IF NOT EXISTS `Flights` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `Flights`;

-- --------------------------------------------------------

--
-- Table structure for table `vols`
--

CREATE TABLE `vols` (
  `id` int(11) NOT NULL,
  `num` varchar(255) NOT NULL,
  `departure` varchar(255) NOT NULL,
  `arrival` varchar(255) NOT NULL,
  `departure_date` varchar(255) NOT NULL,
  `arrival_date` varchar(255) NOT NULL,
  `departure_time` varchar(255) NOT NULL,
  `arrival_time` varchar(255) NOT NULL,
  `gate` varchar(255) NOT NULL,
  `price` varchar(255) NOT NULL,
  `aircraft` varchar(255) NOT NULL,
  `available_seats` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `vols`
--
ALTER TABLE `vols`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `vols`
--
ALTER TABLE `vols`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;

--
-- Database: `Flights`
--

-- --------------------------------------------------------

--
-- Table structure for table `reservation`
--

CREATE TABLE `reservation` (
  `id` varchar(11) NOT NULL,
  `numVol` int(11) NOT NULL,
  `title` varchar(5) NOT NULL,
  `firstname` varchar(33) NOT NULL,
  `lastname` varchar(33) NOT NULL,
  `email` varchar(66) NOT NULL,
  `passport_num` varchar(33) NOT NULL,
  `address` text NOT NULL,
  `phone` int(11) NOT NULL,
  `country` varchar(33) NOT NULL,
  `city` varchar(33) NOT NULL,
  `passeport_country` varchar(33) NOT NULL,
  `passeport_expiredate` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `reservation`
--
ALTER TABLE `reservation`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `reservation`
--
ALTER TABLE `reservation`
  MODIFY `id` varchar(11) NOT NULL;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;