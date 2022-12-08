const modelConnexion = require('../models/modelConnexion.js')
const uuidv4 = require('uuid').v4;
const sessions = require('express-session');





module.exports = {


    async afficherConnexion(req, res) {
        const sessionId = req.headers.cookie?.split('session=')[1]
        delete sessions[sessionId]
        //nettoyer session avant d'en créer un nouveau
        res.set('Set-Cookie' , `session=null`)

        res.render('connexion')
    


    },

    async testConnexion(req, res) {


        let email = req.body.email
        let mdp = req.body.mdp

        try {
            let data = await modelConnexion.modelTestConnexion(req, res)
            //console.log(typeof data[0])

            if (typeof data[0] === "object") {
                //console.log(data)
                if (data[0].parmacien_email == email && data[0].parmacien_mdp == mdp) {
                    //console.log(data[0].parmacien_email, data[0].parmacien_mdp)
                    const sessionId = uuidv4();
                    sessions[sessionId] = { email };
                    res.set('Set-Cookie', `session=${sessionId}`)

                    console.log(sessions)
                    
                    //faire .render affiche /conenxion dans l'url et ne declenche pas l'appel des données par la route /accueil => .ctrlAccueil.afficherAcceuil
                    res.redirect('accueil')
                }
              //sinon type undefined  
            }else{res.redirect('connexion')}


        } catch (error) {
            console.log(error)
        }



    },





}