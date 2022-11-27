const express = require('express');
const routeur = express.Router();

const connexionController = require('../controllers/ctrlConnexion')
const accueilController = require('../controllers/ctrlAccueil')


const patientsController = require('../controllers/ctrlPatients')
const infosMutuelleController = require('../controllers/crtlInfosMutuelle')
const modifInfosMutuelleController = require('../controllers/crtlModifInfosMutuelle')
const modifPatientsController = require('../controllers/ctrlModifPatient')
const ordonnancesController = require('../controllers/crtlOrdonnances')
const modifMedecinController = require('../controllers/crtlModifMedecin')
const modifOrdonnancesController = require('../controllers/ctrlModifOrdonnances')
const posologiesController = require('../controllers/crtlPosologies')
const modifPosologiesController = require('../controllers/ctrlModifPosologies')
const medicamentsController = require('../controllers/ctrlMedicaments')
const modifMedicamentsController = require('../controllers/ctrlModifMedicament')
const mutuellesController = require('../controllers/ctrlMutuelles')

//Page d'indentification
routeur.get('/connexion', connexionController.afficherConnexion)

//Les trois pages principales
routeur.get('/accueil', accueilController.afficherAcceuil)


//Routes pour la page mutuelles
routeur.get('/mutuelles', mutuellesController.afficherMutuelles)
routeur.post('/mutuelles/ajouter', mutuellesController.ajouterMutuelle)
routeur.get('/mutuelles/modifier/:id', mutuellesController.afficherModifMutuelle)
routeur.post('/mutuelles/modifier', mutuellesController.modifMututelle)
routeur.get('/mutuelles/supprimer/:id', mutuellesController.supprimerMututelle)



//Routes pour la page Patient
routeur.get('/patients', patientsController.afficherPatients)
routeur.post('/patients/ajouter', patientsController.ajouterPatient)
routeur.get('/patients/supprimer/:numsecu', patientsController.supprimerPatient)
routeur.get('/patients/modifier/:numsecu/:idmut', modifPatientsController.afficherModifPatient)
routeur.post('/patients/modifier', modifPatientsController.modifPatient)

routeur.post('/mutuelles/ajoutermutuelle', mutuellesController.ajouterMutuelle)

//sous pages
routeur.get('/patients/infosMutuelle', infosMutuelleController.afficherInfosMutuelle)
routeur.get('/patients/infosMutuelle/modifInfosMutuelle', modifInfosMutuelleController.afficherModifInfosMutuelle)
routeur.get('/patients/ordonnances', ordonnancesController.afficherOrdonnances)
routeur.get('/patients/ordonnances/posologies', posologiesController.afficherPosologies)
routeur.get('/patients/ordonnances/posologies/modifPosologies', modifPosologiesController.afficherModifPosologie)
routeur.get('/patients/ordonnances/modifOrdonnances', modifOrdonnancesController.afficherModifOrdonnances)
routeur.get('/patients/ordonnances/modifMedecin', modifMedecinController.afficherModifMedecin)


//Routes pour la page medicaments
routeur.get('/medicaments', medicamentsController.afficherMedicaments)
routeur.post('/medicaments/ajouter', medicamentsController.ajouterMedicament)
routeur.get('/medicaments/supprimer/:id', medicamentsController.supprimerMedicament)


//Routes pour la sous page medicaments/modifier
routeur.get('/medicaments/modifier/:id', modifMedicamentsController.afficherModifMedicament)
routeur.post('/medicaments/modifier', modifMedicamentsController.modifMedicament)


module.exports = routeur;