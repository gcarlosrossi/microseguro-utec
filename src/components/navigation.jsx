
import React from "react";
import { Link , useNavigate} from "react-router-dom";
import "./Navigation.css";

export const Navigation = () => {
    const navigate = useNavigate();
  return (
    <header className="sv-nav">
      <div className="sv-nav-container">
        {/* Logo */}
        <div className="sv-nav-logo">
          <span className="sv-logo-pill">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M12 3l7 3v6c0 5-3.5 8-7 9-3.5-1-7-4-7-9V6l7-3z" fill="#fff" />
            </svg>
          </span>
          <span className="sv-logo-text">SeguroViaje</span>
        </div>

        {/* Links */}
        <nav className="sv-nav-links">
          <Link to="/features">Características</Link>
          <Link to="/details">Cómo Funciona</Link>
          <Link to="/about">Acerca</Link>
        </nav>

        {/* Botones */}
        <div className="sv-nav-actions">
          <Link to="/login" className="sv-btn-outline">Iniciar Sesión</Link>
          <Link to="/register" className="sv-btn-primary">Registrarse</Link>
        </div>
      </div>
    </header>
  );
};
