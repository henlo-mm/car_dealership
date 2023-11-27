import React from 'react';
import '../../../styles/card.css' // Archivo CSS para los estilos

const Card = ({ count , title , icono }) => {
  return (
    <div className="card_perz col-12 col-sm-6 col-lg-3 mt-3 mt-sm-0">
      <h2 className="m-0">{title}</h2>
      <p className="vehicle-count m-0">{count}</p>
      <div class="icon">
        <img src={icono} alt="Icono" />
      </div>
    </div>
  );
};

export default Card;