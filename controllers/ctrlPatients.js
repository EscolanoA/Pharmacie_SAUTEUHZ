let modelConnexion = require('../models/modelConnexion.js')
let mysqlConnexion = modelConnexion.mysqlConnexion

const afficherPatients = (req, res) => {

    mysqlConnexion.query('SELECT Patients.*, DATE_FORMAT(patient_datenaiss, "%Y") as patient_anneenaiss, Mutuelles.mutuelle_nom FROM Patients, Mutuelles WHERE patient_mutuelle_id = mutuelle_id', (err, lignes) => {
        if (!err) {
            res.render("./patients", { patients: lignes })

        } else {
            console.log(err)
        }
    })
}

module.exports = {
    afficherPatients
}