import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../StyleComponents/LoginForm.css';

const RegisterForm = () => {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [tipo, setTipo] = useState('admin'); // Valor predeterminado
  const [institucion, setInstitucion] = useState('');
  const [cargo, setCargo] = useState('');
  const [biografia, setBiografia] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Crear el objeto de datos
    const userData = {
      nombre,
      correo: email,
      contraseña: password,
      tipo,
      institucion: tipo === 'investigador' ? institucion : undefined,
      cargo: tipo === 'investigador' ? cargo : undefined,
      biografia: tipo === 'investigador' ? biografia : undefined,
    };

    try {
      // Llamar a la API para registrar el usuario
      const response = await fetch('http://localhost:3000/api/sql/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        alert('Usuario registrado con éxito');
        navigate('/login'); // Redirigir al login
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.error || 'No se pudo registrar el usuario'}`);
      }
    } catch (error) {
      console.error('Error al registrar el usuario:', error);
      alert('Error al conectar con el servidor');
    }
  };

  const handleLogin = () => {
    navigate('/login');
  };

  return (
    <div className="login-container">
      <form className="login-card" onSubmit={handleSubmit}>
        <h2>Registrarse</h2>
        <input
          type="text"
          placeholder="Nombre completo"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
        />
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
        <select
          value={tipo}
          onChange={(e) => setTipo(e.target.value)}
          required
        >
          <option value="admin">Administrador</option>
          <option value="investigador">Investigador</option>
        </select>
        {tipo === 'investigador' && (
          <>
            <input
              type="text"
              placeholder="Institución"
              value={institucion}
              onChange={(e) => setInstitucion(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Cargo"
              value={cargo}
              onChange={(e) => setCargo(e.target.value)}
              required
            />
            <textarea
              placeholder="Biografía"
              value={biografia}
              onChange={(e) => setBiografia(e.target.value)}
              required
            />
          </>
        )}
        <button type="submit">Crear cuenta</button>
        <div className="register-link">
          ¿Ya tienes cuenta?{' '}
          <span onClick={handleLogin}>Inicia sesión</span>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;