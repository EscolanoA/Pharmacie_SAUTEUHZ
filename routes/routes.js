const express = require('express');
const routeur = express.Router();

const connexionController = require('../controllers/ctrlConnexion')
const accueilController = require('../controllers/ctrlAccueil')


const patientsController = require('../controllers/ctrlPatients')
const infosMutuelleController = require('../controllers/crtlInfosMutuelle')
const modifInfosMutuelleController = require('../controllers/crtlModifInfosMutuelle')
const modifPatientsController = require('../controllers/ctrlModifPatients')
const ordonnancesController = require('../controllers/crtlOrdonnances')
const modifMedecinController = require('../controllers/crtlModifMedecin')
const modifOrdonnancesController = require('../controllers/ctrlModifOrdonnances')
const posologiesController = require('../controllers/crtlPosologies')
const modifPosologiesController = require('../controllers/ctrlModifPosologies')
const medicamentsController = require('../controllers/ctrlMedicaments')
const modifMedicamentsController = require('../controllers/ctrlModifMedicaments')

//Page d'indentification
routeur.get('/connexion', connexionController.afficherConnexion)

//Les trois pages principales
routeur.get('/accueil', accueilController.afficherAcceuil)


routeur.get('/patients', patientsController.afficherPatients)
//sous pages
routeur.get('/patients/infosMutuelle', infosMutuelleController.afficherInfosMutuelle)
routeur.get('/patients/infosMutuelle/modifInfosMutuelle', modifInfosMutuelleController.afficherModifInfosMutuelle)
routeur.get('/patients/modifPatients', modifPatientsController.afficherModifPatients)
routeur.get('/patients/ordonnances', ordonnancesController.afficherOrdonnances)
routeur.get('/patients/ordonnances/posologies', posologiesController.afficherPosologies)
routeur.get('/patients/ordonnances/posologies/modifPosologies', modifPosologiesController.afficherModifPosologie)
routeur.get('/patients/ordonnances/modifOrdonnances', modifOrdonnancesController.afficherModifOrdonnances)
routeur.get('/patients/ordonnances/modifMedecin', modifMedecinController.afficherModifMedecin)

routeur.get('/medicaments', medicamentsController.afficherMedicaments)
//sous pages
routeur.get('/medicaments/modifMedicaments', modifMedicamentsController.afficherModifMedicaments)


module.exports = routeur;