const express = require('express');
const cors = require('cors');
const session = require('express-session');
const userRoutes = require('./src/routes/userRoutes');
const sensorRoutes = require('./src/routes/sensorRoutes'); 
const pdfRoutes = require('./src/routes/pdfRoutes'); 
const app = express();
const PORT = 3000;

app.use(cors({
  origin: 'http://localhost:5173', // URL de tu frontend
  credentials: true
}));
app.use(express.json());
app.use(session({
    secret:'MonitoreoCalidad',
    resave: false,
    saveUninitialized:true,
    cookie: { secure: false, maxAge: 600000}
}));

//ruta
app.use("/api", userRoutes);
app.use("/api", sensorRoutes);
app.use("/api", pdfRoutes); 


//iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
})

