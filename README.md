# 🏫 ResAFTEC - Système de Réservation de Salles

## 1. Présentation & Contexte

**ResAFTEC** est une application web de réservation de salles développée dans le cadre de mon BTS SIO. Elle permet aux utilisateurs (personnel et étudiants) de consulter les salles disponibles et d'effectuer des réservations (pour les utilisateurs autorisés : professeurs et administrateurs).
- **Objectif :** Moderniser la gestion des salles de l'établissement suite à la construction d'un nouveau bâtiment, en fournissant une interface intuitive pour les utilisateurs et un tableau de bord d'administration, tout en posant les bases d'un système de contrôle d'accès physique connecté.

---

## 2. Conception & Modélisation

### Cas d'Utilisation (Use Cases)
*< diagrammes à ajouter ici >*
- Fonctionnalités implémentées : Authentification (JWT), Gestion des utilisateurs, Gestion des salles/équipements, Réservation avec génération de code unique.

### Modèle de Données
- **MCD (Modèle Conceptuel de Données) :** *< Image du MCD ici >*.
- **Code SQL :** *< Ajouter ici >*

### Maquettes (Wireframes)
- [Lien vers les maquettes (Penpot)](https://design.penpot.app/#/workspace?team-id=e7a86fff-661d-81c1-8008-10c6effa856d&file-id=e7a86fff-661d-81c1-8008-0f0d1efc859f&page-id=e7a86fff-661d-81c1-8008-0f0d1efc85a0)

---

## 3. Architecture & Contraintes Techniques

### Architecture Logicielle
- **Backend :** Node.js / Express / TypeScript. Architecture en couches (Routes, Contrôleurs, Services).
- **ORM :** TypeORM avec connexion à une base MariaDB.
- **Frontend :** Vue / Pinia / Tailwind CSS.

---

## 4. Guide d'Installation et Configuration

### Prérequis
- Node.js (vX.X)
- MariaDB
- Cloner le dépôt : `git clone https://github.com/Pierddev/ReservationSallesAFTEC.git`

### Variables d'Environnement

Créez un fichier `.env` à la racine du dossier `backend/` en vous basant sur le fichier `.env.example` fourni :

| Variable       | Description                                                | Valeur par défaut          | Obligatoire |
| -------------- | ---------------------------------------------------------- | -------------------------- | ----------- |
| `PORT`         | Port d'écoute du serveur Node.js                           | `3005`                     | Non         |
| `DB_HOST`      | Hôte de la base de données MariaDB                         | `localhost`                | Oui         |
| `DB_PORT`      | Port de la base de données                                 | `3306`                     | Non         |
| `DB_NAME`      | Nom de la base de données                                  | —                          | Oui         |
| `DB_USER`      | Nom d'utilisateur de la base de données                    | —                          | Oui         |
| `DB_PASSWORD`  | Mot de passe de l'utilisateur base de données              | —                          | Oui         |
| `JWT_SECRET`   | Clé secrète pour la signature et vérification des tokens JWT | —                        | Oui         |
| `URL_SITE`     | URL du frontend (utilisée pour la configuration CORS)      | `http://localhost:5173`    | Oui         |

**Exemple de fichier `.env` :**
```env
PORT=3000
DB_HOST=localhost
DB_PORT=3306
DB_NAME=reservation_salles_aftec
DB_USER=reservation_salles_app
DB_PASSWORD=votre_mot_de_passe
JWT_SECRET=une_cle_secrete_tres_longue_et_aleatoire
URL_SITE=http://localhost:5173
```

### Initialisation du Backend
*< A définir ici >*

### Initialisation du Frontend
*< A définir ici >*