const express = require('express');
const routeur = express.Router();

const connexionController = require('../controllers/ctrlConnexion')
const accueilController = require('../controllers/ctrlAccueil')


const patientsController = require('../controllers/ctrlPatients')

const ordonnancesController = require('../controllers/ctrlOrdonnances')

const posologiesController = require('../controllers/ctrlPosologies')

const medicamentsController = require('../controllers/ctrlMedicaments')

const mutuellesController = require('../controllers/ctrlMutuelles')

//Page d'indentification
routeur.get('/connexion', connexionController.afficherConnexion)



//La Page d'aceuil
routeur.get('/accueil', accueilController.afficherAcceuil)



//Routes pour la page mutuelles
routeur.get('/mutuelles', mutuellesController.afficherMutuelles)
routeur.post('/mutuelles/ajouter', mutuellesController.ajouterMutuelle)
routeur.get('/mutuelles/supprimer/:id', mutuellesController.supprimerMututelle)

//Routes pour la sous page mutuelles/modifier
routeur.get('/mutuelles/modifier/:id', mutuellesController.afficherModifMutuelle)
routeur.post('/mutuelles/modifier', mutuellesController.modifMututelle)




//Routes pour la page medicaments
routeur.get('/medicaments', medicamentsController.afficherMedicaments)
routeur.post('/medicaments/ajouter', medicamentsController.ajouterMedicament)
routeur.get('/medicaments/supprimer/:id', medicamentsController.supprimerMedicament)

//Routes pour la sous page medicaments/modifier
routeur.get('/medicaments/modifier/:id', medicamentsController.afficherModifMedicament)
routeur.post('/medicaments/modifier', medicamentsController.modifMedicament)




//Routes pour la page Patient
routeur.get('/patients', patientsController.afficherPatients)
routeur.post('/patients/ajouter', patientsController.ajouterPatient)
routeur.get('/patients/supprimer/:numsecu', patientsController.supprimerPatient)

//Routes pour la sous page patients/modifier
routeur.get('/patients/modifier/:numsecu/:idmut', patientsController.afficherModifPatient)
routeur.post('/patients/modifier', patientsController.modifPatient)

//Routes pour la sous page patients/ordonnances
routeur.get('/patients/ordonnances/:numsecu', ordonnancesController.afficherOrdonnances)


//sous pages
routeur.get('/patients/ordonnances/posologies/:idordo', posologiesController.afficherPosologies)
//routeur.get('/patients/ordonnances/posologies/modifPosologies', modifPosologiesController.afficherModifPosologie)
//routeur.get('/patients/ordonnances/modifOrdonnances', modifOrdonnancesController.afficherModifOrdonnances)
//routeur.get('/patients/ordonnances/modifMedecin', modifMedecinController.afficherModifMedecin)




module.exports = routeur;