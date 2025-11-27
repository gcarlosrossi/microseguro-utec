
import React from "react";
import "./Footer.css";
import { useNavigate } from "react-router-dom";
export const Footer = () => {
    const navigate = useNavigate();
  return (
    <footer className="sv-footer">
      <div className="sv-footer-top">
        <p className="sv-footer-title">¿Listo para proteger tu próximo viaje?</p>
        <p className="sv-footer-subtitle">
          Únete a miles de viajeros que confían en SeguroViaje
        </p>
        <button className="sv-footer-btn" onClick={() => navigate("/register")}>Crear Cuenta Gratis</button>
      </div>
      <div className="sv-footer-bottom">
        <p>© 2025 SeguroViaje. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
}