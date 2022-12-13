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

    async modelAfficherOrdonnances(req) {

        return new Promise((resolve, reject) => {

            let numsecu = req.params.numsecu

            //formatter les donnés dans la requette pour permettre 1 : de faire des calculs sur l'age avec la médode .getFullYear() 
            //2 : d'afficher ce format ci dd-mm-YYY , meme fomat utilisé pour mettre des valeurs par défault dans les champs de type date  
            let requeteSQL = `
            SELECT *,
            DATE_FORMAT(patient_datenaiss, "%Y") as patient_anneenaiss,
            DATE_FORMAT(patient_datenaiss, "%m") as patient_moisnaiss,
            DATE_FORMAT(patient_datenaiss, "%d") as patient_journaiss
            FROM Patients, Ordonnances, Medecins, Pathologies
            WHERE patient_numsecu = ? 
            AND ordonnance_patient_numsecu = patient_numsecu
            AND ordonnance_medecin_id = medecin_id
            AND ordonnance_pathologie_id = pathologie_id `

            mysqlConnexion.query(requeteSQL, [numsecu], (err, data) => {

                if (err) {
                    return reject(err)

                }
                return resolve(data)
            })
        }
        )
    },



    async modelAjouterOrdonnance(req) {

        return new Promise((resolve, reject) => {

            let numsecu = req.body.numsecu
            let medecin = req.body.medecin
            let pathologie = req.body.pathologie

            //console.log(mutuelle)

            let requeteSQL = "INSERT INTO Ordonnances (ordonnance_patient_numsecu, ordonnance_medecin_id, ordonnance_pathologie_id) VALUES (?, ?, ?)"


            mysqlConnexion.query(requeteSQL, [numsecu, medecin, pathologie], (err, data) => {

                if (err) {
                    return reject(err)

                }
                return resolve(data)
            })

        }
        )
    },


    async modelSupprimerOrdonnance(req) {


        return new Promise((resolve, reject) => {

            let idordo = req.params.idordo

            let requeteSQL = "DELETE FROM Ordonnances WHERE ordonnance_id = ?;"


            mysqlConnexion.query(requeteSQL, [idordo], (err, data) => {

                if (err) {
                    return reject(err)

                }
                return resolve(data)
            })
        }
        )
    },

    async modelafficherModifOrdonnance(req) {

        return new Promise((resolve, reject) => {

            let idordo = req.params.idordo

            let requeteSQL = 'SELECT * FROM Ordonnances WHERE ordonnance_id = ?'
            mysqlConnexion.query(requeteSQL, [idordo], (err, data) => {

                if (err) {
                    return reject(err)

                }
                return resolve(data)
            })
        }
        )
    },

    async modelmodifOrdonnance(req) {


        return new Promise((resolve, reject) => {

            let medecin = req.body.medecin
            let pathologie = req.body.pathologie
            let idordo = req.body.idordo

            let requeteSQL = 'UPDATE Ordonnances SET ordonnance_medecin_id = ?, ordonnance_pathologie_id = ?  WHERE ordonnance_id = ?'
            mysqlConnexion.query(requeteSQL, [medecin, pathologie, idordo], (err, data) => {

                if (err) {
                    return reject(err)

                }
                return resolve(data)
            })
        }
        )
    },


}