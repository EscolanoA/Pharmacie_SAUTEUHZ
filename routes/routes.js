const express = require('express');
const routeur = express.Router();

const ctrlConnexion = require('../controllers/ctrlConnexion')

const ctrlAccueil = require('../controllers/ctrlAccueil')


const ctrlPatients = require('../controllers/ctrlPatients')

const ctrlOrdonnances = require('../controllers/ctrlOrdonnances')

const ctrlPosologies = require('../controllers/ctrlPosologies')

const ctrlMedicaments = require('../controllers/ctrlMedicaments')

const ctrlMutuelles = require('../controllers/ctrlMutuelles')

const ctrlMedecins = require('../controllers/ctrlMedecins')

const ctrlPathologies = require('../controllers/ctrlPathologies')

//Page d'indentification
routeur.get('/', ctrlConnexion.afficherConnexion)
routeur.post('/connexion', ctrlConnexion.testConnexion)



//La Page d'aceuil
routeur.get('/accueil', ctrlAccueil.afficherAcceuil)



//Routes pour la page mutuelles
routeur.get('/mutuelles', ctrlMutuelles.afficherMutuelles)
routeur.post('/mutuelles/ajouter', ctrlMutuelles.ajouterMutuelle)
routeur.get('/mutuelles/supprimer/:id', ctrlMutuelles.supprimerMututelle)

//Routes pour la sous page mutuelles/modifier
routeur.get('/mutuelles/modifier/:id', ctrlMutuelles.afficherModifMutuelle)
routeur.post('/mutuelles/modifier', ctrlMutuelles.modifMututelle)



//Routes pour la page medecins
routeur.get('/medecins', ctrlMedecins.afficherMedecins)
routeur.post('/medecins/ajouter', ctrlMedecins.ajouterMedecin)
routeur.get('/medecins/supprimer/:id', ctrlMedecins.supprimerMedecin)

//Routes pour la sous page medecins/modifier
routeur.get('/medecins/modifier/:id', ctrlMedecins.afficherModifMedecin)
routeur.post('/medecins/modifier', ctrlMedecins.modifMedecin)


//Routes pour la page pathologies
routeur.get('/pathologies', ctrlPathologies.afficherPathologies)
routeur.post('/pathologies/ajouter', ctrlPathologies.ajouterPathologie)
routeur.get('/pathologies/supprimer/:id', ctrlPathologies.supprimerPathologie)

//Routes pour la sous page pathologies/modifier
routeur.get('/pathologies/modifier/:id', ctrlPathologies.afficherModifPathologie)
routeur.post('/pathologies/modifier', ctrlPathologies.modifPathologie)




//Routes pour la page medicaments
routeur.get('/medicaments', ctrlMedicaments.afficherMedicaments)
routeur.post('/medicaments/ajouter', ctrlMedicaments.ajouterMedicament)
routeur.get('/medicaments/supprimer/:id', ctrlMedicaments.supprimerMedicament)

//Routes pour la sous page medicaments/modifier
routeur.get('/medicaments/modifier/:id', ctrlMedicaments.afficherModifMedicament)
routeur.post('/medicaments/modifier', ctrlMedicaments.modifMedicament)




//Routes pour la page Patient
routeur.get('/patients', ctrlPatients.afficherPatients)
routeur.post('/patients/ajouter', ctrlPatients.ajouterPatient)
routeur.get('/patients/supprimer/:numsecu', ctrlPatients.supprimerPatient)

//Routes pour la sous page patients/modifier
routeur.get('/patients/modifier/:numsecu/:idmut', ctrlPatients.afficherModifPatient)
routeur.post('/patients/modifier', ctrlPatients.modifPatient)

//Routes pour la sous sous page patients/ordonnances/posologies
routeur.get('/patients/ordonnances/:numsecu/posologies/:idordo', ctrlPosologies.afficherPosologies)

//CECI DEVRAIT ETRE LE FOMALISME UTILISÉ POUR TOUTES LES ROUTES CAR PLUS COMPRÉHENSIBLE ET ADAPTÉ SUR DE GROS PROJETS
routeur.get('/patients/:numsecu/ordonnances/:idordo/posologies/:idpos/supprimer', ctrlPosologies.supprimerPosologie)

routeur.post('/patients/ordonnances/posologies/ajouter', ctrlPosologies.ajouterPosologie)

routeur.get('/patients/:numsecu/ordonnances/:idordo/posologies/:idpos/modifier', ctrlPosologies.afficherModifPosologie)
routeur.post('/patients/ordonnances/posologies/modifier', ctrlPosologies.modifPosologie)





//Routes pour la sous page patients/ordonnances
routeur.get('/patients/ordonnances/:numsecu', ctrlOrdonnances.afficherOrdonnances)
routeur.post('/patients/ordonnances/ajouter', ctrlOrdonnances.ajouterOrdonnance)
routeur.get('/patients/ordonnances/:numsecu/supprimer/:idordo', ctrlOrdonnances.supprimerOrdonnance)
routeur.get('/patients/ordonnances/modifier/:idordo', ctrlOrdonnances.afficherModifOrdonnance)
routeur.post('/patients/ordonnances/modifier', ctrlOrdonnances.modifOrdonnance)






module.exports = routeur;