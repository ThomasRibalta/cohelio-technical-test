#!/bin/bash

echo "Attente de MongoDB..."
sleep 10

echo "Création de la base de données Cohelio..."
mongo --host localhost -u root -p rootpassword --authenticationDatabase admin <<EOF
use Cohelio

EOF

echo "Base de données 'Cohelio' créée."
