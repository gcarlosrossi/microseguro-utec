
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Login.css";

export const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    remember: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí iría la lógica de autenticación (API)
    alert("Inicio de sesión exitoso");
    navigate("/"); // Regresa al Home
  };

  return (
    <div className="sv-login">
      <div className="sv-login-container">
        {/* Logo y título */}
        <div className="sv-login-header">
          <div className="sv-logo-pill">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M12 3l7 3v6c0 5-3.5 8-7 9-3.5-1-7-4-7-9V6l7-3z" fill="#fff" />
            </svg>
          </div>
          <h1 className="sv-logo-text">SeguroViaje</h1>
          <h2 className="sv-login-title">Iniciar Sesión</h2>
          <p className="sv-login-subtitle">
            Accede a tu cuenta para gestionar tus seguros
          </p>
        </div>

        {/* Formulario */}
        <form className="sv-login-form" onSubmit={handleSubmit}>
          <div className="sv-form-group">
            <input
              type="email"
              name="email"
              placeholder="Correo Electrónico"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="sv-form-group">
            <input
              type="password"
              name="password"
              placeholder="Contraseña"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          {/* Opciones */}
          <div className="sv-form-options">
            <label className="sv-remember">
              <input
                type="checkbox"
                name="remember"
                checked={formData.remember}
                onChange={handleChange}
              />
              Recordarme
            </label>
            <Link to="/forgot-password" className="sv-link">
              ¿Olvidaste tu contraseña?
            </Link>
          </div>

          {/* Botón */}
          <button type="button" className="sv-btn-primary"   onClick={() => navigate("/signin")}>
            Iniciar Sesión
          </button>
        </form>

        {/* Links inferiores */}
        <div className="sv-login-footer">
          <p>
            ¿No tienes cuenta?{" "}
            <Link to="/register" className="sv-link">
              Regístrate aquí
            </Link>
          </p>
          <button
            className="sv-back-home"
            onClick={() => navigate("/")}
          >
            ← Volver al inicio
          </button>
        </div>
      </div>
    </div>
  );
};
