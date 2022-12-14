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

    async modelAfficherPosologies(req) {

        return new Promise((resolve, reject) => {

            
            let numsecu = req.params.numsecu
            let idordo = req.params.idordo

            //Requette pour avoir le nombre de boites total prescrites d'une posologie  du début juqu'a sa fin et de la date actuelle jusquà la fin
            let requeteSQL = `
            SELECT *,
            SUM(TIMESTAMPDIFF(MONTH, posologie_debut, posologie_fin)* Posologies.posologie_nbboitesmois )as posologie_nb_boites_debut_fin,
            SUM(TIMESTAMPDIFF(MONTH, CURRENT_DATE, posologie_fin)* Posologies.posologie_nbboitesmois )as posologie_nb_boites_maintenant_fin  
            FROM Posologies, Medicaments , Patients, Ordonnances
            WHERE posologie_ordonnance_id = ? 
            AND patient_numsecu = ?
            AND Medicaments.medicament_id = Posologies.posologie_medicament_id 
            AND posologie_ordonnance_id = ordonnance_id 
            AND patient_numsecu = ordonnance_patient_numsecu
            GROUP BY Posologies.posologie_id  
            ORDER BY Posologies.posologie_id ASC;`
            mysqlConnexion.query(requeteSQL, [idordo, numsecu], (err, data) => {

                if (err) {
                    return reject(err)

                }
                return resolve(data)
            })
        }
        )
    },

    /**
     * Pour afficher les infos de l'ordonnance qand aucune posologie n'a été crée on fait cette requette,
     * car aucun medecin n'a crée de posologie donc problème de jointure on ne peut
     * donc pas joindre posologie_id pas encore crée aux infos du médecin qui a prescit l'ordonnance, et donc la posologie
    */
    async modelAfficherInfoMedecinEtPath(req) {


        return new Promise((resolve, reject) => {

            let idordo = req.params.idordo

            let requeteSQL = `SELECT * FROM Pathologies, Medecins, Ordonnances WHERE ordonnance_id = ? AND ordonnance_medecin_id = medecin_id AND ordonnance_pathologie_id = pathologie_id `
            mysqlConnexion.query(requeteSQL, [idordo], (err, data) => {

                if (err) {
                    return reject(err)

                }
                return resolve(data)
            })
        }
        )
    },


    async modelAjouterPosologie(req) {

        return new Promise((resolve, reject) => {

            let idordo = req.body.idordo
            let medicament = req.body.medicament
            let boites = req.body.boites
            let duree = req.body.duree


            let requeteSQL = "INSERT INTO Posologies (posologie_ordonnance_id, posologie_medicament_id, posologie_debut, posologie_fin ,posologie_nbboitesmois) VALUES (?, ?, CURRENT_DATE(), DATE_ADD(CURRENT_DATE(), INTERVAL ? MONTH ), ?)"


            mysqlConnexion.query(requeteSQL, [idordo, medicament, duree, boites], (err, data) => {

                if (err) {
                    return reject(err)

                }
                return resolve(data)
            })

        }
        )
    },


    async modelSupprimerPosologie(req) {


        return new Promise((resolve, reject) => {

            let idpos = req.params.idpos

            let requeteSQL = "DELETE FROM Posologies WHERE posologie_id = ?;"


            mysqlConnexion.query(requeteSQL, [idpos], (err, data) => {

                if (err) {
                    return reject(err)

                }
                return resolve(data)
            })
        }
        )
    },

    async modelAfficherModifPosologie(req) {


        return new Promise((resolve, reject) => {

            let idpos = req.params.idpos
            //pour pré remplir le champ de durée en mois on calule la différence en mois entre la date actuelle et la fin de la posologie
            //on essaie de ne pas requetter les collones inutiles dans les tables mentionnées dans la jointure #GreenIT :3
            let requeteSQL = `
            SELECT Posologies.*, Medicaments.medicament_nom, Patients.patient_numsecu,
            TIMESTAMPDIFF(MONTH, CURRENT_DATE, posologie_fin) as posologie_mois_restants
            FROM Posologies, Medicaments, Patients, Ordonnances
            WHERE Posologies.posologie_id = ? 
            AND Posologies.posologie_medicament_id = Medicaments.medicament_id
            AND Posologies.posologie_ordonnance_id = Ordonnances.ordonnance_id
            AND Ordonnances.ordonnance_patient_numsecu = Patients.patient_numsecu;`

            mysqlConnexion.query(requeteSQL, [idpos], (err, data) => {

                if (err) {
                    return reject(err)

                }
                return resolve(data)
            })
        }
        )
    },

    async modelModifPosologie(req) {

        return new Promise((resolve, reject) => {

            let idpos = req.body.idpos

            let medicament = req.body.medicament
            let duree = req.body.duree
            let boites = req.body.boites
            
            //on update toujours en choisisant des mois entiers
            let requeteSQL = 'UPDATE Posologies SET posologie_medicament_id = ?,posologie_debut=CURRENT_DATE() , posologie_fin = DATE_ADD(CURRENT_DATE(), INTERVAL ? MONTH ), posologie_nbboitesmois = ? WHERE posologie_id = ?'
            mysqlConnexion.query(requeteSQL, [medicament, duree, boites, idpos], (err, data) => {

                if (err) {
                    return reject(err)

                }
                return resolve(data)
            })
        }
        )
    },


}