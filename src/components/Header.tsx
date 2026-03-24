import React from 'react';

const Header: React.FC = () => {
  const logoSrc = `${import.meta.env.BASE_URL}topomin.svg`;

  return (
    <header className="bg-custom-blue text-custom-yellow py-1 relative no-print">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-center">
          {/* Logo con tamaño w-64 h-64 */}
          <div>
            <img 
              src={logoSrc}
              alt="Logo INHGEOMIN" 
              className="w-64 h-64 object-contain"
            />
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;