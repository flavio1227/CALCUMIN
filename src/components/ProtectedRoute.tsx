import React, { useEffect, useState } from 'react';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const LOGIN_URL = 'https://flavio1227.github.io/Login/';
// Claves comunes que SIGEM1.1 podría usar para almacenar la autenticación
const AUTH_KEYS = [
  'auth_token',
  'authToken',
  'isAuthenticated',
  'userToken',
  'sessionToken',
  'token',
  'authenticated'
];

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAuthentication = () => {
      // Primero verificar si viene de un redirect del login (parámetros en URL)
      const urlParams = new URLSearchParams(window.location.search);
      const authToken = urlParams.get('token');
      const authSuccess = urlParams.get('auth') === 'success';

      if (authToken || authSuccess) {
        // Guardar token si viene del login
        if (authToken) {
          localStorage.setItem('auth_token', authToken);
        } else if (authSuccess) {
          localStorage.setItem('auth_token', 'authenticated');
        }
        
        // Limpiar parámetros de la URL
        const cleanUrl = window.location.origin + window.location.pathname;
        window.history.replaceState({}, '', cleanUrl);
        
        setIsAuthenticated(true);
        return;
      }

      // Verificar si hay algún token de autenticación en localStorage (compartido con SIGEM1.1)
      let hasAuth = false;
      
      // Verificar las claves comunes
      for (const key of AUTH_KEYS) {
        const value = localStorage.getItem(key);
        if (value !== null && value !== '' && value !== 'false' && value !== 'null') {
          hasAuth = true;
          break;
        }
      }
      
      // También verificar sessionStorage
      if (!hasAuth) {
        for (const key of AUTH_KEYS) {
          const value = sessionStorage.getItem(key);
          if (value !== null && value !== '' && value !== 'false' && value !== 'null') {
            hasAuth = true;
            break;
          }
        }
      }
      
      if (hasAuth) {
        setIsAuthenticated(true);
      } else {
        // Guardar la URL actual para redirigir después del login
        sessionStorage.setItem('redirectAfterLogin', window.location.href);
        // Redirigir al login
        window.location.href = LOGIN_URL;
      }
    };

    checkAuthentication();
    
    // Verificar periódicamente por si el token se actualiza
    const interval = setInterval(checkAuthentication, 2000);
    
    return () => clearInterval(interval);
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
