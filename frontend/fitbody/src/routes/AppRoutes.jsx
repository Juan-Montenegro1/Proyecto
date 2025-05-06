import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import WelcomePage from '../pages/WelcomePage';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import CompleteClientProfile from '../pages/CompleteClientProfile';
import CompleteTrainerProfile from '../pages/CompleteTrainerProfile';
import Dashboard from '../pages/Dashboard';
import useAuthUser from '../hooks/useAuthUser';

const AppRoutes = () => {
  const { userData, loading } = useAuthUser();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg font-semibold">Cargando...</p>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        {/* No autenticado */}
        {!userData && (
          <>
            <Route path="/" element={<WelcomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/registro" element={<RegisterPage />} />
            <Route path="/Dashboard" element={<Dashboard />} />
            <Route path="*" element={<Navigate to="/" />} />
          </>
        )}

        {/* Usuario con rol pendiente */}
        {userData && userData.rol === 'pendiente' && (
          <Route
            path="*"
            element={
              <div className="text-center mt-20">
                Tu cuenta está en revisión por el administrador.
              </div>
            }
          />
        )}

        {/* Usuario Cliente sin completar perfil */}
        {userData && userData.rol === 'cliente' && !userData.perfilCompleto && (
          <>
            <Route path="/completar-cliente" element={<CompleteClientProfile />} />
            <Route path="*" element={<Navigate to="/completar-cliente" />} />
          </>
        )}

        {/* Usuario Entrenador sin completar perfil */}
        {userData && userData.rol === 'entrenador' && !userData.perfilCompleto && (
          <>
            <Route path="/completar-entrenador" element={<CompleteTrainerProfile />} />
            <Route path="*" element={<Navigate to="/completar-entrenador" />} />
          </>
        )}

        {/* Usuario con perfil completo */}
        {userData && userData.perfilCompleto && (
          <>
            <Route path="/dashboard" element={<Dashboard user={userData} />} />
            <Route path="*" element={<Navigate to="/dashboard" />} />
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
