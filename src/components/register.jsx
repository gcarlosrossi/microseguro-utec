
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Register.css";

export const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    terms: false,
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
    if (!formData.terms) {
      alert("Debes aceptar los términos y condiciones.");
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      alert("Las contraseñas no coinciden.");
      return;
    }
    // Aquí iría la lógica de registro (API)
    alert("Cuenta creada con éxito");
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
          <h2 className="sv-login-title">Crear Cuenta</h2>
          <p className="sv-login-subtitle">
            Regístrate para comenzar a proteger tus viajes
          </p>
        </div>

        {/* Formulario */}
        <form className="sv-login-form" onSubmit={handleSubmit}>
          <div className="sv-form-group">
            <input
              type="text"
              name="name"
              placeholder="Nombre Completo"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
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
          <div className="sv-form-group">
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirmar Contraseña"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>

          {/* Checkbox */}
          <div className="sv-form-check">
            <input
              type="checkbox"
              name="terms"
              checked={formData.terms}
              onChange={handleChange}
            />
            <label>
              Acepto los términos y condiciones y la política de privacidad
            </label>
          </div>

          {/* Botón */}
          <button type="submit" className="sv-btn-primary">
            Crear Cuenta
          </button>
        </form>

        {/* Links inferiores */}
        <div className="sv-login-footer">
          <p>
            ¿Ya tienes cuenta?{" "}
            <Link to="/login" className="sv-link">
              Inicia sesión aquí
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
