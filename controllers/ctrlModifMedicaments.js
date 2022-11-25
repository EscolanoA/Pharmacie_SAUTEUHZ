let modelConnexion = require('../models/modelConnexion.js')
let mysqlConnexion = modelConnexion.mysqlConnexion


const afficherModifMedicament = (req, res) => {

    let id = req.params.id
    mysqlConnexion.query('SELECT * FROM Medicaments WHERE medicament_id = ?;', [id], (err, ligne) => {
        if (!err) {
            res.render("./modifMedicament", { medicament: ligne })

        } else {
            console.log(err)
        }
    })
}
const modifMedicament = (req, res) => {

    let id = req.body.id
    let nom = req.body.nom
    let stock = req.body.stock

    mysqlConnexion.query(`UPDATE Medicaments SET medicament_nom = '${nom}', medicament_boitesstock = '${stock}'  WHERE medicament_id = ${id};`, (err, ligne) => {
        if (!err) {
            res.redirect("/medicaments");

        } else {
            console.log(err)
        }
    })

}



module.exports = {
    afficherModifMedicament,
    modifMedicament
}