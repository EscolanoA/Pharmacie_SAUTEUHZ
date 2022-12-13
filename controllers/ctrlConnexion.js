/**
 * @Auteur Brieuc Meyer
 * @Version 1.0.0
 * @Crédits : Web Dev Simplified => construire et utiliser la métode testAuthentification() dans les routes https://www.youtube.com/watch?v=-RCnNyD0L-s&t=905s&pp=ugMICgJmchABGAE%3D
 *          : Web Dev Junkie => créer un cookie de session uuid-4 et le parser lorsqu'il transite par la longue chaine de charactères du header https://www.youtube.com/watch?v=BgsQrOHNKeY&t=790s&ab_channel=WebDevJunkie
*/

const modelConnexion = require('../models/modelConnexion.js')
//middleware pour créer des uuids de sessions sous ce format : 'da8d572d-411e-4f62-b267-d6b122582637'
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
                    //stocker email pour perspectives d'évolution (rôles, vues...)
                    sessions[sessionId] = { email };
                    res.set('Set-Cookie', `session=${sessionId}`)

                    //console.log(sessions)
                    
                    //faire .render affiche /conenxion dans l'url et ne declenche pas l'appel des données par la route /accueil => .ctrlAccueil.afficherAcceuil
                    res.redirect('accueil')
                }
              //sinon type undefined  
            }else{res.redirect('connexion')}


        } catch (error) {
            console.log(error)
        }

    },

    //middleware qui test la présence d'un cookie de session
    async testAuthentification(req, res, next) {

        //console.log(sessions)
        //console.log(req.headers.cookie?.split('session=')[1])
        
        const sessionId = req.headers.cookie?.split('session=')[1]
        
        const userSession = sessions[sessionId]
        //si impossible de trouvrer la valeur après la clé "session="
        if (!userSession) {
            res.render('connexion')

        } else { 
            
            try {
                //prochaine instruction sera le controlleur placé apres l'appel de cette fonction
                next()
            } catch (error) {
                console.log(error)
            }
    
        }
    },


}