import React, { useState } from 'react';
import { User, Mail, Lock, Globe, Phone, Eye, EyeOff } from "lucide-react";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    nombre: '',
    apellidos: '',
    pais: '',
    telefono: '',
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false); // 👁 Controla visibilidad

  const validate = () => {
    const newErrors = {};

    const onlyUpperLettersSpaces = /^[A-Z\s]+$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\+?\d{1,13}$/;

    if (!onlyUpperLettersSpaces.test(formData.nombre)) {
      newErrors.nombre = 'Solo letras mayúsculas y espacios.';
    }

    if (!onlyUpperLettersSpaces.test(formData.apellidos)) {
      newErrors.apellidos = 'Solo letras mayúsculas y espacios.';
    }

    if (!onlyUpperLettersSpaces.test(formData.pais)) {
      newErrors.pais = 'Solo letras mayúsculas y espacios.';
    }

    if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Correo inválido.';
    }

    if (!phoneRegex.test(formData.telefono)) {
      newErrors.telefono = 'Solo números y un "+" opcional, máximo 13.';
    }

    if (formData.password.length < 6) {
      newErrors.password = 'Mínimo 6 caracteres.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    let newValue = value;

    if (['nombre', 'apellidos', 'pais'].includes(name)) {
      newValue = value.toUpperCase();
    }

    setFormData({ ...formData, [name]: newValue });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log('Formulario válido:', formData);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Columna izquierda */}
      <div className="w-1/2 hidden md:flex items-center justify-center bg-gradient-to-br from-orange-500 to-orange-600 text-white">
        <div className="text-center space-y-4 px-6">
          <h1 className="text-5xl font-bold font-display">¡Bienvenido de nuevo!</h1>
          <p className="text-lg">Tu camino fitness comienza aquí</p>
        </div>
      </div>

      {/* Columna derecha */}
      <div className="w-full md:w-1/2 flex items-center justify-center bg-white p-8">
        <div className="w-full max-w-md space-y-6">
          <h2 className="text-3xl font-semibold text-gray-800">Crea tu cuenta</h2>
          <p className="text-sm text-gray-500">¡Solo toma unos minutos y es gratis!</p>

          <form className="space-y-4" onSubmit={handleSubmit}>
            {[
              { icon: <User />, name: 'username', type: 'text', placeholder: 'Nombre de usuario *' },
              { icon: <Mail />, name: 'email', type: 'email', placeholder: 'Correo electrónico *' },
              { icon: <User />, name: 'nombre', type: 'text', placeholder: 'Nombre *' },
              { icon: <User />, name: 'apellidos', type: 'text', placeholder: 'Apellidos *' },
              { icon: <Globe />, name: 'pais', type: 'text', placeholder: 'País de residencia *' },
              { icon: <Phone />, name: 'telefono', type: 'tel', placeholder: 'Número telefónico *' },
            ].map((field) => (
              <div className="relative" key={field.name}>
                {React.cloneElement(field.icon, {
                  className: 'absolute left-3 top-2.5 text-gray-400',
                  size: 20,
                })}
                <input
                  name={field.name}
                  type={field.type}
                  placeholder={field.placeholder}
                  value={formData[field.name]}
                  onChange={handleChange}
                  className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
                {errors[field.name] && (
                  <p className="text-red-500 text-xs mt-1">{errors[field.name]}</p>
                )}
              </div>
            ))}

            {/* Contraseña con ícono de mostrar/ocultar */}
            <div className="relative">
              <Lock className="absolute left-3 top-2.5 text-gray-400" size={20} />
              <input
                name="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Contraseña *"
                value={formData.password}
                onChange={handleChange}
                className="pl-10 pr-10 py-2 w-full border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2.5 text-gray-500"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">{errors.password}</p>
              )}
            </div>

            <div className="flex items-center space-x-2">
              <input type="checkbox" className="accent-orange-500" id="terms" required />
              <label htmlFor="terms" className="text-sm text-gray-700">
                Acepto los <span className="font-medium text-orange-500 cursor-pointer">términos y condiciones</span>
              </label>
            </div>

            <button
              type="submit"
              className="w-full py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-md hover:scale-[1.02] transition-transform duration-200"
            >
              Crear mi cuenta
            </button>

            <button
              type="button"
              onClick={() => window.location.href = '/login'}
              className="w-full py-2 mt-2 border border-orange-500 text-orange-500 rounded-md hover:bg-orange-50 transition duration-200"
            >
              Volver al Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
