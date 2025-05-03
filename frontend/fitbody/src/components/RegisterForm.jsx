import React, { useState } from 'react';
import { Mail, Lock, User } from 'lucide-react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { collection, doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../firebase/firebase';

const RegisterForm = () => {
  const [form, setForm] = useState({
    nombre: '',
    email: '',
    password: '',
    genero: '',
    telefono: '',
    ciudad: '',
    pais: '',
  });

  const [aceptaTerminos, setAceptaTerminos] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!aceptaTerminos) {
      setError('Debes aceptar los términos y condiciones.');
      return;
    }

    setError('');
    setLoading(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, form.email, form.password);
      const user = userCredential.user;

      const userDoc = {
        uid: user.uid,
        ...form,
        rol: 'pendiente',
        completado: false,
        creado: new Date().toISOString(),
      };

      await setDoc(doc(collection(db, 'usuarios'), user.uid), userDoc);

      alert('Usuario registrado con éxito. Espera validación del administrador.');

      setForm({
        nombre: '',
        email: '',
        password: '',
        genero: '',
        telefono: '',
        ciudad: '',
        pais: '',
      });
      setAceptaTerminos(false);
    } catch (err) {
      console.error(err);
      setError('Error al registrar usuario: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen bg-gradient-to-r from-blue-900 to-blue-800 text-white">
      {/* Columna izquierda */}
      <div className="w-1/2 flex items-center justify-center">
        <h1 className="text-5xl font-bold">Bienvenido a FitBody</h1>
      </div>

      {/* Columna derecha */}
      <div className="w-1/2 bg-white rounded-l-3xl flex items-center justify-center p-10">
        <form onSubmit={handleSubmit} className="w-full max-w-md space-y-5 text-black">
          <h2 className="text-3xl font-bold mb-2">Crear cuenta</h2>
          <p className="text-gray-500 mb-4">¡Es gratis y solo toma unos minutos!</p>

          {error && <p className="text-red-600">{error}</p>}

          <div className="relative">
            <User className="absolute left-3 top-3.5 text-gray-500" />
            <input
              type="text"
              name="nombre"
              value={form.nombre}
              onChange={handleChange}
              placeholder="Nombre completo"
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <div className="relative">
            <Mail className="absolute left-3 top-3.5 text-gray-500" />
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Correo electrónico"
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-3 top-3.5 text-gray-500" />
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Contraseña"
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <select
            name="genero"
            value={form.genero}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          >
            <option value="">Selecciona tu género</option>
            <option value="Masculino">Masculino</option>
            <option value="Femenino">Femenino</option>
            <option value="Otro">Otro</option>
          </select>

          <input
            type="tel"
            name="telefono"
            value={form.telefono}
            onChange={handleChange}
            placeholder="Número telefónico"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />

          <input
            type="text"
            name="ciudad"
            value={form.ciudad}
            onChange={handleChange}
            placeholder="Ciudad"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />

          <input
            type="text"
            name="pais"
            value={form.pais}
            onChange={handleChange}
            placeholder="País"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />

          <label className="flex items-center space-x-2 text-sm">
            <input
              type="checkbox"
              checked={aceptaTerminos}
              onChange={(e) => setAceptaTerminos(e.target.checked)}
              className="accent-blue-600"
            />
            <span>Acepto los <strong>términos y condiciones</strong>.</span>
          </label>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 font-semibold text-white bg-gradient-to-r from-blue-600 to-blue-400 rounded-xl hover:opacity-90 transition duration-300"
          >
            {loading ? 'Registrando...' : 'Crear mi cuenta'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
