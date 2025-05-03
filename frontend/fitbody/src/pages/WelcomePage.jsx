import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo-fitbody.png';

const WelcomePage = () => {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate('/login');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-black via-[#1a1a1a] to-[#2e2e2e] text-white px-6 text-center">
      <img
        src={logo}
        alt="FitBody Logo"
        className="w-56 h-32 mb-8 animate__animated animate__bounce"
      />

      <h1 className="text-4xl sm:text-5xl font-bold mb-4 text-orange-500">
        ¡Bienvenido a FitBody!
      </h1>

      <p className="text-base sm:text-lg text-gray-300 mb-10 max-w-xl">
        Tu compañero ideal para alcanzar tus metas fitness. Monitorea tu progreso, mejora tu alimentación y entrena con inteligencia.
      </p>

      <button
        onClick={handleStart}
        className="bg-orange-500 hover:bg-orange-600 text-white text-lg font-semibold py-3 px-8 rounded-2xl shadow-lg transition duration-300"
      >
        Empezar
      </button>
    </div>
  );
};

export default WelcomePage;
