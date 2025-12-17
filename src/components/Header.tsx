import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-custom-blue text-custom-yellow py-1">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-center">
          {/* Logo con tamaño w-64 h-64 */}
          <div>
            <img 
              src="/topomin.svg" 
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