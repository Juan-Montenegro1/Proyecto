import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import logo from '../assets/logo-fitbody.png';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};
    if (!username) newErrors.username = 'El nombre de usuario es requerido';
    if (!password) newErrors.password = 'La contraseña es requerida';
    else if (password.length < 6) newErrors.password = 'Mínimo 6 caracteres';
    if (!termsAccepted) newErrors.terms = 'Debes aceptar los términos';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setLoading(true);

      try {
        const response = await fetch('http://localhost:8080/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username, password }),
        });

        if (response.ok) {
          const data = await response.json();
          console.log('✔ Login exitoso:', data);

          if (data.token) {
            localStorage.setItem('token', data.token);
          }

          navigate("/Dashboard");

        } else {
          const errData = await response.json();
          setErrors({ general: errData.message || 'Credenciales inválidas' });
        }
      } catch (error) {
        console.error('Error al conectar con el backend:', error);
        setErrors({ general: 'Error de red o del servidor' });
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-black via-[#1a1a1a] to-[#2e2e2e] text-white px-6 text-center">
      <img src={logo} alt="FitBody Logo" className="w-32 mb-6 animate-fade-in" />
      <h2 className="text-white text-2xl font-bold font-[Poppins] mb-8 animate-fade-in">
        Inicia sesión
      </h2>

      <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-5">
        <div>
          <input
            type="text"
            placeholder="Nombre de usuario"
            value={username}
            onChange={(e) => {
              const raw = e.target.value;
              const normalized = raw
                .toLowerCase()
                .normalize('NFD')
                .replace(/[\u0300-\u036f]/g, '') // quitar tildes
                .replace(/\s+/g, ''); // quitar espacios

              setUsername(normalized);
            }}
            className={`w-full px-4 py-3 rounded-lg bg-white text-[#232323] placeholder-gray-500 font-[League Spartan] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#FF7200] ${errors.username && 'border border-red-500'}`}
          />

          {errors.username && <p className="text-red-400 text-sm mt-1">{errors.username}</p>}
        </div>

        <div className="relative">
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={`w-full px-4 py-3 rounded-lg bg-white text-[#232323] placeholder-gray-500 font-[League Spartan] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#FF7200] ${errors.password && 'border border-red-500'}`}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-4 text-[#232323] hover:text-[#FF7200]"
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
          {errors.password && <p className="text-red-400 text-sm mt-1">{errors.password}</p>}
        </div>

        <div className="flex items-start gap-2 text-white text-sm font-[League Spartan]">
          <input
            type="checkbox"
            id="terms"
            checked={termsAccepted}
            onChange={() => setTermsAccepted(!termsAccepted)}
            className="mt-1"
          />
          <label htmlFor="terms">
            Acepto los <Link to="#" className="text-[#FF7200] underline">Términos y Condiciones</Link>
          </label>
        </div>
        {errors.terms && <p className="text-red-400 text-sm -mt-2">{errors.terms}</p>}
        {errors.general && <p className="text-red-500 text-sm">{errors.general}</p>}

        <button
          type="submit"
          className="w-full bg-[#FF7200] text-white py-3 rounded-lg font-bold font-[Poppins] transition-all hover:opacity-90 disabled:opacity-50"
          disabled={loading}
        >
          {loading ? 'Ingresando...' : 'Ingresar'}
        </button>

        <div className="text-center text-sm text-white mt-2">
          <Link to="#" className="hover:underline">¿Olvidaste tu contraseña?</Link>
        </div>
        <div className="text-center text-sm text-white mt-4">
          ¿No tienes cuenta?{' '}
          <Link to="/Registro" className="text-[#FF7200] font-semibold hover:underline">
            Regístrate
          </Link>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
