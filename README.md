![This is an image](/assets/img/Logoheadertransparent.svg)

## Projet PHARMACIE SAUTHEUHZ
Mon premier projet nodeJS en MVC. 
L'objectif est de créer une application web permettant à une pharmacie et ses employés de gerer ses clients, ordonnances et stocks de manières aussi simple .

## Quelles technologies ? 
**FrontEnd**    
-Javascript => Controles de saisie
-css, html => Affichages 
-chart.js v4.0.1 => afficher des graphiques dynamiques
-ejs v3.1.8 => JavaScript intégrée dans les pages html


**BackEnd**   
Du côté serveur nous utilisons deux frameworks principaux pour ce projet :  
-Node.js v16.17.0 => Environnement d'exécution JavaScript asynchrone et orienté événement, Node.js est conçu pour générer des applications scalables.
-express v4.18.2 => routing / higher perfs / test coverages / HTTP helpers
-cookie-parser v1.4.6 => parse et remplie le header d'objet mis en relation avec leur clé
-dotenv v16.0.3 => parse les fichier .env avec les différents TOKENS
-express-session v1.17.3 => stocke coté serveur les clients
-iniparser v1.0.5 => parse les fichier .ini avec les différentes variables d'environemment 
-package.json v2.0.1 => manifeste du projet, contient les prérequis pour exécuter l'application
-uuid  v9.0.0 => pour créeer des id de sessions sous ce format : 6e3z5rzez6z-87ef-75gr-e6e5qe86dzty

**Base de données**  
La base de données est hébergé sur AlwaysData sous PhpMyAdmin.  
-mysql2 v2.3.3 => surcouche mysql, gérant les promesses, procédures stockées...


**Dépendances** 




## Installer le projet sur votre ordinateur ? 

Après avoir installer git ainsi que node sur votre pc, clonez le projet grâce a la commande : 
```
git clone https://github.com/EscolanoA/Pharmacie_SAUTEUHZ.git

- Récuperez la base de données et importez là dans votre gestionnaire de BDD.  
- Il s'agit du fichier : assets/bdd/CreateTablesEtJdd.sql
- Ensuite insérer vos identifiants dans le fichier de connexion à la base de données.
- Il s'agit du fichier : /DB.ini

Il vous suffit alors d'installer les middlewares  : 
```
npm i iniparser mysql2  express express-session ejs express-session dotenv 
```
Pour finir, pour accèder au site web, lancer le serveur : 
``` 
node index.js
```
Et rendez vous sur l'url suivante
``` 
localhost:3000/sautheuhz
```
## Auteur
- [Brieuc-Meyer](https://github.com/Brieuc-Meyer)
