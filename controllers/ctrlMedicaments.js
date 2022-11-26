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


    },

    async supprimerMedicament(req, res) {

        try {
            let data = await modelMedicament.modelSupprimerMedicament(req)
            if (data) {
                res.redirect("/medicaments")
            }
        } catch (error) {
            console.log(error)
        }


    }

}

