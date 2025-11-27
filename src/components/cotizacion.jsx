
import React, { useState, useEffect } from "react";
import "./Cotizacion.css";

export const Cotizacion = () => {
  const [currentStep, setCurrentStep] = useState(1);

  // Paso 1
  const [origen, setOrigen] = useState("");
  const [destino, setDestino] = useState("");
  const [inicio, setInicio] = useState("");
  const [fin, setFin] = useState("");
  const [viajeros, setViajeros] = useState(1);

  // Paso 2
  const [dni, setDni] = useState("");
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");

  // Paso 3
  const [coberturas, setCoberturas] = useState([
    { id: 1, nombre: "Asistencia Médica", precio: 15, seleccionado: true },
    { id: 2, nombre: "Cancelación de Viaje", precio: 25, seleccionado: false },
    { id: 3, nombre: "Pérdida de Equipaje", precio: 10, seleccionado: false },
    { id: 4, nombre: "Asistencia 24/7", precio: 8, seleccionado: false }
  ]);

  // Paso 4
  const [objNombre, setObjNombre] = useState("");
  const [objValor, setObjValor] = useState("");
  const [objetos, setObjetos] = useState([]);

  // Errores y Snackbar
  const [errors, setErrors] = useState({});
  const [snackbar, setSnackbar] = useState("");

  const formatoUSD = (n) =>
    (Number(n) || 0).toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2
    });

  const costoCoberturas = coberturas
    .filter((c) => c.seleccionado)
    .reduce((sum, c) => sum + c.precio, 0);

  const totalObjetos = objetos.reduce((sum, o) => sum + (Number(o.valor) || 0), 0);
  const electronicsCoveragePerDay = totalObjetos * 0.05;

  const calcularDias = (inicioStr, finStr) => {
    if (!inicioStr || !finStr) return 0;
    const start = new Date(inicioStr);
    const end = new Date(finStr);
    if (isNaN(start.getTime()) || isNaN(end.getTime()) || end < start) return 0;
    return Math.floor((end - start) / (1000 * 60 * 60 * 24)) + 1;
  };

  const dias = calcularDias(inicio, fin);
  const totalPorDia = costoCoberturas + electronicsCoveragePerDay;
  const totalViaje = dias > 0 ? totalPorDia * dias : totalPorDia;

  // Reinicio al iniciar
  useEffect(() => {
    resetForm();
  }, []);

  const resetForm = () => {
    setOrigen("");
    setDestino("");
    setInicio("");
    setFin("");
    setViajeros(1);
    setDni("");
    setNombre("");
    setApellido("");
    setCoberturas((prev) =>
      prev.map((c, i) => ({ ...c, seleccionado: i === 0 }))
    );
    setObjetos([]);
    setErrors({});
    setSnackbar("");
    setCurrentStep(1);
  };

  const showSnackbar = (msg) => {
    setSnackbar(msg);
    setTimeout(() => setSnackbar(""), 3000);
  };

  const validateStep = () => {
    const newErrors = {};
    if (currentStep === 1) {
      if (!origen.trim()) newErrors.origen = "El origen es obligatorio";
      if (!destino.trim()) newErrors.destino = "El destino es obligatorio";
      if (origen && destino && origen === destino)
        newErrors.destino = "El destino no puede ser igual al origen";
      if (!inicio) newErrors.inicio = "La fecha de inicio es obligatoria";
      if (!fin) newErrors.fin = "La fecha de fin es obligatoria";
      if (inicio && fin && new Date(inicio) > new Date(fin))
        newErrors.fin = "La fecha fin debe ser mayor o igual a inicio";
      if (viajeros < 1) newErrors.viajeros = "Debe haber al menos 1 viajero";
    }
    if (currentStep === 2) {
      if (!dni.trim()) newErrors.dni = "El DNI es obligatorio";
      if (!/^\d+$/.test(dni)) newErrors.dni = "El DNI debe ser numérico";
      if (dni.length > 14) newErrors.dni = "Máximo 14 dígitos";
      if (!nombre.trim()) newErrors.nombre = "El nombre es obligatorio";
      if (!apellido.trim()) newErrors.apellido = "El apellido es obligatorio";
    }
    if (currentStep === 3) {
      if (coberturas.filter((c) => c.seleccionado).length === 0)
        newErrors.coberturas = "Debe seleccionar al menos una cobertura";
    }
    if (currentStep === 4) {
      if (objetos.length === 0)
        newErrors.objetos = "Debe agregar al menos un objeto";
    }
    return newErrors;
  };

  const handleNext = (e) => {
    e.preventDefault();
    const newErrors = validateStep();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      showSnackbar("Corrige los errores antes de continuar");
      return;
    }
    setErrors({});
    setCurrentStep(currentStep + 1);
  };

  const handleBack = () => setCurrentStep(currentStep - 1);

  const toggleCobertura = (id) => {
    setCoberturas((prev) =>
      prev.map((c) => (c.id === id ? { ...c, seleccionado: !c.seleccionado } : c))
    );
  };

  const agregarObjeto = (e) => {
    e.preventDefault();
    if (!objNombre.trim() || Number(objValor) <= 0) {
      showSnackbar("Nombre y valor deben ser válidos");
      return;
    }
    setObjetos((prev) => [
      ...prev,
      { id: Date.now(), nombre: objNombre, valor: Number(objValor) }
    ]);
    setObjNombre("");
    setObjValor("");
  };

  const eliminarObjeto = (id) => {
    setObjetos((prev) => prev.filter((o) => o.id !== id));
  };

  return (
    <div className="cotizacion-page">
      <header className="cotizacion-header">
        <h3>✈ Microseguro de Viaje</h3>
      </header>

      {/* Stepper segmentado */}
      <div className="stepper">
        <p>Paso {currentStep} de 5</p>
        <div className="stepper-bar">
          {[1, 2, 3, 4, 5].map((step) => {
            let cls = "seg";
            if (step < currentStep) cls += " completed";
            else if (step === currentStep) cls += " current";
            return <span key={step} className={cls} />;
          })}
        </div>
      </div>

      {/* Snackbar */}
      {snackbar && <div className="snackbar">{snackbar}</div>}

      {/* Paso 1 */}
      {currentStep === 1 && (
        <form className="cotizacion-form" onSubmit={handleNext}>
          <h4>Datos del Viaje</h4>
          <p className="subtitle">Ingresa la información de tu próximo viaje</p>

          <label>Origen</label>
          <input
            type="text"
            className={errors.origen ? "error" : ""}
            placeholder="Ej: Buenos Aires, Madrid"
            value={origen}
            onChange={(e) => setOrigen(e.target.value)}
          />
          {errors.origen && <p className="error-message">{errors.origen}</p>}

          <label>Destino</label>
          <input
            type="text"
            className={errors.destino ? "error" : ""}
            placeholder="Ej: Ciudad de México, París"
            value={destino}
            onChange={(e) => setDestino(e.target.value)}
          />
          {errors.destino && <p className="error-message">{errors.destino}</p>}

          <div className="date-group">
            <div>
              <label>Inicio</label>
              <input
                type="date"
                className={errors.inicio ? "error" : ""}
                value={inicio}
                onChange={(e) => setInicio(e.target.value)}
              />
              {errors.inicio && <p className="error-message">{errors.inicio}</p>}
            </div>
            <div>
              <label>Fin</label>
              <input
                type="date"
                className={errors.fin ? "error" : ""}
                value={fin}
                onChange={(e) => setFin(e.target.value)}
              />
              {errors.fin && <p className="error-message">{errors.fin}</p>}
            </div>
          </div>

          <label>Número de viajeros</label>
          <div className="traveler-control-full">
            <button type="button" onClick={() => setViajeros(Math.max(1, viajeros - 1))}>−</button>
            <span>{viajeros}</span>
            <button type="button" onClick={() => setViajeros(viajeros + 1)}>+</button>
          </div>
          {errors.viajeros && <p className="error-message">{errors.viajeros}</p>}

          <button type="submit" className="btn-primary-full">Continuar</button>
        </form>
      )}

      {/* Paso 2 */}
      {currentStep === 2 && (
        <form className="cotizacion-form" onSubmit={handleNext}>
          <h4>Información de Viajero</h4>
          <label>DNI</label>
          <input
            type="text"
            className={errors.dni ? "error" : ""}
            value={dni}
            onChange={(e) => setDni(e.target.value)}
          />
          {errors.dni && <p className="error-message">{errors.dni}</p>}

          <label>Nombre</label>
          <input
            type="text"
            className={errors.nombre ? "error" : ""}
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
          {errors.nombre && <p className="error-message">{errors.nombre}</p>}

          <label>Apellido</label>
          <input
            type="text"
            className={errors.apellido ? "error" : ""}
            value={apellido}
            onChange={(e) => setApellido(e.target.value)}
          />
         {errors.coberturas && <p className="error-message">{errors.coberturas}</p>}

            {/* Botones en columna */}
            <button type="submit" className="btn-primary-full">Continuar</button>
            <button type="button" className="btn-secondary-full" onClick={handleBack}>Atrás</button>
        </form>
      )}

        {/* Paso 3 */}
        {currentStep === 3 && (
        <form className="cotizacion-form" onSubmit={handleNext}>
            <h4>Selecciona tu Cobertura</h4>
            {coberturas.map((c) => (
            <div
                key={c.id}
                className={`cobertura-item ${c.seleccionado ? "selected" : ""}`}
                onClick={() => toggleCobertura(c.id)}
            >
                <input type="checkbox" checked={c.seleccionado} readOnly />
                <div className="cobertura-info">
                <strong>{c.nombre}</strong>
                <p>{formatoUSD(c.precio)} / día</p>
                </div>
            </div>
            ))}
            {errors.coberturas && <p className="error-message">{errors.coberturas}</p>}

            {/* Botones en columna */}
            <button type="submit" className="btn-primary-full">Continuar</button>
            <button type="button" className="btn-secondary-full" onClick={handleBack}>Atrás</button>
        </form>
        )}

      {/* Paso 4 */}
      {currentStep === 4 && (
        <form className="cotizacion-form" onSubmit={handleNext}>
          <h4>Objetos Electrónicos</h4>
          <label>Nombre del Objeto</label>
          <input
            type="text"
            value={objNombre}
            onChange={(e) => setObjNombre(e.target.value)}
          />
          <label>Valor (USD)</label>
          <input
            type="number"
            value={objValor}
            onChange={(e) => setObjValor(e.target.value)}
          />
          <button className="btn-add" onClick={agregarObjeto}>+ Agregar Objeto</button>
          {objetos.map((o) => (
            <div key={o.id} className="obj-row">
              <span>{o.nombre}</span>
              <span>{formatoUSD(o.valor)}</span>
              <button type="button" onClick={() => eliminarObjeto(o.id)}>🗑</button>
            </div>
          ))}
          {errors.objetos && <p className="error-message">{errors.objetos}</p>}
          <div className="buttons">
            <button type="submit" className="btn-primary-full">Continuar</button>
            <button type="button" className="btn-secondary" onClick={handleBack}>Atrás</button>
          </div>
        </form>
      )}

      {/* Paso 5 */}
      {currentStep === 5 && (
        <div className="cotizacion-form resumen">
          <div className="summary-hero">
            <div className="hero-icon">✅</div>
            <div className="hero-title">Cotización Total</div>
            <div className="hero-amount">{formatoUSD(totalViaje)}</div>
            <div className="hero-sub">{dias} días · {formatoUSD(totalPorDia)} / día</div>
          </div>
          <div className="section-card">
            <h5>Datos del Viaje</h5>
            <p>{origen} → {destino}</p>
            <p>{inicio} - {fin}</p>
            <p>Viajeros: {viajeros}</p>
          </div>
          <div className="section-card">
            <h5>Coberturas</h5>
            {coberturas.filter(c => c.seleccionado).map(c => (
              <p key={c.id}>{c.nombre}: {formatoUSD(c.precio)}</p>
            ))}
          </div>
          <div className="section-card">
            <h5>Objetos Electrónicos</h5>
            {objetos.map(o => (
              <p key={o.id}>{o.nombre}: {formatoUSD(o.valor)}</p>
            ))}
          </div>
          <div className="buttons">
            <button className="btn-primary-full" onClick={resetForm}>Confirmar Seguro</button>
          </div>
        </div>
      )}
    </div>
  );
};
