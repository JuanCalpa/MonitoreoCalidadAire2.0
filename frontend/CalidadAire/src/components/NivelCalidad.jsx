const NivelCalidad = ({ veredicto }) => (
  <div className="nivel-calidad">
    <h2>NIVEL DE LA CALIDAD DEL AIRE</h2>
    <p className={`veredicto ${veredicto.toLowerCase()}`}>{veredicto.toUpperCase()}</p>
    <p>
      {veredicto === 'Buena' &&
        'El nivel de la calidad del aire es bueno porque el material particulado se encuentra por debajo del nivel estipulado por la resolución 2254 de 2017.'}
      {veredicto === 'Moderada' &&
        'El nivel de la calidad del aire es moderado, lo que puede afectar a personas sensibles.'}
      {veredicto === 'Mala' &&
        'El nivel de la calidad del aire es malo, lo que puede afectar gravemente la salud de las personas.'}
    </p>
  </div>
);

export default NivelCalidad;