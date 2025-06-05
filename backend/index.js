const express = require('express');
const cors = require('cors');
const userRoutes = require('./src/routes/userRoutes');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

//ruta
app.use("/api", userRoutes);

//iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
})