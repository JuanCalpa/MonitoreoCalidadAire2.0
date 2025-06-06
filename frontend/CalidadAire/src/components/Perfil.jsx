import React from 'react';
import { useNavigate } from 'react-router-dom';

import '../StyleComponents/Perfil.css'; 

const Perfil = () => {
  const navigate = useNavigate();

  const handleUsuario = () => {
    navigate('/login'); // Redirige a la página de login de usuario
  };

  const handleInvitado = () => {
    navigate('/invitado'); // Redirige a la página de invitado
  };

  return (
    <div className='general-container'>
      <div className="perfil-container">
        <div className="perfil-card">
          <div className='titulo'></div>
          <h2>Bienvenido</h2>
          <div className='texto'>¿Cómo deseas ingresar?</div>
          <button onClick={handleUsuario}>Entrar como Usuario</button>
          <button onClick={handleInvitado}>Entrar como Invitado</button>
        </div>
      </div>
    </div>

  );
};

export default Perfil;