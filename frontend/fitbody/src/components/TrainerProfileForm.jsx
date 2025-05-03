import { useState } from 'react';
import { db, auth } from '../firebase/firebase';
import { doc, updateDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const TrainerProfileForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    foto: '',
    descripcion: '',
    experiencia: '',
    especialidad: '',
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'foto' && files.length > 0) {
      setFormData({ ...formData, [name]: URL.createObjectURL(files[0]) });
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
        console.error('Error al guardar perfil de entrenador:', error);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto bg-white p-6 rounded-xl shadow">
      <h2 className="text-xl font-bold mb-4 text-center">Completa tu perfil de entrenador</h2>

      <label className="block mb-3">
        Foto:
        <input type="file" name="foto" accept="image/*" onChange={handleChange} className="mt-1" />
      </label>

      <label className="block mb-3">
        Descripción personal:
        <textarea
          name="descripcion"
          value={formData.descripcion}
          onChange={handleChange}
          className="input h-24"
          placeholder="Cuéntanos sobre ti..."
        />
      </label>

      <label className="block mb-3">
        Años de experiencia:
        <input
          type="number"
          name="experiencia"
          value={formData.experiencia}
          onChange={handleChange}
          className="input"
        />
      </label>

      <label className="block mb-3">
        Especialidad:
        <input
          type="text"
          name="especialidad"
          value={formData.especialidad}
          onChange={handleChange}
          className="input"
          placeholder="Ej: Crossfit, Cardio, Musculación"
        />
      </label>

      <button type="submit" className="btn w-full mt-4 bg-fitorange text-white hover:bg-orange-600">
        Guardar perfil
      </button>
    </form>
  );
};

export default TrainerProfileForm;
