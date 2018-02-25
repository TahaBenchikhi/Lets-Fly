
DROP TABLE IF EXISTS `reservation`;

CREATE TABLE `reservation` (
  `id` varchar(11) NOT NULL,
  `numVol` int(11) NOT NULL,
  `title` varchar(5) NOT NULL,
  `firstname` varchar(33) NOT NULL,
  `lastname` varchar(33) NOT NULL,
  `email` varchar(66) NOT NULL,
  `passport_num` varchar(33) NOT NULL DEFAULT '',
  `address` text NOT NULL,
  `phone` int(11) NOT NULL,
  `country` varchar(33) NOT NULL,
  `city` varchar(33) NOT NULL,
  `passeport_country` varchar(33) NOT NULL,
  `passeport_expiredate` varchar(33) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

DROP TABLE IF EXISTS `vols`;

CREATE TABLE `vols` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
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
  `available_seats` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

LOCK TABLES `vols` WRITE;
