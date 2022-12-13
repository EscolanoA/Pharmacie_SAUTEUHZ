/**
 * @Auteur Brieuc Meyer
 * @Version 1.0.0
 * @Crédits : Lorenzo Porcu => aide sur les Promesses 
*/


//récuperer le module de connexion
let modelConnexion = require('./modelConnexion.js')
let mysqlConnexion = modelConnexion.mysqlConnexion

//export des methodes contenant les requettes SQL
module.exports = {

    /**
     * Médhodes d'instantiations des promesses de résultat de  @requetteSQL 
     * si @err est true la promesse est @return rejeté @reject avec le message d'erreur @err
     * sinon @return @resolve avec les donnés @data de la @requetteSQL
     * !  on ne peut résolve q'une @data par promesse  !
    */

    async modelAfficherPatients() {


        return new Promise((resolve, reject) => {

            //'SELECT Patients.*, DATE_FORMAT(patient_datenaiss, "%Y") as patient_anneenaiss, Mutuelles.mutuelle_nom FROM Patients, Mutuelles WHERE patient_mutuelle_id = mutuelle_id ORDER BY patient_nom'

            //la clé etrangère etant le num de Sécu (Bonne ou mauvaise pratique ???) en pricipe unique et checkSumable on ordonnance les patients par nom
            //BONNE PRATIQUES : ajouter une colonne patient_date_création et patient_date_derniere_modif pour mieux afficher / filter dans les vues 
            let requeteSQL = 'SELECT Patients.*, DATE_FORMAT(patient_datenaiss, "%Y") as patient_anneenaiss FROM Patients ORDER BY patient_nom'
            mysqlConnexion.query(requeteSQL, (err, data) => {

                if (err) {
                    return reject(err)

                }
                return resolve(data)
            })
        }
        )
    },



    

    async modelAjouterPatient(req) {


        return new Promise((resolve, reject) => {

            let numsecu = req.body.numsecu
            let mutuelle = req.body.mutuelle
            let nom = req.body.nom
            let prenom = req.body.prenom
            let datenaiss = req.body.datenaiss

            //console.log(mutuelle)
            if(mutuelle == 'null' ){

                let requeteSQL = "INSERT INTO Patients (patient_numsecu, patient_nom, patient_prenom, patient_datenaiss) VALUES (?, ?, ?, ?)"


                mysqlConnexion.query(requeteSQL, [numsecu, nom, prenom, datenaiss], (err, data) => {
    
                    if (err) {
                        return reject(err)
    
                    }
                    return resolve(data)
                })

            }else {

                let requeteSQL = "INSERT INTO Patients (patient_numsecu, patient_mutuelle_id, patient_nom, patient_prenom, patient_datenaiss) VALUES (?, ?, ?, ?, ?)"


                mysqlConnexion.query(requeteSQL, [numsecu, mutuelle, nom, prenom, datenaiss], (err, data) => {
    
                    if (err) {
                        return reject(err)
    
                    }
                    return resolve(data)
                })




            }



        }
        )
    },

    async modelSupprimerPatient(req) {

        return new Promise((resolve, reject) => {

            let numsecu = req.params.numsecu

            let requeteSQL = "DELETE FROM Patients WHERE patient_numsecu = ?;"


            mysqlConnexion.query(requeteSQL, [numsecu], (err, data) => {

                if (err) {
                    return reject(err)

                }
                return resolve(data)
            })
        }
        )
    },
    
    async modelAfficherModifPatient(req) {


        return new Promise((resolve, reject) => {

            let numsecu = req.params.numsecu

            let requeteSQL = 'SELECT *, DATE_FORMAT(patient_datenaiss, "%Y") as patient_anneenaiss,DATE_FORMAT(patient_datenaiss, "%m") as patient_moisnaiss,DATE_FORMAT(patient_datenaiss, "%d") as patient_journaiss FROM Patients WHERE patient_numsecu = ?'
            mysqlConnexion.query(requeteSQL, [numsecu], (err, data) => {

                if (err) {
                    return reject(err)

                }
                return resolve(data)
            })
        }
        )
    },

    async modelAfficherMutuelles() {


        return new Promise((resolve, reject) => {
            
            let requeteSQL = 'SELECT Mutuelles,* FROM Mutuelles ORDER BY mutuelle_id'
            mysqlConnexion.query(requeteSQL, (err, data) => {

                if (err) {
                    return reject(err)

                }
                return resolve(data)
            })
        }
        )
    },



    async modelModifPatient(req) {


        return new Promise((resolve, reject) => {

            let numsecu = req.body.numsecu
            let mutuelle = req.body.mutuelle
            let nom = req.body.nom
            let prenom = req.body.prenom
            let datenaiss = req.body.datenaiss

            if (mutuelle == 'null') {

                let requeteSQL = 'UPDATE Patients SET patient_mutuelle_id = NULL, patient_nom = ?,patient_prenom = ?, patient_datenaiss = ?  WHERE patient_numsecu = ?'
                mysqlConnexion.query(requeteSQL, [ nom, prenom, datenaiss, numsecu], (err, data) => {

                    if (err) {
                        return reject(err)

                    }
                    return resolve(data)
                })

            }else{

                let requeteSQL = 'UPDATE Patients SET patient_mutuelle_id = ?, patient_nom = ?,patient_prenom = ?, patient_datenaiss = ?  WHERE patient_numsecu = ?'
                mysqlConnexion.query(requeteSQL, [mutuelle, nom, prenom, datenaiss, numsecu], (err, data) => {

                    if (err) {
                        return reject(err)

                    }
                    return resolve(data)
                })

            }
        }
        )
    },



}