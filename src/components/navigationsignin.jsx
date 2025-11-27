
import React from "react";
import { useNavigate } from "react-router-dom";
import "./Navigationsignin.css";

export const Navigationsignin = ({ userName = "aas", onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Si te pasan un handler externo, úsalo. Si no, haz un reset básico.
    if (typeof onLogout === "function") {
      onLogout();
    }
    // Redirige al home tras cerrar sesión
    navigate("/");
  };

  return (
    <header className="sv-nav-in">
      <div className="sv-nav-in__container">
        {/* Izquierda: logo */}
        <div className="sv-nav-in__brand" onClick={() => navigate("/")}>
          <span className="sv-logo-pill" aria-hidden="true">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M12 3l7 3v6c0 5-3.5 8-7 9-3.5-1-7-4-7-9V6l7-3z" fill="#fff" />
            </svg>
          </span>
          <span className="sv-logo-text">Seguro Viaje</span>
        </div>

        {/* Derecha: saludo + botón cerrar sesión */}
        <div className="sv-nav-in__actions">
          <span className="sv-greet">Hola, {userName}</span>

          <button
            type="button"
            className="sv-btn-outline"
            onClick={handleLogout}
          >
            <span className="sv-btn-icon" aria-hidden="true">
              {/* Icono salida (SVG ligero) */}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M10 4H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h4" stroke="#0aa2ff" strokeWidth="2" strokeLinecap="round"/>
                <path d="M14 16l4-4-4-4" stroke="#0aa2ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M8 12h10" stroke="#0aa2ff" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </span>
            <span className="sv-btn-text">Cerrar Sesión</span>
          </button>
        </div>
      </div>
    </header>
  );
};
