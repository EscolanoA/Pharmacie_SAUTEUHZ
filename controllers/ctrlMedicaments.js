let modelConnexion = require('../models/modelConnexion.js')
const afficherMedicaments = (req, res) => {

    modelConnexion.query('SELECT * FROM Medicaments', (err, lignes) => {
        if (!err) {
            console.log(lignes)
            res.render("./medicaments", { medicaments: lignes })

        }
    })
    res.render('./medicaments')
}

module.exports = {
    afficherMedicaments
}