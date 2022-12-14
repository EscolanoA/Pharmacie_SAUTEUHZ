<img src="/assets/img/Logoheadertransparent.svg" alt="Logo Pharmacie Sautheuhz" width="100px"/>

## Projet PHARMACIE SAUTHEUHZ
Mon premier projet nodeJS en MVC. 
L'objectif est de créer une application web sécurisée et scalable permettant à une pharmacie et ses employés de gerer ses clients, ordonnances et stocks .

## Thechnologies 
**FrontEnd**    
- [javascript](https://developer.mozilla.org/fr/docs/Web/JavaScript) => Controles de saisie
- [css](https://developer.mozilla.org/fr/docs/Web/CSS), [html](https://developer.mozilla.org/fr/docs/Web/HTML) => mise en forme des vues 
- [chart.js](https://www.chartjs.org/) v4.0.1 => afficher des graphiques dynamiques
- [ejs](https://ejs.co/#:~:text=GET%20STARTED-,What%20is%20EJS%3F,-What%20is%20the) v3.1.8 => JavaScript intégrée dans les pages html

**BackEnd**   
- [node.js](https://nodejs.org/fr/about/#a-propos-de-node-js) v16.17.0 => Environnement d'exécution JavaScript asynchrone et orienté événement, Node.js est conçu pour générer des applications scalables.
- [express](https://expressjs.com/fr/guide/routing.html) v4.18.2 => routing / higher perfs / test coverages / HTTP helpers
- [cookie-parser](https://expressjs.com/en/resources/middleware/cookie-parser.html) v1.4.6 => parse et remplie le header d'objet mis en relation avec leur clé
- [dotenv](https://www.npmjs.com/package/dotenv#:~:text=logic%20in%20JavaScript.-,dotenv,-Dotenv%20is%20a) v16.0.3 => parse les fichier .env avec les différents TOKENS
- [express-session](https://www.npmjs.com/package/express-session) v1.17.3 => stocke coté serveur les clients
- [iniparser](https://www.npmjs.com/package/iniparser) v1.0.5 => parse les fichier .ini avec les différentes variables d'environemment 
- [package.json](https://docs.npmjs.com/cli/v9/configuring-npm/package-json) v2.0.1 => manifeste du projet, contient les prérequis pour exécuter l'application
- [uuid](https://www.npmjs.com/package/uuid)  v9.0.0 => pour créeer des id de sessions sous ce format : 6e3z5rzez6z-87ef-75gr-e6e5qe86dzty

**Base de donnée**  
- [mysql2](https://www.npmjs.com/package/mysql2) v2.3.3 => surcouche mysql, gérant les promesses, procédures stockées...


## Installer le projet sur votre ordinateur

Après avoir installé git ainsi que node sur votre pc, clonez le projet grâce a la commande : 
```
git clone https://github.com/EscolanoA/Pharmacie_SAUTEUHZ.git
```

- Récuperez la base de données et importez là dans votre gestionnaire de BDD.  
- Il s'agit du fichier : assets/bdd/CreateTablesEtJdd.sql
- Ensuite insérer vos identifiants dans le fichier de connexion à la base de données.
- Il s'agit du fichier : /DB.ini

Il vous suffit alors d'installer les dépendances avec cette commande : 
```
npm i iniparser mysql2  express express-session ejs express-session dotenv 
```
Pour finir, pour accèder au site web, lancer le serveur https : 
``` 
npm run node
```
Et rendez vous sur l'url suivante
``` 
https://localhost:3000/
```
- entrez les identifiants suivants vous donnera accès à l'application
- Adress Mail : pharmacien@mail.com 
- Mot de passe : root

## Auteur
- [Brieuc-Meyer](https://github.com/Brieuc-Meyer)
