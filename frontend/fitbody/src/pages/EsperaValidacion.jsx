import React from 'react';

const EsperaValidacion = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-fitdark text-white text-center px-4">
      <div>
        <h2 className="text-2xl font-bold mb-4">Tu cuenta está en validación</h2>
        <p className="text-lg">
          Un administrador debe asignarte un rol para continuar. Te notificaremos cuando estés habilitado.
        </p>
      </div>
    </div>
  );
};

export default EsperaValidacion;
