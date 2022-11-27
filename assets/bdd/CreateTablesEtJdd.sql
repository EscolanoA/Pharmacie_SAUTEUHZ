SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

DROP TABLE IF EXISTS `Medecins`;
CREATE TABLE `Medecins`(
    `medecin_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `medecin_nom` VARCHAR(20) NOT NULL,
    `medecin_prenom` VARCHAR(20) NOT NULL,
    `medecin_tel` VARCHAR(50) NOT NULL,
    PRIMARY KEY (`medecin_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1;
INSERT INTO `Medecins` (`medecin_id`, `medecin_nom`, `medecin_prenom`,`medecin_tel`) VALUES
(1, 'Tony', 'Montana','0664589745'),
(2, 'Mont', 'Hessquieu','0669686978'),
(3, 'Doumé', 'Babar','0656326978'),
(4, 'Boloré', 'Fopaparler','0656326978'),
(5, 'Kim', 'JongHun','6589423578');


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
    `posologie_dureetraitement` INT UNSIGNED NOT NULL,
    `posologie_nbboitesmois` INT UNSIGNED NOT NULL,
    PRIMARY KEY (`posologie_id`),
    KEY `posologie_ordonnance_id` (`posologie_ordonnance_id`),
    KEY `posologie_medicament_id` (`posologie_medicament_id`)

) ENGINE=InnoDB  DEFAULT CHARSET=latin1;
INSERT INTO `Posologies` (`posologie_id`,`posologie_ordonnance_id`, `posologie_medicament_id`, `posologie_dureetraitement`,`posologie_nbboitesmois`) VALUES
(1, 1, 1, 7, 14),
(2, 1, 2, 5, 36),
(3, 2, 3, 15, 25),
(4, 2, 4, 15, 25),
(5, 3, 5, 29, 12),
(6, 3, 1, 23, 22),
(7, 4, 2, 16, 6),
(8, 4, 3, 16, 16),
(9, 5, 4, 25, 45),
(10, 5, 5, 3, 8);




DROP TABLE IF EXISTS `Medicaments`;
CREATE TABLE `Medicaments`(
    `medicament_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `medicament_nom` VARCHAR(40) NOT NULL,
    `medicament_boitesstock` INT UNSIGNED NOT NULL,
    PRIMARY KEY (`medicament_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1;
INSERT INTO `Medicaments` (`medicament_id`, `medicament_nom`, `medicament_boitesstock`) VALUES
(1, 'Doloprane', 6),
(2, 'Paracetamoule', 63),
(3, 'CanardWC', 666),
(4, 'StopCancer', 35),
(5, 'EasyLeucémie', 384);




DROP TABLE IF EXISTS `Pathologies`;
CREATE TABLE `Pathologies`(
    `pathologie_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `pathologie_nom` VARCHAR(40) NOT NULL,
    PRIMARY KEY (`pathologie_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1;
INSERT INTO `Pathologies` (`pathologie_id`, `pathologie_nom`) VALUES
(1, 'Cancer'),
(2, 'S.I.D.A'),
(3, 'Leucémie'),
(4, 'Épatant B'),
(5, 'Pneumonique');


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
('0102053523882146', 1, 'Allan','Escolano', '2003-12-12'),
('1103053623883235', 2, 'Brieuc','Meyer', '2002-05-21'),
('0104053723884365', 3, 'OuiOui',"l'Ourson", '1995-10-3'),
('1105053823885478', 4, 'Jhon', 'Doe', '1896-7-14'),
('0106053923886545', 5, 'Bob', 'Duchmol', '1989-1-19');



DROP TABLE IF EXISTS `Mutuelles`;
CREATE TABLE `Mutuelles`(
    `mutuelle_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `mutuelle_nom` VARCHAR(20) NOT NULL,
    `mutuelle_tel` VARCHAR(50) NOT NULL,
    `mutuelle_email` VARCHAR(200) NOT NULL,
    PRIMARY KEY (`mutuelle_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1;
INSERT INTO `Mutuelles` (`mutuelle_id`, `mutuelle_nom`, `mutuelle_tel`,`mutuelle_email`) VALUES
(0, 'Pas de mutuelle', '0000','0000@000.com'),
(1, 'Stevia', '0664589745','contact@stevia.com'),
(2, 'Matbut', '0669686978','contact@matbut.com'),
(3, 'MMA', '0656326978','contact@mma.com'),
(4, 'SwissLife', '0656326978','contact@swisslife.com'),
(5, 'Mutuelle générale', '6589423578','contact@mutuellegenerale.com');


DROP TABLE IF EXISTS `Pharmaciens`;
CREATE TABLE `Pharmaciens`(
    `parmacien_mail` VARCHAR(200) NOT NULL,
    `parmacien_mdp` VARCHAR(20) NOT NULL,
    PRIMARY KEY (`parmacien_mail`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1;
INSERT INTO `Pharmaciens` (`parmacien_mail`, `parmacien_mdp`) VALUES
('root@root.com', 'root');




ALTER TABLE
    `Ordonnances` ADD CONSTRAINT `ordonnances_ordonnance_medecin_id_foreign` FOREIGN KEY(`ordonnance_medecin_id`) REFERENCES `Medecins`(`medecin_id`);
ALTER TABLE
    `Ordonnances` ADD CONSTRAINT `ordonnances_ordonnance_patient_numsecu_foreign` FOREIGN KEY(`ordonnance_patient_numsecu`) REFERENCES `Patients`(`patient_numsecu`);
ALTER TABLE
    `Patients` ADD CONSTRAINT `patients_patient_mutuelle_id_foreign` FOREIGN KEY(`patient_mutuelle_id`) REFERENCES `Mutuelles`(`mutuelle_id`)ON DELETE SET NULL ;
ALTER TABLE
    `Ordonnances` ADD CONSTRAINT `ordonnances_ordonnance_pathologie_id_foreign` FOREIGN KEY(`ordonnance_pathologie_id`) REFERENCES `Pathologies`(`pathologie_id`);
ALTER TABLE
    `Posologies` ADD CONSTRAINT `posologies_posologie_ordonnance_id_foreign` FOREIGN KEY(`posologie_ordonnance_id`) REFERENCES `Ordonnances`(`ordonnance_id`);
ALTER TABLE
    `Posologies` ADD CONSTRAINT `posologies_posologie_medicament_id_foreign` FOREIGN KEY(`posologie_medicament_id`) REFERENCES `Medicaments`(`medicament_id`) ON DELETE CASCADE;