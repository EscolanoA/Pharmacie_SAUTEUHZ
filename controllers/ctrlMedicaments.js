let modelMedicament = require('../models/modelMedicament.js')


module.exports = {

    async afficherMedicaments(req, res) {

        try {
            let data = await modelMedicament.modelAfficherMedicaments()
            if (data) {
                //console.log(data)
                res.render("./medicaments", { medicaments: data })
            }
        } catch (error) {
            console.log(error)
        }


    },

    async ajouterMedicament(req, res) {

        try {
            let data = await modelMedicament.modelAjouterMedicament(req)
            if (data) {
                res.redirect("/medicaments")
            }
        } catch (error) {
            console.log(error)
        }


    }

    // async ajouterMedicament(req, res) {

    //         let nom = req.body.nom
    //         let stock = req.body.stock

    //         let requeteSQL = "INSERT INTO Medicaments (medicament_nom, medicament_boitesstock) VALUES " + ' ("' + nom + '",' + stock + ')'

    //         mysqlConnexion.query(requeteSQL, (err) => {
    //             if (!err) {
    //                 res.redirect("/medicaments");

    //             } else {
    //                 console.log(err)
    //                 res.redirect("/medicaments");
    //             }
    //         })
    //     }


    // const supprimerMedicament = (req, res) => {

    //         let id = req.params.id
    //         mysqlConnexion.query('DELETE FROM Medicaments WHERE medicament_id = ?;', [id], (err) => {
    //             if (!err) {
    //                 res.redirect("/medicaments");

    //             } else {
    //                 //document.getElementById("attention").innerHTML = "attention"
    //                 console.log(err)
    //                 res.redirect("/medicaments");
    //             }
    //         })
    //     }
}

