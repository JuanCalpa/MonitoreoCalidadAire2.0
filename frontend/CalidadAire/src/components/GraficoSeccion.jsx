import GraficoBarras from './GraficoBarras';

const GraficoSeccion = ({ datosCalidadAire }) => {
  console.log('Datos para el gráfico:', datosCalidadAire); // <-- AQUÍ

  return (
    <div className="grafico">
      <h1 className="titulo">Calidad de Aire Universidad Mariana</h1>
      <div className="grafico-barras-fondo">
        {datosCalidadAire.length > 0 ? (
          <GraficoBarras datos={datosCalidadAire} />
        ) : (
          <p>Cargando datos...</p>
        )}
      </div>
    </div>
  );
};

export default GraficoSeccion;