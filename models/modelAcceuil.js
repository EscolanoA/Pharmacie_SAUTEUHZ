/**
 * @Auteur Brieuc Meyer
 * @Version 1.0.0
 * @Crédits : Lorenzo Porcu => aide sur les Promesses 
*/

//récuperer et apeller le module de connexion
const modelConnexion = require('./modelConnexion.js')
const mysqlConnexion = modelConnexion.mysqlConnexion


module.exports = {

    /**
     * Médhodes d'instantiations des promesses de résultat de  @requetteSQL 
     * si @err est true la promesse est @return rejeté @reject avec le message d'erreur @err
     * sinon @return @resolve avec les donnés @data de la @requetteSQL
     * !  on ne peut résolve q'une @data par promesse  !
    */


    async modelAfficherStockMedicaments() {

        return new Promise((resolve, reject) => {
            //la requette est spécifique à l'accueil avec le ORDER BY
            let requeteSQL = 'SELECT * FROM Medicaments ORDER BY medicament_boitesstock DESC'
            mysqlConnexion.query(requeteSQL, (err, data) => {

                if (err) {
                    return reject(err)

                }
                return resolve(data)
            })
        }
        )

    },

    //Le param interval précise dans la requette de quel mois faire la somme des besoins
    async modelAfficherBesoinsMedicaments(interval) {

        return new Promise((resolve, reject) => {

            let requeteSQL = `
            SELECT *, SUM(Posologies.posologie_nbboitesmois) as besoins_mois_courant
            FROM Medicaments 
            JOIN Posologies ON Medicaments.medicament_id = Posologies.posologie_medicament_id
            WHERE Posologies.posologie_fin >= DATE_ADD(curdate(), INTERVAL ? MONTH)
            GROUP BY Medicaments.medicament_id
            ORDER BY besoins_mois_courant DESC;`
            
            mysqlConnexion.query(requeteSQL, [interval], (err, data) => {

                if (err) {
                    return reject(err)

                }
                return resolve(data)
            })
        }
        )

    },


}
