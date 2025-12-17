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

### Notas importantes

- El `base` de Vite está configurado como `./` para que funcione correctamente tanto en servidores como en GitHub Pages.
- El favicon (`vite.svg`) usa una ruta **relativa**, por lo que también funciona correctamente dentro de GitHub Pages.


