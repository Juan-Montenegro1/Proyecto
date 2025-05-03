import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../firebase/firebase';

const CheckRole = () => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        navigate('/login');
        return;
      }

      const userRef = doc(db, 'usuarios', user.uid);
      const userSnap = await getDoc(userRef);

      if (!userSnap.exists()) {
        navigate('/register');
        return;
      }

      const data = userSnap.data();
      const rol = data.rol;
      const completado = data.completado;

      if (rol === 'pendiente') {
        navigate('/espera');
      } else if (rol === 'cliente' && !completado) {
        navigate('/cliente/completar');
      } else if (rol === 'entrenador' && !completado) {
        navigate('/entrenador/perfil');
      } else {
        navigate('/dashboard');
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, [navigate]);

  return loading ? <p className="text-center mt-20">Cargando...</p> : null;
};

export default CheckRole;
