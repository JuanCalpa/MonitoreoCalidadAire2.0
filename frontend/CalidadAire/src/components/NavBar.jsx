function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg custom-navbar">
      <div className="container-fluid">
        <a className="navbar-brand" href="/invitado">Calidad del Aire</a>
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
            <li className="nav-item">
              <a className="nav-link" href="/variables-entorno">Variables de entorno</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Descargar datos</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Filtrar por fechas</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Generar reporte</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar