const express = require('express');
const cors = require('cors');
const session = require('express-session');
const userRoutes = require('./src/routes/userRoutes');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(session({
    secret:'MonitoreoCalidad',
    resave: false,
    saveUninitialized:true,
    cookie: { secure: false, maxAge: 600000}
}));
//ruta
app.use("/api", userRoutes);

//iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
})

