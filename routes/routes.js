const express = require('express');
const routeur = express.Router();

const connexionController = require('../controllers/ctrlConnexion')
const accueilController = require('../controllers/ctrlAccueil')
const patientsController = require('../controllers/ctrlPatients')
const medicamentsController = require('../controllers/ctrlMedicaments')

//Page d'indentification
routeur.get('/connexion', connexionController.afficherConnexion)

//Les trois pages principales
routeur.get('/accueil', accueilController.afficherAcceuil)
routeur.get('/patients', patientsController.afficherPatients)
routeur.get('/medicaments', medicamentsController.afficherMedicaments)


module.exports = routeur;