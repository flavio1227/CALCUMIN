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
      {/* Botón SIGEM en la esquina superior izquierda */}
      <a
        href="https://flavio1227.github.io/SIGEM1.1/"
        className="absolute top-4 left-4 px-3 py-2 text-custom-yellow text-sm font-medium border border-custom-yellow rounded hover:bg-custom-yellow hover:text-custom-blue transition-all duration-200"
        title="Ir a SIGEM"
      >
        SIGEM
      </a>
    </header>
  );
}

export default Header;