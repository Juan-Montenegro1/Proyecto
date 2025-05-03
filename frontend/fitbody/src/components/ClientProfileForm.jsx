import { useState } from 'react';
import { db, auth } from '../firebase/firebase';
import { doc, updateDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const ClientProfileForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    foto: '',
    edad: '',
    peso: '',
    altura: '',
    nivelActividad: '',
    objetivo: '',
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'foto' && files.length > 0) {
      setFormData({ ...formData, [name]: URL.createObjectURL(files[0]) }); // temporal para vista previa
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = auth.currentUser;

    if (user) {
      try {
        const userRef = doc(db, 'usuarios', user.uid);
        await updateDoc(userRef, {
          ...formData,
          perfilCompleto: true,
        });

        navigate('/dashboard');
      } catch (error) {
        console.error('Error al guardar perfil:', error);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto bg-white p-6 rounded-xl shadow">
      <h2 className="text-xl font-bold mb-4 text-center">Completa tu perfil de cliente</h2>

      <label className="block mb-3">
        Foto:
        <input type="file" name="foto" accept="image/*" onChange={handleChange} className="mt-1" />
      </label>

      <label className="block mb-3">
        Edad:
        <input type="number" name="edad" value={formData.edad} onChange={handleChange} className="input" />
      </label>

      <label className="block mb-3">
        Peso (kg):
        <input type="number" name="peso" value={formData.peso} onChange={handleChange} className="input" />
      </label>

      <label className="block mb-3">
        Altura (cm):
        <input type="number" name="altura" value={formData.altura} onChange={handleChange} className="input" />
      </label>

      <label className="block mb-3">
        Nivel de Actividad Física:
        <select name="nivelActividad" value={formData.nivelActividad} onChange={handleChange} className="input">
          <option value="">Seleccione</option>
          <option value="bajo">Bajo</option>
          <option value="medio">Medio</option>
          <option value="alto">Alto</option>
        </select>
      </label>

      <label className="block mb-3">
        Objetivo:
        <select name="objetivo" value={formData.objetivo} onChange={handleChange} className="input">
          <option value="">Seleccione</option>
          <option value="perder peso">Perder Peso</option>
          <option value="ganar masa muscular">Ganar Masa Muscular</option>
          <option value="mantener forma">Mantener forma</option>
        </select>
      </label>

      <button type="submit" className="btn w-full mt-4 bg-fitorange text-white hover:bg-orange-600">
        Guardar perfil
      </button>
    </form>
  );
};

export default ClientProfileForm;
