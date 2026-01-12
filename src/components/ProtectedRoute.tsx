import React, { useEffect, useState } from 'react';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const LOGIN_URL = 'https://flavio1227.github.io/Login/';
const AUTH_TOKEN_KEY = 'auth_token';

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    // Primero verificar si viene de un redirect del login (parámetros en URL)
    const urlParams = new URLSearchParams(window.location.search);
    const authToken = urlParams.get('token');
    const authSuccess = urlParams.get('auth') === 'success';

    if (authToken || authSuccess) {
      // Guardar token si viene del login
      if (authToken) {
        localStorage.setItem(AUTH_TOKEN_KEY, authToken);
      } else if (authSuccess) {
        localStorage.setItem(AUTH_TOKEN_KEY, 'authenticated');
      }
      
      // Limpiar parámetros de la URL
      const cleanUrl = window.location.origin + window.location.pathname;
      window.history.replaceState({}, '', cleanUrl);
      
      setIsAuthenticated(true);
      return;
    }

    // Si no viene del login, verificar si hay token en localStorage
    const token = localStorage.getItem(AUTH_TOKEN_KEY);
    const hasAuth = token !== null && token !== '';
    
    if (hasAuth) {
      setIsAuthenticated(true);
    } else {
      // Guardar la URL actual para redirigir después del login
      sessionStorage.setItem('redirectAfterLogin', window.location.href);
      // Redirigir al login externo
      window.location.href = LOGIN_URL;
    }
  }, []);

  // Mostrar carga mientras verifica
  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen bg-custom-blue flex items-center justify-center">
        <div className="text-custom-yellow text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-custom-yellow mx-auto mb-4"></div>
          <p>Verificando autenticación...</p>
        </div>
      </div>
    );
  }

  // Si no está autenticado, mostrar mensaje (ya se redirigió)
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-custom-blue flex items-center justify-center">
        <div className="text-custom-yellow text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-custom-yellow mx-auto mb-4"></div>
          <p>Redirigiendo al login...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;
