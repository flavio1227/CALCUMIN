import React from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

interface Option {
  value: string;
  label: string;
}

interface FormFieldProps {
  label: string;
  name: string;
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  description?: string;
  required?: boolean;
}

const FormField: React.FC<FormFieldProps> = ({ 
  label, 
  name, 
  options, 
  value, 
  onChange,
  disabled = false,
  description,
  required = true
}) => {
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const newValue = e.target.value;
    console.log(`FormField ${name} changed to:`, newValue); // Debug log for cPanel
    
    // Add small delay to ensure proper state update in cPanel environment
    setTimeout(() => {
      onChange(newValue);
    }, 10);
  };

  const handleSelectClick = (e: React.MouseEvent<HTMLSelectElement>) => {
    e.stopPropagation();
    console.log(`FormField ${name} clicked`); // Debug log for cPanel
  };

  const handleSelectFocus = (e: React.FocusEvent<HTMLSelectElement>) => {
    e.stopPropagation();
    console.log(`FormField ${name} focused`); // Debug log for cPanel
  };

  return (
    <div className="form-group relative">
      <div className="flex items-center justify-between mb-2">
        <label 
          htmlFor={name} 
          className="block text-sm font-medium text-custom-yellow"
        >
          {label} {required && <span className="text-red-500">*</span>}
        </label>
        {description && (
          <div className="group relative">
            <HelpCircle className="h-4 w-4 text-custom-yellow cursor-help" />
            <div className="absolute right-0 w-64 p-2 mt-2 text-sm bg-white text-gray-800 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
              {description}
            </div>
          </div>
        )}
      </div>
      <div className="relative">
        <select
          id={name}
          name={name}
          value={value}
          onChange={handleSelectChange}
          onClick={handleSelectClick}
          onFocus={handleSelectFocus}
          disabled={disabled}
          className={`block w-full rounded-md border border-custom-yellow bg-custom-blue py-2.5 pl-3 pr-10 text-custom-yellow shadow-sm focus:border-custom-yellow focus:outline-none focus:ring-1 focus:ring-custom-yellow transition-all duration-200 appearance-none ${
            disabled ? 'opacity-50 cursor-not-allowed' : 'hover:border-opacity-80 cursor-pointer'
          }`}
          required={required}
          style={{
            WebkitAppearance: 'none',
            MozAppearance: 'none',
            appearance: 'none'
          }}
        >
          <option value="">Seleccione una opción</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-custom-yellow">
          <ChevronDown className="h-5 w-5" />
        </div>
      </div>
      {disabled && (
        <p className="mt-1 text-sm text-custom-yellow opacity-75">
          Este campo no aplica para el tipo de actividad seleccionada
        </p>
      )}
    </div>
  );
};

export default FormField;