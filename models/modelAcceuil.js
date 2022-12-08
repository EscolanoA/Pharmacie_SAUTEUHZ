//récuperer le module de connexion
let modelConnexion = require('./modelConnexion.js')
let mysqlConnexion = modelConnexion.mysqlConnexion

//export des methodes contenant les requettes SQL
module.exports = {

    async modelAfficherStockMedicaments() {

        /** 
         * instantiation d'une promesse de résultat de  @requetteSQL 
         * si @err est true ou non null la promesse est @return rejeté @reject avec le message d'erreur @err
         * sinon @return @resolve avec les donnés @data de la @requetteSQL
        */

        return new Promise((resolve, reject) => {

            let requeteSQL = 'SELECT * FROM Medicaments ORDER BY Medicament_id'
            mysqlConnexion.query(requeteSQL, (err, data) => {

                if (err) {
                    return reject(err)

                }
                return resolve(data)
            })
        }
        )

    },






}















/**
 
 * Requette pour avoir le nombre de boites total d'une posologie sur la période de prise du medicament

SELECT TIMESTAMPDIFF(MONTH, posologie_debut, posologie_fin)* Posologies.posologie_nbboitesmois as nbTotalBoitesUnePos FROM Posologies;
 
 * 
 * 
 * 
 * Requette pour le nbtotal de medicaments sur toutes les ordonnances et le stock


SELECT Medicaments.*, SUM(TIMESTAMPDIFF(MONTH, posologie_debut, posologie_fin)* Posologies.posologie_nbboitesmois )as nbTotalBoitesNecessaires
FROM Posologies, Medicaments
WHERE Medicaments.medicament_id = Posologies.posologie_medicament_id
GROUP BY Medicaments.medicament_nom;






somme des besoins en medoc pour chaque medoc pour le 1 er mois à venir 

Interval 2 MONTH sera pour le 2 eme mois a venir, ect, ect...

SELECT *, SUM(Posologies.posologie_nbboitesmois)
FROM Medicaments 
JOIN Posologies ON Medicaments.medicament_id = Posologies.posologie_medicament_id
WHERE Posologies.posologie_fin >= DATE_ADD(curdate(), INTERVAL 15 MONTH)
GROUP BY Medicaments.medicament_id;




SELECT *, Medicaments.*, SUM(TIMESTAMPDIFF(MONTH, posologie_debut, posologie_fin)* Posologies.posologie_nbboitesmois )as nbTotalBoitesUnePos FROM Posologies, Medicaments WHERE Medicaments.medicament_id = Posologies.posologie_medicament_id GROUP BY Posologies.posologie_id ORDER BY `Medicaments`.`medicament_id` ASC

*/