import { getAuth, onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '../config/firebase';

// URL de redirección si no está autenticado
const LOGIN_URL = 'https://flavio1227.github.io/Login/';
const SHELL_URL = 'https://flavio1227.github.io/SIGEM1.1/';

// Claves comunes para verificar autenticación en localStorage/sessionStorage
const AUTH_KEYS = [
  'auth_token',
  'authToken',
  'isAuthenticated',
  'userToken',
  'sessionToken',
  'token',
  'authenticated',
  'user',
  'login'
];

/**
 * Verifica si hay un token de autenticación en localStorage o sessionStorage
 */
function hasAuthToken(): boolean {
  // Verificar localStorage
  for (const key of AUTH_KEYS) {
    const value = localStorage.getItem(key);
    if (value !== null && value !== '' && value !== 'false' && value !== 'null') {
      return true;
    }
  }

  // Verificar sessionStorage
  for (const key of AUTH_KEYS) {
    const value = sessionStorage.getItem(key);
    if (value !== null && value !== '' && value !== 'false' && value !== 'null') {
      return true;
    }
  }

  return false;
}

/**
 * Requiere autenticación usando Firebase Auth
 * @param callback Función a ejecutar si el usuario está autenticado
 * @param redirectTo URL a donde redirigir si no está autenticado (default: LOGIN_URL)
 */
export function requireAuth(
  callback: (user: User | null) => void,
  redirectTo: string = LOGIN_URL
): void {
  try {
    const authInstance = getAuth();
    
    onAuthStateChanged(authInstance, (user) => {
      if (!user) {
        // Si no hay usuario en Firebase, verificar tokens en storage
        if (hasAuthToken()) {
          callback(null);
          return;
        }
        // Redirigir al login
        window.location.href = redirectTo;
      } else {
        callback(user);
      }
    });
  } catch (error) {
    console.error('Error en Firebase Auth:', error);
    // Fallback: verificar tokens en storage
    if (hasAuthToken()) {
      callback(null);
    } else {
      window.location.href = redirectTo;
    }
  }
}

/**
 * Requiere autenticación usando tokens en storage (localStorage/sessionStorage)
 * Útil cuando no se usa Firebase Auth directamente
 * @param callback Función a ejecutar si el usuario está autenticado
 * @param redirectTo URL a donde redirigir si no está autenticado (default: SHELL_URL)
 */
export function requireAuthToken(
  callback: () => void,
  redirectTo: string = SHELL_URL
): void {
  if (hasAuthToken()) {
    callback();
  } else {
    // Guardar URL actual para redirigir después del login
    sessionStorage.setItem('redirectAfterLogin', window.location.href);
    window.location.href = redirectTo;
  }
}

/**
 * Verifica si el usuario está autenticado (sin redirigir)
 * @returns true si está autenticado, false si no
 */
export function isAuthenticated(): boolean {
  try {
    const authInstance = getAuth();
    const user = authInstance.currentUser;
    if (user) {
      return true;
    }
  } catch (error) {
    // Ignorar errores de Firebase
  }
  
  return hasAuthToken();
}

/**
 * Obtiene el usuario actual (si está disponible)
 */
export function getCurrentUser(): User | null {
  try {
    const authInstance = getAuth();
    return authInstance.currentUser;
  } catch (error) {
    return null;
  }
}
