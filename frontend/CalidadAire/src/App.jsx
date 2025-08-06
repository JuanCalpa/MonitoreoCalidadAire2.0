import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Perfil from './components/Perfil';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import Navbar from './components/NavBar'
import GraficoSeccion from './components/GraficoSeccion'
import NivelCalidad from './components/NivelCalidad'
import Descripcion from './components/Descripcion'
import VariablesEntorno from './pages/VariablesEntorno';
import CompararDatos from './pages/CompararDatos';
import './App.css'

function MainContent({ datosCalidadAire, veredicto, isInvitado }) {
  return (
    <div>
      <Navbar isInvitado={isInvitado}/>
      <main className="main-container">
        <section className="left-section">
          <GraficoSeccion datosCalidadAire={datosCalidadAire} />
          <NivelCalidad veredicto={veredicto} />
        </section>
        <Descripcion />
      </main>
    </div>
  );
}

function App() {
  const [veredicto, setVeredicto] = useState('')
  const [datosCalidadAire, setDatosCalidadAire] = useState([])

  const fetchUltimoDato = () => {
    fetch('http://localhost:3000/api/ultimo')
      .then(response => response.json())
      .then(dato => {
        const datosAdaptados = [
          { name: 'CO', valor: dato.CO },
          { name: 'Humedad', valor: dato.humedad },
          { name: 'PM2.5', valor: dato.pm2_5 },
          { name: 'PM10', valor: dato.pm10 },
          { name: 'Temperatura', valor: dato.temperatura }
        ];
        setDatosCalidadAire(datosAdaptados);
      })
      .catch(error => console.error('Error al obtener el último dato:', error))
  }

  useEffect(() => {
    fetchUltimoDato()
  }, [])

  useEffect(() => {
    if (datosCalidadAire.length > 0) {
      const promedio = datosCalidadAire.reduce((a, b) => a + b, 0) / datosCalidadAire.length
      if (promedio <= 50) {
        setVeredicto('Buena')
      } else if (promedio <= 100) {
        setVeredicto('Moderada')
      } else {
        setVeredicto('Moderada')
      }
    }
  }, [datosCalidadAire])

  return (
    
      <Routes>
        <Route path="/" element={<Perfil />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/invitado" element={
          <MainContent datosCalidadAire={datosCalidadAire} veredicto={veredicto} isInvitado={true}/>
        } />
        <Route path="/variables-entorno" element={<VariablesEntorno />} />
        <Route path="/comparar-datos" element={<CompararDatos />} />
      </Routes> 

  )
}

export default App