import React, { useEffect, useState } from 'react';
import { requireAuthToken, isAuthenticated as checkAuth } from '../utils/authGuard';

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
    if (checkAuth()) {
      setIsAuthenticated(true);
    } else {
      // No autenticado, redirigir al login
      requireAuthToken(
        () => {
          setIsAuthenticated(true);
        },
        import.meta.env.VITE_LOGIN_URL || '/Login/'
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
