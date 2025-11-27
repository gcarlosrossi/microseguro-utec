
import React from "react";
import "./Detail.css";

export const Detail = (props) => {
  // Puedes sobreescribir estos valores vía props.items si lo deseas
  const items = props.items || [
    { number: 1, color: "blue",  title: "Regístrate",   text: "Crea tu cuenta en segundos" },
    { number: 2, color: "orange",title: "Cotiza",       text: "Ingresa los datos de tu viaje" },
    { number: 3, color: "green", title: "Paga",         text: "Elige tu método de pago preferido" },
    { number: 4, color: "purple",title: "Viaja seguro", text: "Recibe tu póliza por correo" },
  ];

  const title = props.title || "¿Cómo funciona?";

  return (
    <section id="details" className="sv-details">
      <div className="sv-details-container">
        <h2 className="sv-details-title">{title}</h2>

        {/* Lista ordenada para accesibilidad (steps) */}
        <ol className="sv-steps" role="list">
          {items.map((item, idx) => (
            <li key={idx} className="sv-step">
              <div className={`sv-step-pill sv-${item.color}`} aria-hidden="true">
                <span className="sv-step-number">{item.number}</span>
              </div>
              <h3 className="sv-step-title">{item.title}</h3>
              <p className="sv-step-text">{item.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
};
