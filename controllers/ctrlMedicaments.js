let modelConnexion = require('../models/modelConnexion.js')
let mysqlConnexion = modelConnexion.mysqlConnexion

const afficherMedicaments = (req, res) => {

    mysqlConnexion.query('SELECT * FROM Medicaments', (err, lignes) => {
        if (!err) {
            console.log(lignes)
            res.render("./medicaments", { medicaments: lignes })

        } else {
            console.log(err)
        }
    })
}

const ajouterMedicament = (req, res) => {

    let msgID = req.body.id
    let msgName = req.body.name
    let msgMsg = req.body.msg
    let msgNote = req.body.note
    
    mysqlConnexion.query('DELETE FROM Medicaments WHERE medicament_id = ?;', [id], (err) => {
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