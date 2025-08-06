import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

function Navbar() {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const isInvitado = localStorage.getItem('isInvitado') !== 'false';

  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:3000/api/usuarios/logout", {}, { withCredentials: true });
      localStorage.setItem('isInvitado', 'true');
      setShowModal(false);
      navigate("/");
    } catch (error) {
      alert("Error al cerrar sesión");
    }
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg custom-navbar">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/invitado">Calidad del Aire</Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              {isInvitado ? (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/">Iniciar sesión</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/variables-entorno">Variables separadas</Link>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/variables-entorno">Variables de entorno</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/comparar-datos">Comparar datos</Link>
                  </li>
                  <li className="nav-item">
                    <span className="nav-link disabled" style={{ cursor: "not-allowed", opacity: 0.6 }}>Descargar datos</span>
                  </li>
                  <li className="nav-item">
                    <span className="nav-link disabled" style={{ cursor: "not-allowed", opacity: 0.6 }}>Filtrar por fechas</span>
                  </li>
                  <li className="nav-item">
                    <a
                      className="nav-link"
                      href="http://localhost:3000/api/pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      download
                    >
                      Generar reporte
                    </a>
                  </li>
                  <li className="nav-item">
                    <button
                      className="nav-link btn btn-link"
                      style={{ color: "#0d6efd" }}
                      onClick={() => setShowModal(true)}
                    >
                      Cerrar sesión
                    </button>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>

      {/* Modal de confirmación */}
      {showModal && (
        <div
          style={{
            position: "fixed",
            top: 0, left: 0, width: "100vw", height: "100vh",
            background: "rgba(0,0,0,0.4)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 9999
          }}
        >
          <div style={{ background: "#fff", padding: 24, borderRadius: 8, minWidth: 300, textAlign: "center" }}>
            <h5>¿Seguro que deseas cerrar sesión?</h5>
            <div style={{ marginTop: 20 }}>
              <button className="btn btn-danger" onClick={handleLogout}>Sí, cerrar sesión</button>
              <button className="btn btn-secondary" style={{ marginLeft: 10 }} onClick={() => setShowModal(false)}>Cancelar</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Navbar;