import React from 'react';
import '../../../styles/card.css' // Archivo CSS para los estilos

const Card = ({ count , title }) => {
  return (
    <div className="card_perz">
      <h2>{title}</h2>
      <p className="vehicle-count">{count}</p>
    </div>
  );
};

export default Card;