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

    async modelAfficherMedicaments() {


        return new Promise((resolve, reject) => {

            let requeteSQL = `SELECT * FROM  Medicaments ORDER BY medicament_id;`

            mysqlConnexion.query(requeteSQL, (err, data) => {

                if (err) {
                    return reject(err)

                }
                return resolve(data)
            })
        }
        )
    },


    

    async modelbesoinsTotauxMedicaments() {


        return new Promise((resolve, reject) => {

            /**
             * fait la somme des besoins totaux d'un medicament entre la date actuelle et la date de fin de sa posologie
             * cette requette ne peut pas etre combinée avec celle ligne 27 car les médicaments non prescrits 
             * sont exclus des résultats de cette requette tel qu'elle est écrite
            */
             
            //orderby pour harmoniser les charts, n'as pas d'effect sur l'affecttion à chaque médicaments dans la vue grâce à boucle + condition sur l'occurence medicament id
            let requeteSQL = `SELECT Medicaments.*, 
            SUM(TIMESTAMPDIFF(MONTH, CURRENT_DATE, posologie_fin)* Posologies.posologie_nbboitesmois) as medicament_besoins_totaux 
            FROM Posologies, Medicaments 
            WHERE Medicaments.medicament_id = Posologies.posologie_medicament_id 
            GROUP BY Medicaments.medicament_nom 
            ORDER BY medicament_besoins_totaux DESC;`


            mysqlConnexion.query(requeteSQL, (err, data) => {

                if (err) {
                    return reject(err)

                }
                return resolve(data)
            })
        }
        )
    },





    async modelAjouterMedicament(req) {


        return new Promise((resolve, reject) => {

            let nom = req.body.nom
            let stock = req.body.stock

            let requeteSQL = "INSERT INTO Medicaments (medicament_nom, medicament_boitesstock) VALUES (?, ?)" 


            mysqlConnexion.query(requeteSQL, [nom, stock], (err, data) => {

                if (err) {
                    return reject(err)

                }
                return resolve(data)
            })
        }
        )
    },

    async modelSupprimerMedicament(req) {


        return new Promise((resolve, reject) => {

            let id = req.params.id

            let requeteSQL = "DELETE FROM Medicaments WHERE medicament_id = ?;"


            mysqlConnexion.query(requeteSQL, [id], (err, data) => {

                if (err) {
                    return reject(err)

                }
                return resolve(data)
            })
        }
        )
    },


    async modelafficherModifMedicament(req) {

        return new Promise((resolve, reject) => {

            let id = req.params.id

            let requeteSQL = 'SELECT * FROM Medicaments WHERE medicament_id = ?'
            mysqlConnexion.query(requeteSQL, [id], (err, data) => {

                if (err) {
                    return reject(err)

                }
                return resolve(data)
            })
        }
        )
    },




    async modelmodifMedicament(req) {



        return new Promise((resolve, reject) => {

            let id = req.body.id
            let nom = req.body.nom
            let stock = req.body.stock

            let requeteSQL = 'UPDATE Medicaments SET medicament_nom = ?, medicament_boitesstock = ?  WHERE medicament_id = ?'
            mysqlConnexion.query(requeteSQL, [nom, stock, id], (err, data) => {

                if (err) {
                    return reject(err)

                }
                return resolve(data)
            })
        }
        )
    },



}

