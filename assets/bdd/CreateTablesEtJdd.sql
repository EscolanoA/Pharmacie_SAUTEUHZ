DROP DATABASE IF EXISTS `pharmacie`;
CREATE DATABASE pharmacie;
USE pharmacie;

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

DROP TABLE IF EXISTS `Medecins`;
CREATE TABLE `Medecins`(
    `medecin_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `medecin_prenom` VARCHAR(20) NOT NULL,
    `medecin_nom` VARCHAR(20) NOT NULL,
    `medecin_tel` VARCHAR(50) NOT NULL,
    `medecin_email` VARCHAR(200) NOT NULL,
    PRIMARY KEY (`medecin_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1;
INSERT INTO `Medecins` (`medecin_id`, `medecin_prenom`, `medecin_nom`,`medecin_tel`,`medecin_email`) VALUES
(1, 'René', 'Laennec','0664589745', 'contact@ReneLaennec.com'),
(2, 'Ambroise', 'Paré','0669686978', 'contact@AmbroisePare.com'),
(3, 'Jean-Martin', 'Charcot','0656326978', 'contact@Charcot.com'),
(4, 'Hippocrate', 'de Kos','0656326978', 'contact@Hippocrate2kos.com'),
(5, 'Alexander', 'Fleming','6589423578', 'contact@Fleming.com');


DROP TABLE IF EXISTS `Ordonnances`;
CREATE TABLE `Ordonnances`(
    `ordonnance_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `ordonnance_patient_numsecu` VARCHAR(255) NOT NULL,
    `ordonnance_medecin_id` INT UNSIGNED NOT NULL,
    `ordonnance_pathologie_id` INT UNSIGNED NOT NULL,
    PRIMARY KEY (`ordonnance_id`),
    KEY `ordonnance_patient_numsecu` (`ordonnance_patient_numsecu`),
    KEY `ordonnance_medecin_id` (`ordonnance_medecin_id`),
    KEY `ordonnance_pathologie_id` (`ordonnance_pathologie_id`)

) ENGINE=InnoDB  DEFAULT CHARSET=latin1;
INSERT INTO `Ordonnances` (`ordonnance_id`, `ordonnance_patient_numsecu`, `ordonnance_medecin_id`,`ordonnance_pathologie_id`) VALUES
(1, '0102053523882146', 1, 1),
(2, '1103053623883235', 2, 2),
(3, '0104053723884365', 3, 3),
(4, '1105053823885478', 4, 4),
(5, '0106053923886545', 5, 5);



DROP TABLE IF EXISTS `Posologies`;
CREATE TABLE `Posologies`(
    `posologie_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `posologie_ordonnance_id` INT UNSIGNED NOT NULL,
    `posologie_medicament_id` INT UNSIGNED NOT NULL,
    `posologie_debut` DATE NOT NULL,
    `posologie_fin` DATE NOT NULL,
    `posologie_nbboitesmois` INT UNSIGNED NOT NULL,
    PRIMARY KEY (`posologie_id`),
    KEY `posologie_ordonnance_id` (`posologie_ordonnance_id`),
    KEY `posologie_medicament_id` (`posologie_medicament_id`)

) ENGINE=InnoDB  DEFAULT CHARSET=latin1;
INSERT INTO `Posologies` (`posologie_id`,`posologie_ordonnance_id`, `posologie_medicament_id`,`posologie_debut`, `posologie_fin`,`posologie_nbboitesmois`) VALUES
(1, 1, 1,'2021-7-04' , DATE_ADD(CURDATE(), INTERVAL '2' MONTH ), 14),
(2, 1, 2,'2014-8-05' , DATE_ADD(CURDATE(), INTERVAL '9' MONTH ), 36),
(3, 2, 3,'2020-9-06' , DATE_ADD(CURDATE(), INTERVAL '2' MONTH ), 25),
(4, 2, 4,'2022-10-07' , DATE_ADD(CURDATE(), INTERVAL '5' MONTH ), 25),
(5, 3, 5,'2022-11-08' , DATE_ADD(CURDATE(), INTERVAL '7' MONTH ), 12),
(6, 3, 1,'2010-12-09' , DATE_ADD(CURDATE(), INTERVAL '2' MONTH ), 22),
(7, 4, 2,'2018-1-10' , DATE_ADD(CURDATE(), INTERVAL '2' MONTH ), 6),
(8, 4, 3,'2018-2-11' , DATE_ADD(CURDATE(), INTERVAL '9' MONTH ), 16),
(9, 5, 4,'2016-3-12' , DATE_ADD(CURDATE(), INTERVAL '5' MONTH ), 35),
(10, 5, 5,'2021-4-13' , DATE_ADD(CURDATE(), INTERVAL '2' MONTH ), 8);




DROP TABLE IF EXISTS `Medicaments`;
CREATE TABLE `Medicaments`(
    `medicament_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `medicament_nom` VARCHAR(50) NOT NULL,
    `medicament_boitesstock` INT UNSIGNED NOT NULL,
    PRIMARY KEY (`medicament_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1;
INSERT INTO `Medicaments` (`medicament_id`, `medicament_nom`, `medicament_boitesstock`) VALUES
(1, 'Retrovir', 256),
(2, 'Inlyta', 856),
(3, 'Signifor', 66),
(4, 'Cosentyx', 725),
(5, 'Leponex', 384),
(6, 'xylométazoline', 254),
(7, 'Lamaline', 78),
(8, 'Pivalone', 865),
(9, 'neo-codion', 120),
(10, 'Tussidane', 796),
(11, 'Euphon', 456),
(12, 'Paracetamol Codeine', 245);


DROP TABLE IF EXISTS `Pathologies`;
CREATE TABLE `Pathologies`(
    `pathologie_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `pathologie_nom` VARCHAR(40) NOT NULL,
    PRIMARY KEY (`pathologie_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1;
INSERT INTO `Pathologies` (`pathologie_id`, `pathologie_nom`) VALUES
(1, 'Amylose AA'),
(2, 'Artérite de Takayasu'),
(3, 'mucoviscidose'),
(4, 'phénylcétonurie'),
(5, 'Gougerot-Sjögren');


DROP TABLE IF EXISTS `Patients`;
CREATE TABLE `Patients`(
    `patient_numsecu` VARCHAR(255) NOT NULL,
    `patient_mutuelle_id` INT UNSIGNED,
    `patient_nom` VARCHAR(20) NOT NULL,
    `patient_prenom` VARCHAR(20) NOT NULL,
    `patient_datenaiss` DATE NOT NULL,
    PRIMARY KEY (`patient_numsecu`),
    KEY `patient_mutuelle_id` (`patient_mutuelle_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1;
INSERT INTO `Patients` (`patient_numsecu`, `patient_mutuelle_id`, `patient_prenom`,`patient_nom`,`patient_datenaiss`) VALUES
('4753622189562547', NULL, 'Amandine', 'Place', '1995-7-14'),
('1162176249885478', NULL, 'Frank', 'Place', '2017-7-14'),
('0102053523882146', 1, 'Allan','Escolano', '2003-12-12'),
('1103053623883235', 2, 'Brieuc','Meyer', '2002-05-21'),
('0104053723884365', 3, 'OuiOui',"l'Ourson", '1995-10-3'),
('1105053823885478', 4, 'Jhon', 'Doe', '1896-7-14'),
('0106053923886545', 5, 'Bob', 'Duchmol', '1989-1-19');



DROP TABLE IF EXISTS `Mutuelles`;
CREATE TABLE `Mutuelles`(
    `mutuelle_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `mutuelle_nom` VARCHAR(40) NOT NULL,
    `mutuelle_tel` VARCHAR(50) NOT NULL,
    `mutuelle_email` VARCHAR(200) NOT NULL,
    PRIMARY KEY (`mutuelle_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1;
INSERT INTO `Mutuelles` (`mutuelle_id`, `mutuelle_nom`, `mutuelle_tel`,`mutuelle_email`) VALUES
(1, 'CSS', '0664589745','comp@santeSolidaire.gouv'),
(2, 'MatMut', '0669686978','contact@matmut.com'),
(3, 'MMA', '0656326978','hello@mma.com'),
(4, 'SwissLife', '0656326978','contact@swisslife.com'),
(5, 'Mutuelle générale', '6589423578','contact@mutuellegenerale.com');


DROP TABLE IF EXISTS `Pharmaciens`;
CREATE TABLE `Pharmaciens`(
    `parmacien_email` VARCHAR(200) NOT NULL,
    `parmacien_mdp` VARCHAR(20) NOT NULL,
    PRIMARY KEY (`parmacien_email`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1;
INSERT INTO `Pharmaciens` (`parmacien_email`, `parmacien_mdp`) VALUES
('pharmacien@mail.com', 'root');




ALTER TABLE
    `Ordonnances` ADD CONSTRAINT `ordonnances_ordonnance_medecin_id_foreign` FOREIGN KEY(`ordonnance_medecin_id`) REFERENCES `Medecins`(`medecin_id`) ON DELETE CASCADE;
ALTER TABLE
    `Ordonnances` ADD CONSTRAINT `ordonnances_ordonnance_patient_numsecu_foreign` FOREIGN KEY(`ordonnance_patient_numsecu`) REFERENCES `Patients`(`patient_numsecu`) ON DELETE CASCADE;
ALTER TABLE
    `Patients` ADD CONSTRAINT `patients_patient_mutuelle_id_foreign` FOREIGN KEY(`patient_mutuelle_id`) REFERENCES `Mutuelles`(`mutuelle_id`)ON DELETE SET NULL ;
ALTER TABLE
    `Ordonnances` ADD CONSTRAINT `ordonnances_ordonnance_pathologie_id_foreign` FOREIGN KEY(`ordonnance_pathologie_id`) REFERENCES `Pathologies`(`pathologie_id`) ON DELETE CASCADE;
ALTER TABLE
    `Posologies` ADD CONSTRAINT `posologies_posologie_ordonnance_id_foreign` FOREIGN KEY(`posologie_ordonnance_id`) REFERENCES `Ordonnances`(`ordonnance_id`) ON DELETE CASCADE;
ALTER TABLE
    `Posologies` ADD CONSTRAINT `posologies_posologie_medicament_id_foreign` FOREIGN KEY(`posologie_medicament_id`) REFERENCES `Medicaments`(`medicament_id`) ON DELETE CASCADE;