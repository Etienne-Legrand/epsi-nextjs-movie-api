# Next.js Movie API

Ce projet est une API développée avec Next.js qui permet de gérer une liste de films ainsi que les commentaires associés aux films.

https://github.com/user-attachments/assets/b641445d-564e-4e17-a86c-15c214450ec5

## Prérequis
1. Node.js 18+
2. Base de données MongoDB avec la base d'exemple sample_mflix.

## Installation

1. Clonez ce dépôt sur votre machine locale.
2. Assurez-vous d'avoir Node.js installé.
3. Déplacez-vous dans le répertoire du projet
4. Exécutez la commande `npm install` pour installer les dépendances.
5. Complétez vos identifiants de connexion à votre base de donnée dans le fichier `.env` pour la variable `MONGODB_URI`.

## Utilisation

1. Exécutez la commande `npm run dev` pour démarrer le serveur de développement.
2. Accédez à http://localhost:3000/ pour afficher la page d'accueil.
3. Accédez à http://localhost:3000/api pour utiliser l'API.
4. Accédez à http://localhost:3000/swagger pour utiliser le swagger de l'API.
5. Accédez à http://localhost:3000/movies pour voir les films.

## Fonctionnalités

Film :

- Récupérer tous les films
- Récupérer un film
- Ajouter un film
- Modifier un film
- Supprimer un film

Commentaire :

- Récupérer les commentaires d'un film
- Récupérer un commentaire d'un film
- Ajouter un commentaire à un film
- Modifier un commmentaire d'un film
- Supprimer un commmentaire d'un film
