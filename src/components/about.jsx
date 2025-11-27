
import React from "react";
import "./About.css";
import { useNavigate } from "react-router-dom";

export const About = (props) => {
  const navigate = useNavigate();
  const title =
    props.data?.title || "Protege tus viajes con microseguros flexibles";
  const paragraph =
    props.data?.paragraph ||
    "Contrata seguros de viaje por días, protege tus dispositivos electrónicos y reporta incidentes de forma rápida y sencilla. Todo desde una plataforma digital.";
  const ctaText = props.data?.ctaText || "Comenzar Ahora";

  return (
    <section id="about" className="sv-about">
      <div className="sv-about-container">
        {/* Icono naranja */}
        <div className="sv-about-icon" aria-hidden="true">
          {/* Ícono simple (puedes cambiarlo por avión/escudo) */}
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path d="M12 2l7 5-7 5-7-5 7-5zm0 9l7 5-7 5-7-5 7-5z" fill="#fff" />
          </svg>
        </div>

        {/* Título: evita herencias globales */}
        <h2 className="sv-about-title">{title}</h2>

        {/* Párrafo */}
        <p className="sv-about-text">{paragraph}</p>

        {/* CTA */}
        <button className="sv-about-cta" type="button"  onClick={() => navigate("/register")}>
          {ctaText}
        </button>
      </div>
    </section>
  );
};
