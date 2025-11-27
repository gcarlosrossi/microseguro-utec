
import React from "react";
import { useNavigate } from "react-router-dom";
import "./Panelcontrol.css";

export const Panelcontrol = ({
  stats = { activos: 1, total: 2, incidentes: 0 },
}) => {
  const navigate = useNavigate();

  const cards = [
    {
      label: "Seguros Activos",
      value: stats.activos ?? 0,
      color: "green",
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
          {/* shield */}
          <path d="M12 3l7 3v6c0 5-3.5 8-7 9-3.5-1-7-4-7-9V6l7-3z" fill="#fff" />
        </svg>
      ),
    },
    {
      label: "Total Seguros",
      value: stats.total ?? 0,
      color: "orange",
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
          {/* document */}
          <path
            d="M8 3h7l4 4v12a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z"
            fill="#fff"
          />
        </svg>
      ),
    },
    {
      label: "Incidentes",
      value: stats.incidentes ?? 0,
      color: "purple",
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
          {/* alert */}
          <circle cx="12" cy="12" r="10" fill="#fff" />
        </svg>
      ),
    },
  ];

  const actions = [
    {
      title: "Cotizar Seguro",
      desc: "Obtén una cotización para tu próximo viaje",
      color: "blue",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          {/* plus */}
          <path d="M12 5v14M5 12h14" stroke="#fff" strokeWidth="2" />
        </svg>
      ),
      onClick: () => navigate("/cotizacion"),
    },
    {
      title: "Mis Seguros",
      desc: "Consulta tus pólizas contratadas",
      color: "orange",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          {/* document */}
          <path
            d="M8 3h7l4 4v12a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z"
            fill="#fff"
          />
        </svg>
      ),
      onClick: () => navigate("/polizas"),
    },
    {
      title: "Reportar Incidente",
      desc: "Reporta un siniestro de viaje",
      color: "purple",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          {/* info */}
          <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z" fill="#fff" />
        </svg>
      ),
      onClick: () => navigate("/incidentes/nuevo"),
    },
  ];

  return (
    <section className="sv-panel">
      <div className="sv-panel__container">
        {/* Encabezado */}
        <div className="sv-panel__header">
          <h2 className="sv-panel__title">Panel de Control</h2>
          <p className="sv-panel__subtitle">
            Gestiona tus microseguros y reporta incidentes
          </p>
        </div>

        {/* Métricas */}
        <div className="sv-stats">
          {cards.map((c, i) => (
            <article key={i} className="sv-stat-card">
              <div className={`sv-pill sv-${c.color}`} aria-hidden="true">
                {c.icon}
              </div>
              <div className="sv-stat-content">
                <span className="sv-stat-label">{c.label}</span>
                <span className="sv-stat-value">{c.value}</span>
              </div>
            </article>
          ))}
        </div>

        {/* Acciones rápidas */}
        <h3 className="sv-actions-title">Acciones Rápidas</h3>
        <div className="sv-actions">
          {actions.map((a, i) => (
            <button
              key={i}
              type="button"
              className="sv-action-card"
              onClick={a.onClick}
            >
              <div className={`sv-pill sv-${a.color}`} aria-hidden="true">
                {a.icon}
              </div>
              <div className="sv-action-content">
                <span className="sv-action-title">{a.title}</span>
                <span className="sv-action-desc">{a.desc}</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Panelcontrol;
