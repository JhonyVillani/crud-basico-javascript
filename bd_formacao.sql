-- phpMyAdmin SQL Dump
-- version 4.7.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Nov 20, 2017 at 03:24 AM
-- Server version: 5.7.17
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
-- Database: `bd_pessoas`
--

-- --------------------------------------------------------

--
-- Table structure for table `tb01_formacao`
--


CREATE TABLE `tb01_formacao` (
  `pessoa_id` int(11) NOT NULL,
  `pessoa_nome` varchar(40) NOT NULL,
  `pessoa_sobrenome` varchar(40) NOT NULL,
  -- `pessoa_ano` year(4) NOT NULL,
  `pessoa_ano` datetime NOT NULL,
  `pessoa_formacao` varchar(40) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tb01_formacao`
--

-- INSERT INTO `tb01_formacao` (`pessoa_id`, `pessoa_nome`, `pessoa_sobrenome`, `pessoa_ano`, `pessoa_formacao`) VALUES
-- (1, 'Jhony', 'Villani', 1995, 'superior'),
-- (2, 'Pedro', 'Villani', 2016, 'ensino fundamental');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `tb01_formacao`
--
ALTER TABLE `tb01_formacao`
  ADD PRIMARY KEY (`pessoa_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `tb01_formacao`
--
ALTER TABLE `tb01_formacao`
  MODIFY `pessoa_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
