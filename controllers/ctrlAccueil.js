const sessions = require('express-session');
const modelAcceuil = require('../models/modelAcceuil.js')



module.exports = {

    async afficherAcceuil(req, res) {

        //console.log(sessions)
        console.log(req.headers.cookie?.split('session=')[1])
        
        const sessionId = req.headers.cookie?.split('session=')[1]
        
        const userSession = sessions[sessionId]
        //si impossible de trouvrer la variable "session="
        if (!userSession) {
            res.render('connexion')

        } else { 
            
            
            
            try {
                let data = await modelAcceuil.modelAfficherStockMedicaments()
                if (data) {
                    console.log(data)
                    res.render("accueil", { medicaments: data })
                }
            } catch (error) {
                console.log(error)
            }
    
        }
    },




}