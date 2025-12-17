import React, { useState, useEffect, useCallback } from 'react';
import FormField from './FormField';
import { Printer, ExternalLink } from 'lucide-react';
import QRCode from 'qrcode.react';
import { 
  materialOptions,
  activityOptions,
  hectaresOptions,
  productionOptionsMetallic,
  productionOptionsNonMetallic,
  productionOptionsOroPlacer,
  productionOptionsPreciousStones,
  extractionOptions,
  extractionZoneOptions,
  requirementLinks,
  documentRequirements,
  activityDescriptions
} from '../utils/constants';

const MiningCalculator: React.FC = () => {
  const [formData, setFormData] = useState({
    extractionZone: '',
    material: '',
    activity: '',
    hectares: '',
    production: '',
    extraction: ''
  });
  const [showResult, setShowResult] = useState(false);
  const [validationError, setValidationError] = useState('');

  const handleChange = useCallback((name: string, value: string) => {
    console.log(`Changing ${name} to ${value}`); // Debug log for cPanel
    setShowResult(false);
    setValidationError(''); // Clear validation error when user makes changes
    
    setFormData(prev => {
      const newData = { ...prev, [name]: value };
      
      // Handle activity changes
      if (name === 'activity') {
        if (value === 'comercializacion' || value === 'procesamiento' || value === 'desazolvamiento' || value === 'banco_materiales') {
          newData.extractionZone = '';
          newData.hectares = '';
          newData.production = '';
          newData.extraction = '';
          if (value === 'desazolvamiento') {
            newData.material = '';
          }
          if (value === 'banco_materiales') {
            newData.material = 'no_metalicos';
          }
        }
      }
      
      // Handle material changes
      if (name === 'material' && value === 'oro_placer') {
        newData.activity = 'extraccion';
        newData.extractionZone = '';
        newData.hectares = '';
        newData.production = '';
        newData.extraction = '';
      }
      
      // Handle oro placer production changes
      if (name === 'production' && prev.material === 'oro_placer') {
        if (value === 'individual_10m3') {
          newData.extraction = 'artesanal';
        } else if (value === 'grupo_30m3') {
          newData.extraction = 'artesanal'; // Changed from 'pequena_mineria' to 'artesanal'
        }
      }
      
      // Handle piedras preciosas production changes
      if (name === 'production' && prev.material === 'piedras_preciosas' && value === 'mas_10m3') {
        newData.extraction = 'automatizado';
      }
      
      // Handle extraction zone changes
      if (name === 'extractionZone') {
        if (value === 'aluviales' && prev.activity === 'extraccion') {
          newData.hectares = 'hasta_10';
        } else if (value === 'plataforma_maritima' && prev.activity === 'extraccion') {
          newData.hectares = 'hasta_10000';
          newData.production = prev.material === 'metalicos' ? 'mas_200t' : 'mas_100m3';
          newData.extraction = 'automatizado';
        } else if (prev.activity === 'prospeccion') {
          if (value === 'plataforma_maritima') {
            newData.hectares = 'hasta_10000';
          } else if (value === 'aluviales' || value === 'cerros_canteras') {
            newData.hectares = 'hasta_1000';
          }
        }
      }
      
      console.log('New form data:', newData); // Debug log for cPanel
      return newData;
    });
  }, []);

  const isMetallic = formData.material === 'metalicos';
  const isNonMetallic = formData.material === 'no_metalicos';
  const isOroPlacer = formData.material === 'oro_placer';
  const isPiedrasPreciosas = formData.material === 'piedras_preciosas';
  const isMaritimePlatform = formData.extractionZone === 'plataforma_maritima';
  const isAluvial = formData.extractionZone === 'aluviales';
  const isCerrosYCanteras = formData.extractionZone === 'cerros_canteras';
  const isComercializacion = formData.activity === 'comercializacion';
  const isProcesamiento = formData.activity === 'procesamiento';
  const isDesazolvamiento = formData.activity === 'desazolvamiento';
  const isBancoMateriales = formData.activity === 'banco_materiales';
  const isProspeccion = formData.activity === 'prospeccion';
  const isExtraccion = formData.activity === 'extraccion';
  const isSpecialActivity = isComercializacion || isProcesamiento || isDesazolvamiento || isBancoMateriales;
  const isAutomatizado = formData.extraction === 'automatizado';
  const isManualBasico = formData.extraction === 'artesanal';
  const isMecanizado = formData.extraction === 'pequena_mineria';
  const isHighProduction = isMetallic ? formData.production === 'mas_200t' : formData.production === 'mas_100m3';
  const isLowProduction = isMetallic ? formData.production === 'menos_200t' : formData.production === 'hasta_100m3';
  const isAluvialLowProduction = isAluvial && isMetallic && formData.production === 'menos_200t';

  // Handle automatic updates based on form state
  useEffect(() => {
    if (formData.hectares === 'menos_400' && isExtraccion) {
      setFormData(prev => ({
        ...prev,
        extraction: 'automatizado',
        production: isMetallic ? 'mas_200t' : 'mas_100m3'
      }));
    }
  }, [formData.hectares, isExtraccion, isMetallic]);

  useEffect(() => {
    if (formData.hectares === 'hasta_100' && isExtraccion && !isPiedrasPreciosas) {
      setFormData(prev => ({
        ...prev,
        production: isMetallic ? 'menos_200t' : 'hasta_100m3',
        ...(prev.extraction === 'automatizado' && { extraction: '' })
      }));
    } else if (formData.hectares === 'hasta_100' && isExtraccion && isPiedrasPreciosas) {
      setFormData(prev => ({
        ...prev,
        production: 'hasta_10m3',
        ...(prev.extraction === 'automatizado' && { extraction: '' })
      }));
    }
  }, [formData.hectares, isExtraccion, isMetallic, isPiedrasPreciosas]);

  useEffect(() => {
    if (isPiedrasPreciosas && formData.production === 'mas_10m3') {
      setFormData(prev => ({
        ...prev,
        extraction: 'automatizado'
      }));
    }
  }, [isPiedrasPreciosas, formData.production]);

  useEffect(() => {
    if (isNonMetallic && isAluvial && formData.production === 'hasta_10m3' && formData.extraction !== 'artesanal') {
      setFormData(prev => ({
        ...prev,
        extraction: 'artesanal'
      }));
    }
  }, [isNonMetallic, isAluvial, formData.production, formData.extraction]);

  useEffect(() => {
    if (isAluvial && isHighProduction && formData.extraction !== 'automatizado') {
      setFormData(prev => ({
        ...prev,
        extraction: 'automatizado'
      }));
    }
  }, [isAluvial, isHighProduction, formData.extraction]);

  const getProductionOptions = () => {
    if (isOroPlacer) {
      return productionOptionsOroPlacer;
    } else if (isPiedrasPreciosas) {
      if (formData.hectares === 'hasta_100') {
        return productionOptionsPreciousStones.filter(option => option.value === 'hasta_10m3');
      }
      return productionOptionsPreciousStones;
    } else if (isNonMetallic || isMetallic) {
      if (isNonMetallic && isAluvial) {
        return productionOptionsNonMetallic.filter(option => 
          ['hasta_10m3', 'hasta_100m3', 'mas_100m3'].includes(option.value)
        );
      }
      // NUEVO: Filtro específico para No Metálicos en Cerros y Canteras con 100-1000 hectáreas
      if (isNonMetallic && isCerrosYCanteras && formData.hectares === 'menos_400') {
        return productionOptionsNonMetallic.filter(option => 
          ['hasta_100m3', 'mas_100m3'].includes(option.value)
        );
      }
      if (formData.hectares === 'hasta_100') {
        return isMetallic ? 
          productionOptionsMetallic.filter(option => option.value === 'menos_200t') :
          productionOptionsNonMetallic.filter(option => option.value === 'hasta_100m3');
      }
      return isMetallic ? productionOptionsMetallic : productionOptionsNonMetallic;
    }
    return [];
  };

  const getHectaresOptions = () => {
    if (isProspeccion) {
      if (isMaritimePlatform) {
        return hectaresOptions.filter(option => option.value === 'hasta_10000');
      }
      if (isAluvial || isCerrosYCanteras) {
        return hectaresOptions.filter(option => option.value === 'hasta_1000');
      }
      return hectaresOptions;
    }
    if (isMaritimePlatform && isExtraccion) {
      return hectaresOptions.filter(option => option.value === 'hasta_10000');
    }
    if (isAluvial && isExtraccion) {
      return hectaresOptions.filter(option => option.value === 'hasta_10');
    }
    if (isCerrosYCanteras && isExtraccion) {
      return hectaresOptions.filter(option => 
        ['hasta_100', 'menos_400'].includes(option.value)
      );
    }
    return hectaresOptions.filter(option => 
      !['hasta_1000', 'hasta_10000', 'hasta_10'].includes(option.value)
    );
  };

  const getExtractionOptions = () => {
    if (isNonMetallic && isExtraccion && isAluvial && formData.production === 'hasta_10m3') {
      return extractionOptions.filter(option => option.value === 'artesanal');
    }
    if ((isPiedrasPreciosas && isAluvial && formData.production === 'hasta_10m3') ||
        (isNonMetallic && isAluvial && formData.production === 'hasta_10m3')) {
      return extractionOptions.filter(option => 
        ['artesanal', 'pequena_mineria'].includes(option.value)
      );
    }
    if (formData.hectares === 'hasta_100') {
      return extractionOptions.filter(option => 
        ['artesanal', 'pequena_mineria'].includes(option.value)
      );
    }
    if (isAluvial && isHighProduction) {
      return extractionOptions.filter(option => option.value === 'automatizado');
    }
    if (isAluvial && isLowProduction) {
      return extractionOptions.filter(option => 
        ['artesanal', 'pequena_mineria'].includes(option.value)
      );
    }
    return extractionOptions;
  };

  const validateForm = () => {
    const requiredFields = [];
    
    // Always required
    if (!formData.activity) {
      requiredFields.push('Tipo de actividad');
    }
    
    // Material required except for desazolvamiento
    if (!formData.material && !isDesazolvamiento) {
      requiredFields.push('Sustancia de interés');
    }
    
    // Fields not required for special activities
    if (!isSpecialActivity) {
      if (!formData.extractionZone && !isOroPlacer) {
        requiredFields.push('Tipo de depósito mineral');
      }
      
      if (!formData.hectares && !isMaritimePlatform && !isAluvial && !isOroPlacer && !isProspeccion) {
        requiredFields.push('Hectáreas requeridas');
      }
      
      if (!formData.production && !isProspeccion && !isMaritimePlatform && !(isPiedrasPreciosas && formData.hectares === 'hasta_100')) {
        requiredFields.push('Capacidad de producción diaria');
      }
      
      if (!formData.extraction && !isOroPlacer && !isProspeccion && !isMaritimePlatform && 
          !(isPiedrasPreciosas && formData.production === 'mas_10m3') && 
          formData.hectares !== 'menos_400' && formData.production !== 'mas_10m3' && 
          !(isAluvial && isHighProduction)) {
        requiredFields.push('Método de extracción');
      }
    }
    
    return requiredFields;
  };

  const handlePrint = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      // Add delay for better compatibility with cPanel servers
      setTimeout(() => {
        if (window.print) {
          window.print();
        } else {
          console.error('Print function not available');
        }
      }, 100);
    } catch (error) {
      console.error('Print error:', error);
      alert('Error al imprimir. Por favor, use Ctrl+P para imprimir.');
    }
  }, []);

  const getGrantType = () => {
    if (isProspeccion) {
      return "Concesiones Mineras de Exploración";
    }
    if (isManualBasico && (isMetallic || isNonMetallic || isPiedrasPreciosas)) {
      return "Permiso de Minería Artesanal";
    }
    if (isMaritimePlatform) {
      return "Concesión Minera de Explotación";
    } else if (isDesazolvamiento) {
      return "Proyectos de Desazolvamientos";
    } else if (isComercializacion) {
      return "Comercializador de Materiales";
    } else if (isBancoMateriales) {
      return "Banco de Materiales";
    } else if (isOroPlacer && formData.production === 'individual_10m3') {
      return "Permiso de Minería Artesanal de Oro de Placer";
    } else if (isOroPlacer && formData.production === 'grupo_30m3') {
      return "Permiso de Minería Artesanal de Oro de Placer"; // Changed from "Permiso de Pequeña Minería de Oro de Placer"
    } else if (isNonMetallic && formData.production === 'hasta_10m3') {
      return "Registro de Extracción y Comercialización de Minerales No Metálicos";
    } else if (formData.activity === 'procesamiento') {
      return "Concesión Minera de Beneficio";
    } else if (isExtraccion && isCerrosYCanteras) {
      if (formData.hectares === 'hasta_100') {
        if (isNonMetallic) {
          return "Pequeña Minería No Metálica";
        }
        return "Permisos de Pequeña Minería";
      } else if (formData.hectares === 'menos_400') {
        return "Concesión Minera de Explotación";
      }
    } else if (isAutomatizado) {
      return "Concesión Minera de Explotación";
    } else if (isMecanizado) {
      if (isNonMetallic && isAluvial) {
        return "Pequeña Minería No Metálica";
      }
      return "Permisos de Pequeña Minería";
    }
    return "Concesión Minera";
  };

  const getTramiteLocation = () => {
    const grantType = getGrantType();
    
    if (grantType === "Permiso de Minería Artesanal" || 
        grantType === "Permiso de Minería Artesanal de Oro de Placer" ||
        grantType === "Pequeña Minería No Metálica") {
      return "municipalidades";
    }
    
    return "inhgeomin";
  };

  const getSmallMiningDescription = () => {
    if (getGrantType() === "Permisos de Pequeña Minería") {
      return "Pequeña Minería metálica con una capacidad máxima de producción de hasta doscientas (200) toneladas de broza al día y para Pequeña Minería de gemas o piedras preciosas con una capacidad máxima de explotación de hasta diez (10) metros cúbicos diarios";
    } else if (getGrantType() === "Pequeña Minería No Metálica") {
      return "Adjudicar un área máxima de cien (100) hectáreas para Pequeña Minería No Metálica, que se encuentre libre de derechos mineros y zonas excluidas para realizar actividades mineras. El otorgamiento de los Permiso de Pequeña Minería No Metálica es atribución exclusiva de las Municipalidades, únicamente dentro de las áreas adjudicadas por el INHGEOMIN, para cada municipio";
    }
    return null;
  };

  const getExplorationDescription = () => {
    if (getGrantType() === "Concesiones Mineras de Exploración") {
      return "🔹 1. Para este tramite se debe otorgar una concesión.\n🔹 2. Las concesiones solo pueden ser otorgadas por INHGEOMIN.\n\n🔍 Se puede otorgar una concesión metálica, no metálica, de gemas o piedras preciosas para realizar actividades de exploración en las siguientes extensiones:\n\n🌎 Territorio terrestre: entre 100 y 1,000 hectáreas.\n🌊 Plataforma marítima continental: entre 100 y 10,000 hectáreas.\n\n🚧 Actividades Permitidas:\n🔸 Preparación de plataformas de exploración\n🔸 Realización de pozos de perforación, calicatas o zanjas\n🔸 Cálculo de reservas y evaluación de rentabilidad\n🔸 Construcción de caminos, vías de acceso y otras infraestructuras auxiliares";
    }
    return null;
  };

  const getExploitationDescription = () => {
    if (getGrantType() === "Concesión Minera de Explotación") {
      return "Otorgar una concesión minera metálica, no metálica, de gemas o piedras preciosas, para realizar actividades de explotación en una extensión mínima de cien (100) y hasta mil (1000) hectáreas, en cuadrículas o conjunto de cuadrículas colindantes al menos, por un lado, salvo en la plataforma marítima continental, donde podrá otorgarse en cuadriculas mínimas de cien (100) hasta diez mil (10,000) hectáreas, la cual autoriza la realización de las actividades siguientes:\n\na. Construcción de planteles, campamentos, obras físicas preparatorias para el proceso de producción;\nb. Actividades para el desarrollo de tajos, perfiles de corte y túneles;\nc. Descapote, construcción de botaderos de estériles y de material orgánico, extracción de broza o sustancia de interés;\nd. Detonaciones o voladuras.";
    }
    return null;
  };

  const getArtesanalDescription = () => {
    if (getGrantType() === "Permiso de Minería Artesanal") {
      return "Adjudicar un área máxima de cien (100) hectáreas para Minería Artesanal, que se encuentre libre de derechos mineros y zonas excluidas para realizar actividades mineras. El otorgamiento de los Permisos de Minería Artesanal es atribución exclusiva de las Municipalidades, únicamente dentro de las áreas adjudicadas por el INHGEOMIN, para cada municipio.";
    } else if (getGrantType() === "Permiso de Minería Artesanal de Oro de Placer") {
      if (formData.production === 'grupo_30m3') {
        return "Adjudicar un área máxima de cien (100) hectáreas para Minería Artesanal de Oro de Placer para grupos organizados, que se encuentre libre de derechos mineros y zonas excluidas para realizar actividades mineras. El otorgamiento de los Permisos de Minería Artesanal es atribución exclusiva de las Municipalidades, únicamente dentro de las áreas adjudicadas por el INHGEOMIN, para cada municipio.";
      } else {
        return "Adjudicar un área máxima de cien (100) hectáreas para Minería Artesanal de Oro de Placer, que se encuentre libre de derechos mineros y zonas excluidas para realizar actividades mineras. El otorgamiento de los Permisos de Minería Artesanal es atribución exclusiva de las Municipalidades, únicamente dentro de las áreas adjudicadas por el INHGEOMIN, para cada municipio.";
      }
    }
    return null;
  };

  const getRequirements = () => {
    const grantType = getGrantType();
    
    if (isProspeccion) {
      return documentRequirements.prospeccion;
    }
    
    if (isComercializacion) {
      return documentRequirements.comercializacion;
    }
    
    if (isProcesamiento) {
      return documentRequirements.procesamiento;
    }
    
    if (isDesazolvamiento) {
      return documentRequirements.desazolvamiento;
    }
    
    if (isBancoMateriales) {
      return documentRequirements.banco_materiales;
    }
    
    if (grantType === "Permiso de Minería Artesanal" || 
        grantType === "Permiso de Minería Artesanal de Oro de Placer") {
      return documentRequirements.artesanal;
    }
    
    if (grantType === "Pequeña Minería No Metálica") {
      return [
        "Art No. 7 Reglamento Especial Para Minería Artesanal y La Pequeña Minería",
        "1. Solicitud dirigida a la Autoridad Minera de acuerdo al Formulario de Solicitud de Adjudicación de Área de Pequeña Minería No Metálica. (DUPAI-AA-FL-01)",
        "2. Pago de inspección de campo por solicitud."
      ];
    }
    
    if (grantType === "Permisos de Pequeña Minería" || 
        grantType === "Permiso de Pequeña Minería de Oro de Placer") {
      return documentRequirements.pequena_mineria;
    }
    
    if (grantType === "Concesión Minera de Explotación") {
      return documentRequirements.explotacion;
    }
    
    return [
      "1. Formulario de solicitud correspondiente al tipo de derecho minero",
      "2. Identificación del solicitante",
      "3. Documentación legal requerida",
      "4. Comprobante de pago de canon correspondiente",
      "5. Documentación técnica según el tipo de actividad",
      "6. Permisos ambientales aplicables"
    ];
  };

  const getRequirementsLink = () => {
    if (isManualBasico && (isMetallic || isNonMetallic || isPiedrasPreciosas)) {
      return requirementLinks.artesanal;
    }
    if (isNonMetallic && isExtraccion && isAluvial && formData.hectares === 'hasta_10' && formData.production === 'hasta_100m3' && isMecanizado) {
      return requirementLinks.pequena_mineria_no_metalica;
    }
    if (isNonMetallic && formData.hectares === 'hasta_100' && isManualBasico) {
      return requirementLinks.artesanal;
    }
    if (isNonMetallic && formData.hectares === 'hasta_100' && isMecanizado) {
      return requirementLinks.pequena_mineria_no_metalica;
    }
    if (isOroPlacer) {
      return 'https://inhgeomin.gob.hn/permisos-de-pequena-mineria-metalica/';
    }
    if (isAutomatizado) {
      return 'https://inhgeomin.gob.hn/concesion-minera-de-explotacion/';
    }
    if (isManualBasico || isMecanizado) {
      return 'https://inhgeomin.gob.hn/permisos-de-pequena-mineria-metalica/';
    }
    return requirementLinks[formData.activity as keyof typeof requirementLinks] || requirementLinks.extraccion;
  };

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('Form submitted with data:', formData); // Debug log for cPanel
    
    // Validate form
    const missingFields = validateForm();
    if (missingFields.length > 0) {
      setValidationError(`Por favor complete los siguientes campos requeridos: ${missingFields.join(', ')}`);
      return;
    }
    
    setValidationError('');
    setShowResult(true);
  }, [formData]);

  const handleExternalLink = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      const url = getRequirementsLink();
      console.log('Opening URL:', url); // Debug log for cPanel
      // Use a more compatible method for cPanel
      const newWindow = window.open(url, '_blank');
      if (!newWindow) {
        // Fallback if popup is blocked
        window.location.href = url;
      }
    } catch (error) {
      console.error('Link error:', error);
      // Final fallback for older browsers
      window.location.href = getRequirementsLink();
    }
  }, [getRequirementsLink]);

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-custom-blue rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 hover:shadow-xl border border-custom-yellow">
        <div className="bg-custom-blue py-4 px-6 border-b border-custom-yellow no-print">
          <h2 className="text-2xl font-bold text-custom-yellow text-center">Calculadora de Títulos Mineros</h2>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 bg-custom-blue no-print">
          <div className="space-y-6">
            <FormField
              label="Tipo de actividad"
              name="activity"
              options={activityOptions}
              value={formData.activity}
              onChange={(value) => handleChange('activity', value)}
              description="Actividad minera específica a realizar"
              disabled={isOroPlacer}
            />

            <FormField
              label="Sustancia de interés"
              name="material"
              options={materialOptions}
              value={formData.material}
              onChange={(value) => handleChange('material', value)}
              disabled={isDesazolvamiento || isBancoMateriales}
              description="Tipo de material mineral que se planea extraer o comercializar"
            />
            
            <FormField
              label="Tipo de depósito mineral"
              name="extractionZone"
              options={extractionZoneOptions}
              value={formData.extractionZone}
              onChange={(value) => handleChange('extractionZone', value)}
              disabled={isSpecialActivity || isOroPlacer}
              description="Seleccione el tipo de depósito mineral donde se realizará la actividad minera"
            />
            
            <FormField
              label="Hectáreas requeridas"
              name="hectares"
              options={getHectaresOptions()}
              value={formData.hectares}
              onChange={(value) => handleChange('hectares', value)}
              disabled={isSpecialActivity || isMaritimePlatform || isAluvial || isOroPlacer || isProspeccion}
              description="Extensión del área solicitada para la actividad minera"
            />
            
            <FormField
              label="Capacidad de producción diaria"
              name="production"
              options={getProductionOptions()}
              value={formData.production}
              onChange={(value) => handleChange('production', value)}
              disabled={isSpecialActivity || isProspeccion || isMaritimePlatform || (isPiedrasPreciosas && formData.hectares === 'hasta_100')}
              description="Volumen de producción proyectado por día"
            />
            
            <FormField
              label="Método de extracción"
              name="extraction"
              options={getExtractionOptions()}
              value={formData.extraction}
              onChange={(value) => handleChange('extraction', value)}
              disabled={isSpecialActivity || isOroPlacer || isProspeccion || isMaritimePlatform || (isPiedrasPreciosas && formData.production === 'mas_10m3') || formData.hectares === 'menos_400' || formData.production === 'mas_10m3' || (isAluvial && isHighProduction)}
              description="Método que se utilizará para la extracción del mineral"
            />

            {validationError && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                {validationError}
              </div>
            )}

            <div className="pt-4">
              <button 
                type="submit"
                className="w-full bg-custom-blue hover:bg-opacity-80 text-custom-yellow font-bold py-3 px-4 rounded-md transition-colors duration-300 flex items-center justify-center border border-custom-yellow hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-custom-yellow focus:ring-opacity-50 active:transform active:scale-95"
                onClick={handleSubmit}
              >
                Calcular Título Minero
              </button>
            </div>
          </div>
        </form>

        {showResult && (
          <>
            <div className="no-print p-6 border-t border-custom-yellow">
              <div className="bg-white p-4 rounded-lg border border-custom-yellow">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Resultado del Cálculo</h3>
                
                {/* Alerta sobre dónde realizar el trámite */}
                <div className={`mb-4 p-3 rounded-lg border ${
                  getTramiteLocation() === 'municipalidades' 
                    ? 'bg-orange-50 border-orange-300 text-orange-800' 
                    : 'bg-blue-50 border-blue-300 text-blue-800'
                }`}>
                  <p className="font-semibold">
                    📍 Lugar donde realizar el trámite: {
                      getTramiteLocation() === 'municipalidades' 
                        ? 'MUNICIPALIDADES' 
                        : 'INHGEOMIN'
                    }
                  </p>
                </div>

                {/* Nueva alerta para grupos organizados */}
                {isOroPlacer && formData.production === 'grupo_30m3' && (
                  <div className="mb-4 p-3 rounded-lg border bg-yellow-50 border-yellow-300 text-yellow-800">
                    <p className="font-semibold">
                      👥 Para producción de más de 30 metros cúbicos se necesita tener un grupo legalmente organizado
                    </p>
                  </div>
                )}

                <div className="space-y-4 text-gray-800">
                  <p className="font-semibold">🏷️ Tipo de Derecho Minero: {getGrantType()}</p>
                  {getSmallMiningDescription() && (
                    <p className="text-gray-600 italic">{getSmallMiningDescription()}</p>
                  )}
                  {getExplorationDescription() && (
                    <p className="text-gray-600 italic whitespace-pre-line">{getExplorationDescription()}</p>
                  )}
                  {getExploitationDescription() && (
                    <p className="text-gray-600 italic whitespace-pre-line">{getExploitationDescription()}</p>
                  )}
                  {getArtesanalDescription() && (
                    <p className="text-gray-600 italic whitespace-pre-line">{getArtesanalDescription()}</p>
                  )}
                  {isDesazolvamiento && (
                    <p className="text-gray-600 italic">Limpiar ríos o cauces para prevenir inundaciones, bajo normas técnicas.</p>
                  )}
                  {isBancoMateriales && (
                    <p className="text-gray-600 italic">{activityDescriptions.banco_materiales}</p>
                  )}
                  {isProcesamiento && (
                    <p className="text-gray-600 italic">La minera de beneficio para realizar procesos físicos, químicos y/o fisicoquímicos, que se realizan para extraer o concentrar las partes valiosas de un agregado de minerales metálicos, no metálicos, gemas y/o para purificar, fundir o refinar metales.<br/><br/>La concesión de beneficio es obligatoria para aquellos que, no siendo titulares de una concesión minera de explotación, capten minerales o productos intermedios, minerales de concesionarios y terceros con el fin de beneficiarlos.</p>
                  )}
                  {isComercializacion && (
                    <p className="text-gray-600 italic">El Registro de Comercializador de Mineriales a fin de poder realizar actividades de compra y venta de minerales metálicos, no metálicos, de gemas o piedras preciosas, para transformarlos, beneficiarlos, distribuirlos o exportarlos.</p>
                  )}
                  
                  {!isDesazolvamiento && !isComercializacion && !isBancoMateriales && !isProcesamiento && (
                    <>
                
                      <p>📋 Parámetros seleccionados:</p>
                      <ul className="list-disc list-inside space-y-2 ml-4">
                        <li>🔹 Sustancia de interés: {materialOptions.find(opt => opt.value === formData.material)?.label}</li>
                        <li>🔹 Actividad: {activityOptions.find(opt => opt.value === formData.activity)?.label}</li>
                        {!isComercializacion && !isProcesamiento && (
                          <>
                            <li>🔹 Tipo de depósito mineral: {extractionZoneOptions.find(opt => opt.value === formData.extractionZone)?.label}</li>
                            <li>🔹 Extensión: {hectaresOptions.find(opt => opt.value === formData.hectares)?.label}</li>
                            <li>🔹 Capacidad de producción: {getProductionOptions().find(opt => opt.value === formData.production)?.label}</li>
                            <li>🔹 Método de extracción: {extractionOptions.find(opt => opt.value === formData.extraction)?.label}</li>
                          </>
                        )}
                      </ul>
                    </>
                  )}

                  <div className="mt-6">
                    <h4 className="text-lg font-semibold mb-2">📝 Requisitos Principales:</h4>
                    {isComercializacion && (
                      <h5 className="text-md font-medium mb-3 text-gray-700">Artículo 43 del Reglamento de la Ley General de Minería</h5>
                    )}
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      {getRequirements().map((req, index) => (
                        <li key={index}>{req}</li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                {/* Layout mejorado para móviles */}
                <div className="mt-6 space-y-4">
                  {/* Botones en la parte superior */}
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <button
                      onClick={handlePrint}
                      className="flex items-center justify-center gap-2 bg-custom-blue text-custom-yellow px-4 py-2 rounded border border-custom-yellow hover:bg-opacity-80 transition-colors focus:outline-none focus:ring-2 focus:ring-custom-yellow focus:ring-opacity-50 active:transform active:scale-95 min-h-[44px]"
                    >
                      <Printer size={20} />
                      Imprimir Resultado
                    </button>
                    <a
                      href={getRequirementsLink()}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={handleExternalLink}
                      className="flex items-center justify-center gap-2 bg-custom-blue text-custom-yellow px-4 py-2 rounded border border-custom-yellow hover:bg-opacity-80 transition-colors focus:outline-none focus:ring-2 focus:ring-custom-yellow focus:ring-opacity-50 active:transform active:scale-95 min-h-[44px]"
                    >
                      <ExternalLink size={20} />
                      Ver Requisitos Completos
                    </a>
                  </div>
                  
                  {/* QR Code centrado debajo de los botones */}
                  <div className="flex flex-col items-center justify-center pt-4">
                    <div className="bg-white p-3 rounded-lg shadow-md border border-gray-200">
                      <QRCode
                        value={getRequirementsLink()}
                        size={120}
                        level="H"
                        className="no-print"
                      />
                    </div>
                    <p className="text-sm text-gray-600 mt-2 text-center max-w-xs">
                      Escanea el código QR para ver los requisitos completos
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Print-only section */}
            <div className="print-section">
              <h3>Resultado del Cálculo</h3>
              
              {/* Alerta sobre dónde realizar el trámite para impresión */}
              <div style={{ 
                marginBottom: '20px', 
                padding: '10px', 
                border: '2px solid #333', 
                backgroundColor: '#f5f5f5',
                borderRadius: '5px'
              }}>
                <p><strong>📍 Lugar donde realizar el trámite: {
                  getTramiteLocation() === 'municipalidades' 
                    ? 'MUNICIPALIDADES' 
                    : 'INHGEOMIN'
                }</strong></p>
              </div>

              {/* Nueva alerta para grupos organizados en impresión */}
              {isOroPlacer && formData.production === 'grupo_30m3' && (
                <div style={{ 
                  marginBottom: '20px', 
                  padding: '10px', 
                  border: '2px solid #333', 
                  backgroundColor: '#fff3cd',
                  borderRadius: '5px'
                }}>
                  <p><strong>👥 Para producción de más de 30 metros cúbicos se necesita tener un grupo legalmente organizado</strong></p>
                </div>
              )}

              <p><strong>🏷️ Tipo de Derecho Minero:</strong> {getGrantType()}</p>
              {getSmallMiningDescription() && (
                <p><em>{getSmallMiningDescription()}</em></p>
              )}
              {getExplorationDescription() && (
                <p><em>{getExplorationDescription()}</em></p>
              )}
              {getExploitationDescription() && (
                <p><em>{getExploitationDescription()}</em></p>
              )}
              {getArtesanalDescription() && (
                <p><em>{getArtesanalDescription()}</em></p>
              )}
              {isDesazolvamiento && (
                <p><em>Limpiar ríos o cauces para prevenir inundaciones, bajo normas técnicas.</em></p>
              )}
              {isBancoMateriales && (
                <p><em>{activityDescriptions.banco_materiales}</em></p>
              )}
              {isProcesamiento && (
                <p><em>La minera de beneficio para realizar procesos físicos, químicos y/o fisicoquímicos, que se realizan para extraer o concentrar las partes valiosas de un agregado de minerales metálicos, no metálicos, gemas y/o para purificar, fundir o refinar metales.<br/><br/>La concesión de beneficio es obligatoria para aquellos que, no siendo titulares de una concesión minera de explotación, capten minerales o productos intermedios, minerales de concesionarios y terceros con el fin de beneficiarlos.</em></p>
              )}
              {isComercializacion && (
                <p><em>El Registro de Comercializador de Mineriales a fin de poder realizar actividades de compra y venta de minerales metálicos, no metálicos, de gemas o piedras preciosas, para transformarlos, beneficiarlos, distribuirlos o exportarlos.</em></p>
              )}
              
              {!isDesazolvamiento && !isComercializacion && !isBancoMateriales && !isProcesamiento && (
                <>
                  <p><strong>📋 Parámetros seleccionados:</strong></p>
                  <ul>
                    <li>🔹 Sustancia de interés: {materialOptions.find(opt => opt.value === formData.material)?.label}</li>
                    <li>🔹 Actividad: {activityOptions.find(opt => opt.value === formData.activity)?.label}</li>
                    {!isComercializacion && !isProcesamiento && (
                      <>
                        <li>🔹 Tipo de depósito mineral: {extractionZoneOptions.find(opt => opt.value === formData.extractionZone)?.label}</li>
                        <li>🔹 Extensión: {hectaresOptions.find(opt => opt.value === formData.hectares)?.label}</li>
                        <li>🔹 Capacidad de producción: {getProductionOptions().find(opt => opt.value === formData.production)?.label}</li>
                        <li>🔹 Método de extracción: {extractionOptions.find(opt => opt.value === formData.extraction)?.label}</li>
                      </>
                    )}
                  </ul>
                </>
              )}

              <div>
                <h4>📝 Requisitos Principales:</h4>
                {isComercializacion && (
                  <h5>Artículo 43 del Reglamento de la Ley General de Minería</h5>
                )}
                <ul>
                  {getRequirements().map((req, index) => (
                    <li key={index}>{req}</li>
                  ))}
                </ul>
              </div>

              <div className="flex items-center gap-4 mt-6">
                <div className="bg-white p-2 rounded-lg shadow-md">
                  <QRCode
                    value={getRequirementsLink()}
                    size={100}
                    level="H"
                  />
                </div>
                <p>Escanee el código QR para ver los requisitos completos en línea</p>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default MiningCalculator;