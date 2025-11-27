
import React from "react";
import "./Features.css";

export const Features = () => {
  const items = [
    {
      color: "green",
      icon: (
        // Check (SVG)
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M9.5 16.5l-4-4 1.4-1.4 2.6 2.6 7-7 1.4 1.4-8.4 8.4z"
            fill="#fff"
          />
        </svg>
      ),
      title: "Rápido y Simple",
      text: "Cotiza y compra tu microseguro en minutos. Sin complicaciones ni papeleos extensos."
    },
    {
      color: "orange",
      icon: (
        // Dollar (SVG)
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M12 2a1 1 0 011 1v1.1c2.5.3 4.4 1.8 4.4 4.2 0 2.5-2 3.7-4.4 4.2v3.3c1.2-.2 2.3-.7 3.2-1.4l1.3 1.5c-1.4 1.1-3 1.8-4.5 2v1.3a1 1 0 11-2 0v-1.3c-2.7-.3-5-1.8-5-4.3 0-2.6 2.1-3.8 5-4.3V5.7c-1 .2-2 .6-2.8 1.2L6 5.4c1.3-.9 2.9-1.5 4.6-1.7V3a1 1 0 011-1z"
            fill="#fff"
          />
        </svg>
      ),
      title: "Precios Accesibles",
      text: "Paga solo por los días que viajas. Microseguros desde $15 USD con coberturas completas."
    },
    {
      color: "blue",
      icon: (
        // Info (SVG)
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M12 2a10 10 0 1010 10A10.011 10.011 0 0012 2zm0 4a1.5 1.5 0 11-1.5 1.5A1.5 1.5 0 0112 6zm2 12h-4v-2h1v-4h-1v-2h3v6h1z"
            fill="#fff"
          />
        </svg>
      ),
      title: "Reporte de Siniestros",
      text: "Reporta incidentes en línea con fotos y documentación. Seguimiento en tiempo real."
    }
  ];

  return (
    <section id="features" className="sv-features">
      <div className="sv-features-container">
        <h2 className="sv-features-title">¿Por qué elegir SeguroViaje?</h2>

        <div className="sv-features-grid">
          {items.map((item, idx) => (
            <article key={idx} className="sv-card">
              <div
                className={`sv-card-icon sv-${item.color}`}
                aria-hidden="true"
              >
                {item.icon}
              </div>
              <h3 className="sv-card-title">{item.title}</h3>
              <p className="sv-card-text">{item.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
