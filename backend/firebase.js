require('dotenv').config(); // Cargar las variables del archivo .env
const admin = require('firebase-admin');

// Procesar el salto de línea en la clave privada
const privateKey = process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n');

admin.initializeApp({
  credential: admin.credential.cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: privateKey,
  }),
  databaseURL: process.env.FIREBASE_DATABASE_URL,
});
