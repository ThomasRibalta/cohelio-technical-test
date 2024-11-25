# Utilise l'image officielle Node.js version 22.6.0
FROM node:22.6.0

# Définit le répertoire de travail dans le conteneur
WORKDIR /app

# Copie les fichiers package.json et package-lock.json
COPY package*.json ./

# Installe les dépendances
RUN npm install

# Copie le reste de l'application
COPY . .

# Expose le port sur lequel l'application va tourner (exemple : 3000)
EXPOSE 3000

# Définit la commande de démarrage
CMD ["npm", "start"]
