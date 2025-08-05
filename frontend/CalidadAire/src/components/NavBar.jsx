import { Link } from "react-router-dom";

function Navbar({ isInvitado }) {
  return (
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
            {/* Solo muestra la opción de variables si es invitado */}
            {isInvitado ? (
              <li className="nav-item">
                <Link className="nav-link" to="/variables-entorno">Variables separadas</Link>
              </li>
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
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar;