// filepath: d:\Repositorio\MonitoreoCalidadAire\frontend\CalidadAireFront\src\components\LoginForm.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../StyleComponents/LoginForm.css';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3000/api/usuarios/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ correo: email, contrasena: password }),
      });

      const data = await response.json();
      console.log('Respuesta de la API:', data);

      if (response.ok && data.success) {
        alert('Inicio de sesión exitoso');
        console.log('Usuario:', data.user);
        navigate('/invitado'); // Redirección aquí
      } else {
        alert(`Error: ${data.error || 'Credenciales inválidas'}`);
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      alert('Error al conectar con el servidor');
    }
  };

  const handleRegister = () => {
    navigate('/register');
  };

  return (
    <div className="login-container">
      <form className="login-card" onSubmit={handleSubmit}>
        <h2>Iniciar Sesión</h2>
        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Entrar</button>
        <div className="register-link">
          ¿No tienes cuenta?{' '}
          <span onClick={handleRegister}>Regístrate</span>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;