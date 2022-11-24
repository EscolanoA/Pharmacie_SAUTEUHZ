let modelConnexion = require('../models/modelConnexion.js')
let mysqlConnexion = modelConnexion.mysqlConnexion


const afficherMedicaments = (req, res) => {

    mysqlConnexion.query('SELECT * FROM Medicaments', (err, lignes) => {
        if (!err) {
            res.render("./medicaments", { medicaments: lignes })

        } else {
            console.log(err)
        }
    })
}

const ajouterMedicament = (req, res) => {

    let nom = req.body.nom
    let stock = req.body.stock

    let requeteSQL = "INSERT INTO Medicaments (medicament_nom, medicament_boitesstock) VALUES " + ' ("' + nom + '",' + stock + ')'

    mysqlConnexion.query(requeteSQL, (err) => {
        if (!err) {
            res.redirect("/medicaments");

        } else {
            console.log(err)
            res.redirect("/medicaments");
        }
    })
}


const supprimerMedicament = (req, res) => {

    let id = req.params.id
    mysqlConnexion.query('DELETE FROM Medicaments WHERE medicament_id = ?;', [id], (err) => {
        if (!err) {
            res.redirect("/medicaments");

        } else {
            //document.getElementById("attention").innerHTML = "attention"
            console.log(err)
            res.redirect("/medicaments");
        }
    })
}



module.exports = {
    afficherMedicaments,
    ajouterMedicament,
    supprimerMedicament,
}