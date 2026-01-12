## Calculadora INHGEOMIN – Vite + React + TypeScript

Proyecto frontend creado con Vite, React y TypeScript.

Está preparado para funcionar directamente al subirlo a un repositorio de GitHub y publicarlo con **GitHub Pages** usando la carpeta `docs` como salida de compilación.

### Requisitos

- **Node.js** 18 o superior
- **npm** (incluido con Node)

### Cómo ejecutar el proyecto en local

1. Clona el repositorio en tu máquina:

   ```bash
   git clone https://github.com/TU_USUARIO/TU_REPOSITORIO.git
   cd TU_REPOSITORIO
   ```

2. Instala las dependencias:

   ```bash
   npm install
   ```

3. Inicia el servidor de desarrollo:

   ```bash
   npm run dev
   ```

   Luego abre en el navegador la URL que te muestre la consola (por defecto `http://localhost:5173`).

### Cómo preparar la app para GitHub Pages

Este proyecto ya está configurado para que Vite genere los archivos estáticos en la carpeta `docs` (ver `vite.config.ts`).

1. Genera la compilación de producción:

   ```bash
   npm run build
   ```

   Esto creará/actualizará la carpeta `docs` con los archivos listos para publicar.

2. Sube los cambios a GitHub:

   ```bash
   git add .
   git commit -m "Build para GitHub Pages"
   git push
   ```

3. En GitHub, ve a:

   - **Settings** → **Pages**
   - En **Source**, elige:
     - Branch: `main` (o la rama que uses)
     - Folder: `/docs`
   - Guarda los cambios.

Después de unos minutos, tu sitio estará disponible en la URL que indique GitHub Pages.

### Configuración de Firebase Authentication

Este proyecto requiere autenticación con Firebase. Para configurarlo:

1. Crea un proyecto en [Firebase Console](https://console.firebase.google.com/)

2. Habilita **Authentication** en Firebase Console y configura los métodos de autenticación que necesites (Email/Password, Google, etc.)

3. Obtén las credenciales de tu proyecto Firebase (Configuración del proyecto → Configuración general → Tus aplicaciones)

4. Crea un archivo `.env` en la raíz del proyecto (copia de `.env.example`):

   ```bash
   cp .env.example .env
   ```

5. Actualiza el archivo `.env` con tus credenciales de Firebase:

   ```
   VITE_FIREBASE_API_KEY=tu-api-key
   VITE_FIREBASE_AUTH_DOMAIN=tu-proyecto.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=tu-proyecto-id
   VITE_FIREBASE_STORAGE_BUCKET=tu-proyecto.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
   VITE_FIREBASE_APP_ID=tu-app-id
   ```

6. **Nota sobre el login externo**: Este proyecto está configurado para redirigir a `https://flavio1227.github.io/Login/` si el usuario no está autenticado. Para que funcione correctamente, el sistema de login externo debe:

   - Usar Firebase Authentication
   - Después del login exitoso, redirigir de vuelta a esta aplicación con las credenciales de Firebase
   - O compartir la sesión de Firebase entre dominios (requiere configuración adicional)

### Notas importantes

- El `base` de Vite está configurado como `./` para que funcione correctamente tanto en servidores como en GitHub Pages.
- El favicon (`vite.svg`) usa una ruta **relativa**, por lo que también funciona correctamente dentro de GitHub Pages.
- **Seguridad**: El archivo `.env` NO se sube a GitHub (está en `.gitignore`). Para producción, configura las variables de entorno en tu plataforma de despliegue.





