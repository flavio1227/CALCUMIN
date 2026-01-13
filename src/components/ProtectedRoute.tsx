import React, { useEffect, useState } from 'react';
import { requireAuthToken, isAuthenticated } from '../utils/authGuard';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

/**
 * Componente que protege rutas usando el helper authGuard
 * Reutilizable para todas las micro apps
 */
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    // Verificar si viene desde SIGEM1.1 (referrer o parámetros en URL)
    const referrer = document.referrer;
    const urlParams = new URLSearchParams(window.location.search);
    const comesFromSigem = referrer.includes('SIGEM1.1') || referrer.includes('sigem') || urlParams.has('fromSigem');
    
    // Si viene desde SIGEM1.1, permitir acceso directamente (SIGEM1.1 ya controla el acceso)
    if (comesFromSigem) {
      setIsAuthenticated(true);
      return;
    }
    
    // Si NO viene desde SIGEM1.1, verificar autenticación con tokens
    if (isAuthenticated()) {
      setIsAuthenticated(true);
    } else {
      // No autenticado, redirigir al login
      requireAuthToken(
        () => {
          setIsAuthenticated(true);
        },
        'https://flavio1227.github.io/Login/'
      );
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
          <p>Redirigiendo...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;
