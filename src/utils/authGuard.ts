// URL de redirección si no está autenticado
const LOGIN_URL = import.meta.env.VITE_LOGIN_URL || '/Login/';
const SHELL_URL = import.meta.env.VITE_SHELL_URL || '/SIGEM1.1/';

// Claves comunes para verificar autenticación en localStorage/sessionStorage
const AUTH_KEYS = [
  'sigem_auth_token',
  'sigem_auth_user',
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
 * Requiere autenticación usando tokens en storage (localStorage/sessionStorage)
 * Útil cuando no hay proveedor de autenticación centralizado
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
    const loginUrl = new URL(redirectTo, window.location.origin);
    loginUrl.searchParams.set('redirect', window.location.href);
    window.location.href = loginUrl.toString();
  }
}

/**
 * Verifica si el usuario está autenticado (sin redirigir)
 * @returns true si está autenticado, false si no
 */
export function isAuthenticated(): boolean {
  // Solo verificar tokens en storage
  return hasAuthToken();
}
