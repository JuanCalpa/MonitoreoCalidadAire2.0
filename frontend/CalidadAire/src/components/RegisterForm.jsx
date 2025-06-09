import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../StyleComponents/LoginForm.css';

const RegisterForm = () => {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [institucion, setInstitucion] = useState('');
  const [cargo, setCargo] = useState('');
  const [biografia, setBiografia] = useState('');
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [telefono, setTelefono] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = {
      nombre,
      apellido,
      institucion,
      cargo,
      biografia,
      correo,
      contrasena,
      telefono
    };

    try {
      const response = await fetch('http://localhost:3000/api/usuarios/crear', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        alert('Usuario registrado con éxito');
        navigate('/login');
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
          placeholder="Nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Apellido"
          value={apellido}
          onChange={(e) => setApellido(e.target.value)}
          required
        />
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
        <input
          type="text"
          placeholder="Biografía"
          value={biografia}
          onChange={(e) => setBiografia(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Correo electrónico"
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={contrasena}
          onChange={(e) => setContrasena(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Teléfono"
          value={telefono}
          onChange={(e) => setTelefono(e.target.value)}
          required
        />
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