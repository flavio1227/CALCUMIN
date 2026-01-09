import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-custom-blue text-custom-yellow py-1 relative">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-center">
          {/* Logo con tamaño w-64 h-64 */}
          <div>
            <img 
              src="./topomin.svg" 
              alt="Logo INHGEOMIN" 
              className="w-64 h-64 object-contain"
            />
          </div>
        </div>
      </div>
      {/* Botón discreto en la esquina superior izquierda */}
      <a
        href="https://flavio1227.github.io/SIGEM1.1/"
        target="_blank"
        rel="noopener noreferrer"
        className="absolute top-2 left-2 text-custom-yellow text-xs opacity-50 hover:opacity-100 transition-opacity duration-200 hover:underline"
        title="Ir a SIGEM"
      >
        SIGEM
      </a>
    </header>
  );
}

export default Header;