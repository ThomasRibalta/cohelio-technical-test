# Utilise l'image officielle Node.js version 22.6.0
FROM node:22.6.0

# Étape 2 : Définir le répertoire de travail
WORKDIR /app

# Étape 3 : Copier les fichiers package.json et package-lock.json
COPY package.json package-lock.json ./

# Étape 4 : Installer les dépendances
RUN npm install

# Étape 6 : Copier tout le code source dans le conteneur
COPY . .

RUN npm install bcrypt

# Étape 8 : Exposer le port utilisé par l'application
EXPOSE 3030

# Étape 9 : Commande pour démarrer l'application
CMD ["npm", "start"]
