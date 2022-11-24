let modelConnexion = require('../models/modelConnexion.js')
let mysqlConnexion = modelConnexion.mysqlConnexion

const afficherMedicaments = (req, res) => {

    mysqlConnexion.query('SELECT * FROM Medicaments', (err, lignes) => {
        if (!err) {
            console.log("toto" + lignes)
          //  res.render("./medicaments", { medicaments: lignes })

        }
    })
    res.render('./medicaments')
}

module.exports = {
    afficherMedicaments
}