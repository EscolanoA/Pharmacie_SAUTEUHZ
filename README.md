![This is an image](/assets/img/Logoheadertransparent.svg)

## Projet SAUTHEUHZ
Mon premier projet nodeJS en MVC. 
L'objectif du projet sautheuhz est de créer une application web permettant à une pharmacie et ses employés de gerer ses clients, ordonnances et stocks de manières aussi simple qu'intuitive.

## Quelles technologies ? 
**FrontEnd**    
-Javascript => Controles de saisie
-css => Affichages 
-Utilisation de Chart.Js le graphique sur la page d'acceuil (prévoyant les stocks sur les 6 prochains mois).  

**BackEnd**   
Du côté serveur nous utilisons deux frameworks principaux pour ce projet :  
-NodeJS  
-ExpressJs  

**Base de données**  
La base de données est hébergé sur AlwaysData sous PhpMyAdmin.  


**Dépendances** 

-chart.js v4.0.1 => afficher des graphiques dynamiques
-cookie-parser v1.4.6 => 
-dotenv v16.0.3 => parse les fichier .env avec les différents TOKENS
-ejs v3.1.8 => Embedded JavaScript dans la page format html
-express v4.18.2 => routing / higher perfs / test coverages / HTTP helpers
-express-session v1.17.3 => stocke coté serveur les clients
-iniparser v1.0.5 => 
-mysql2 v2.3.3 => 
-package.json v2.0.1 => 
-uuid  v9.0.0 => 


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
