export const materialOptions = [
  { value: 'oro_placer', label: 'Oro de placer (Minería Artesanal)' },
  { value: 'metalicos', label: 'Metálicos (ej. Oro, Plata, Cobre, Zinc, Plomo)' },
  { value: 'no_metalicos', label: 'No Metálicos (ej. Arena, Grava, Caliza, Mármol)' },
  { value: 'piedras_preciosas', label: 'Piedras Preciosas (ej. Ópalo, Jade)' }
];

export const activityOptions = [
  { value: 'prospeccion', label: 'Prospección y Evaluación (Exploración)' },
  { value: 'extraccion', label: 'Extracción de Minerales (Explotación)' },
  { value: 'comercializacion', label: 'Comercialización de Minerales' },
  { value: 'procesamiento', label: 'Procesamiento de Minerales (Beneficio)' },
  { value: 'desazolvamiento', label: 'Desazolvamiento' },
  { value: 'banco_materiales', label: 'Banco de Materiales' }
];

export const hectaresOptions = [
  { value: 'hasta_10', label: 'Hasta 10 hectáreas' },
  { value: 'hasta_100', label: 'Hasta 100 hectáreas' },
  { value: 'menos_400', label: 'De 100 a 1000 hectáreas' },
  { value: 'hasta_1000', label: 'De 100 a 1000 hectáreas' },
  { value: 'hasta_10000', label: 'De 100 a 10,000 hectáreas' }
];

export const productionOptionsMetallic = [
  { value: 'menos_200t', label: 'Menos de 200 toneladas diarias' },
  { value: 'mas_200t', label: 'Más de 200 toneladas diarias' }
];

export const productionOptionsNonMetallic = [
  { value: 'hasta_10m3', label: 'Hasta 10 metros cúbicos diarios' },
  { value: 'hasta_50m3', label: 'Hasta 50 metros cúbicos diarios' },
  { value: 'hasta_100m3', label: 'Hasta 100 metros cúbicos diarios' },
  { value: 'mas_100m3', label: 'Más de 100 metros cúbicos diarios' }
];

export const productionOptionsOroPlacer = [
  { value: 'individual_10m3', label: 'Individual 10 m³ diarios' },
  { value: 'grupo_30m3', label: 'Grupo 30 m³ diarios' }
];

export const productionOptionsPreciousStones = [
  { value: 'hasta_10m3', label: 'Hasta 10 metros cúbicos diarios' },
  { value: 'mas_10m3', label: 'Más de 10 metros cúbicos diarios' }
];

export const extractionOptions = [
  { value: 'artesanal', label: 'Manual/Básico (Artesanal)' },
  { value: 'pequena_mineria', label: 'Mecanizado (Pequeña minería)' },
  { value: 'automatizado', label: 'Automatizado' }
];

export const extractionZoneOptions = [
  { value: 'cerros_canteras', label: 'Cerros y Canteras' },
  { value: 'aluviales', label: 'Aluviales' },
  { value: 'plataforma_maritima', label: 'Plataforma Marítima Continental' }
];

export const requirementLinks = {
  prospeccion: 'https://inhgeomin.gob.hn/concesiones-mineras-de-exploracion/',
  extraccion: 'https://inhgeomin.gob.hn/concesion-minera-de-explotacion/',
  comercializacion: 'https://inhgeomin.gob.hn/comercializacion-de-minerales/',
  procesamiento: 'https://inhgeomin.gob.hn/concesion-minera-de-beneficio/',
  desazolvamiento: 'https://inhgeomin.gob.hn/proyectos-de-desazolvamiento/',
  banco_materiales: 'https://inhgeomin.gob.hn/bancos-de-materiales/',
  artesanal: 'https://inhgeomin.gob.hn/adjudicacion-de-area-de-mineria-artesanal/',
  pequena_mineria_no_metalica: 'https://inhgeomin.gob.hn/adjudicacion-de-area-para-pequena-mineria-no-metalica/'
};

export const activityDescriptions = {
  prospeccion: 'Actividades de búsqueda y evaluación de yacimientos minerales según la Ley General de Minería',
  extraccion: 'Extracción de minerales del suelo o subsuelo bajo normativa vigente',
  comercializacion: 'Compra y venta de minerales bajo licencia especial de comercialización',
  procesamiento: 'Tratamiento de minerales en plantas de beneficio autorizadas',
  desazolvamiento: 'Proyectos de Desazolvamientos',
  banco_materiales: 'Extracción de materiales no metálicos para obras de infraestructura pública'
};

export const documentRequirements = {
  prospeccion: [
    '1- Formulario de Solicitud de Concesión Minera de Exploración (DUPAI-CMER-FL-01) dirigido a la Autoridad Minera',
    'a. Sustancia de Interés.',
    'b. Programa de Actividades con la descripción correspondiente y plan de inversión mínima comprometida.',
    'c. Descripción de los vértices de área solicitada, en el Sistema UTM-NAD27 (Art. 66 de la Ley General de Minería).',
    '2- Identificación Plena del Solicitante y de su capacidad para ejercer actos de comercio: (Art. 66 de la Ley General de Minería)',
    'a. Fotocopia del documento de identidad del representante legal de la sociedad o comerciante individual. (Art. 88 de la Ley del Registro Nacional de las Personas.)',
    'b. Fotocopia del documento de Registro Tributario Nacional (RTN) de la sociedad o comerciante individual. (Art. 60 Código Tributario y sus Reformas.)',
    'c. Carta Poder o Poder Especial a favor de un apoderado Legal. (Art. 57 de la Ley de Procedimiento Administrativo)',
    'd. Fotocopia del documento de carné de colegiación vigente del apoderado Legal. (Art. 1 de la Ley Orgánica del Colegio de Abogados de Honduras)',
    'e. Fotocopia del documento de Constitución de Sociedad, Comerciante Individual o Personalidad Jurídica. (Art. 14 del Código de Comercio)',
    'f. Declaración Jurada del solicitante de no estar comprendido dentro de las inhabilidades de la ley General de Minería. (Art. 75 de la Ley General de Minería.)',
    'g. Auténtica Notarial de las fotocopias acreditadas. (Art. 38,39 y 40 Reglamento del Código del Notariado)',
    'h. Auténtica Notarial de las firmas de documentos acreditados. (Art. 38,39 y 40 Reglamento del Código del Notariado)',
    '3- Comprobante de Pago de Canon establecido (Art. 56-A Decreto Legislativo No. 109- 2019 y Art. 66 de la Ley General de Minería)',
    '4- Copia de notificación presentada a la municipalidad correspondiente de la intención de presentar solicitud de Concesión Minera de Exploración. (Art. 66 de la Ley General de Minería)',
    '5- Estados Financieros actualizados al año fiscal, Balance General y Estado de Resultados (Art. 66 de La Ley General de Minería. Art. 9 de la Ley sobre Normas de Contabilidad y Auditorias)'
  ],
  artesanal: [
    'Artículo 18 Reglamento Especial Para Minería Artesanal y La Pequeña Minería.',
    '🔹 Solicitud dirigida a la Autoridad Minera de acuerdo al Formulario de solicitud de Adjudicación de Área de Minería Artesanal. (DUPAI-AA-FL-01)',
    'Reglamento Especial Para Minería Artesanal y La Pequeña Minería.',
    '🔹 Pago de inspección de campo por solicitud'
  ],
  pequena_mineria: [
    'Artículo 6 del Reglamento Especial para Minería Artesanal y la Pequeña Minería',
    '1. Solicitud dirigida a la Autoridad Minera usando el Formulario de Solicitud de Pequeña Minería (DUPAIPPMM-FL-01)',
    '2. Información general del proyecto que contenga lo siguiente:',
    '• Ubicación del área solicitada',
    '• Antecedentes de estudios geológicos y/o mineros del área en solicitud;',
    '• Forma de explotación;',
    '• Sustancia de interés;',
    '• Volumen de material a explotarse;',
    '• Tecnología a aplicarse para la recuperación;',
    '• Plan de Seguridad enmarcado en el Reglamento Especial de Seguridad y Salud Ocupacional en la Actividad Minera de Honduras.',
    '• Presupuesto y cronograma de actividades extractivas, ambientales (medidas de mitigación y cierre), medidas de seguridad laboral y medidas de responsabilidad social empresarial;',
    '• Plano en escala 1:20,000 indicando los sitios donde se desarrollará la actividad minera, debe contener lo siguiente: Figura geométrica delimitada por coordenadas geográficas, perímetro de zona en la que se señale vértice, latitud y longitud y área en hectáreas.',
    '• En el Sistema de Cuadrícula establecido por la Ley General de Minería, perímetro de la zona en la que se señale vértice, latitud y longitud y área en hectáreas. Cada sitio debe ser presentado en coordenadas universales transversales Mercator (UTM); sistema NAD27 central;',
    '• Ubicación del plantel de acopio o almacenamiento, beneficio, fundición y refinación en la que se vayan a procesar los materiales producto de la explotación cuando proceda;',
    '3. Licencia ambiental con su resolución respectiva',
    '4. Plan de Cierre de Minas.',
    '5. Generales de ley del solicitante y/o de su representante, en caso de representación legal debe presentar el documento que acredite la misma debidamente autenticado.',
    '6. Pago de Canon Territorial.',
    '7. Fotocopia de documento de identificación personal.',
    '8. Fotocopia del documento de Registro Tributario Nacional (RTN).',
    '9. Carta Poder Autenticada o Poder Especial a favor de un profesional del derecho y copia fotostática del carné de colegiación.',
    '10. Escritura de Constitución de Sociedad, Comerciante Individual o Personalidad Jurídica',
    '11. Declaración Jurada de no estar comprendido dentro de las inhabilidades que establece el Artículo 75 de la Ley General de Minería.',
    '12. Pago de inspección de campo por solicitud.',
    '13. Escritura de Propiedad, Contrato de Arrendamiento o Servidumbre o cualquier otro documento que acredite la posesión efectiva del bien.',
    '14. Garantía Bancaria para garantizar el cumplimiento de medidas de control ambiental.'
  ],
  comercializacion: [
    'Formulario de Solicitud Comercializador de Minerales (DUPAICM-FL-01)',
    'Nombre o razón social y domicilio del solicitante',
    'Registro Tributario Nacional (RTN)',
    'Nombre de la mina, cantera, explotación y/o establecimiento del que se suministra el mineral y el número de expediente de la misma ante la Autoridad Minera o Municipalidad',
    'Sustancias minerales que pretende comercializar, con volúmenes y/o pesos aproximados',
    'Certificado de origen del mineral, el cual será emitido por el poseedor de un derecho minero, el cual deberá de ser autenticado',
    'Copia autenticada de la Constancia de Solvencia',
    'Constancias de Solvencia emitidas por la Procuraduría General de la República',
    'Recibo de pago por la tasa de emisión del registro'
  ],
  procesamiento: [
    'Formulario de Solicitud Concesión Minera de Beneficio (DUPAI-CMB-FL-01) dirigida a la Autoridad Minera. (Art. 71 de la Ley General de Minería)',
    'Memoria descriptiva de la planta y de sus instalaciones principales, auxiliares y complementarias, indicando la clase de mineral que será tratado, capacidad instalada por día, procedimiento de beneficio, reactivos, naturaleza de los productos finales, desechos, distancia a poblaciones o zonas agrícolas más próximas y el diagrama de flujo de planta. (Art. 71 de la Ley General de Minería)',
    'planos y cortes longitudinales a escala 1:500 de las obras descritas en el numeral anterior. (Art.10 Reglamento de Cierre de Minas)',
    'Autorización de uso de aguas (Art.10 Reglamento de Cierre de Minas)',
    'Licencia Ambiental. (Art.10 Reglamento de Cierre de Minas)',
    'Plan de Cierre de Minas (Art.10 Reglamento de Cierre de Minas)',
    'Declaración Jurada del solicitante de no estar comprendido dentro de las inhabilidades de la Ley General de Minería. (Art. 75 de la Ley General de Minería)'
  ],
  desazolvamiento: [
    'Artículo 94 del Reglamento de la Ley de Minería',
    'Artículo 15 del Reglamento de la Ley Especial para la simplificación de los procedimientos de inversión en infraestructura pública',
    '• Formulario de Solicitud de emisión de norma técnica para Desazolvamiento',
    '• Carta Poder Autenticada (en caso de no comparecer los titulares de los órganos)',
    '• Perfil Técnico del Proyecto',
    '• Contrato de ejecución del proyecto de la obra pública (*Este requisito solo aplica si el material excedente será destinado para el desarrollo de una obra pública)',
    '• Constancia, acuerdo o licencia ambiental, según sea la obra (*Este requisito solo aplica si el material excedente será destinado para el desarrollo de una obra pública)'
  ],
  banco_materiales: [
    '1- Formulario de Solicitud de emisión de norma técnica para el aprovechamiento de Sustancias No Metálicas para la ejecución de Obras y Proyectos de Infraestructura Pública. (Artículo 96 del Reglamento de la Ley de Minería)',
    '2- Perfil Técnico del Proyecto con base al formato establecido. (Artículo 96 del Reglamento de la Ley de Minería)'
  ],
  explotacion: [
    'Art. 69 de la Ley General de Minería',
    '1 Formulario de Solicitud de Concesión Minera de Explotación (DUPAI-CMET-FL - 01) dirigida a la Autoridad Minera.',
    '2 Resultados de Exploración, los cuales deben contener por lo menos, los cálculos de reservas, calidad, condiciones de yacencia, mineralogía asociada, geología general y detallada;',
    'Art. 26 Reglamento de la Ley General de Minería',
    '3 Comprobante de pago de inspección para la etapa de explotación;',
    '4 Escritura Pública o documento que acredite en legal y debida la titularidad del predio superficial donde se desarrollará la actividad minera. En caso de no ser propietario, la autorización o contratación respectiva del dueño de la propiedad otorgada conforme a ley y, que deberá ser registrada oportunamente ante la Autoridad Minera y, si la explotación es aluvial (río) acreditar servidumbre respectiva cuando proceda;',
    '5 Proyecto de viabilidad que contenga lo siguiente:',
    'a. Método de extracción y descripción del plan de explotación y/o beneficio (flujograma de procesos, plan de minado.)',
    'b. Descripción del diseño del sitio o los sitios a explotar, depósito de estéril y de materia orgánica.',
    'c. Volúmenes proyectados de producción.',
    'd. Volúmenes de material estéril y materia orgánica a remover.',
    'e. Equipo a utilizar (descripción técnica).',
    'f. Recurso Humano. (Estructura orgánica del proyecto, puestos y responsables.)',
    'g. Cronograma de actividades que detalle los tiempos de ejecución mensual (adecuación, fecha estimada de explotación, operación y cierre.)',
    '6 Proyecto de inversión mínima:',
    'a. Presupuesto de construcción (adecuación e instalación)',
    'b. Presupuesto de ejecución industrial (operación)',
    'Art. 26 Reglamento de la Ley General de Minería Resolución No. DE-04-10-2014',
    '7 Planos de Conjunto: Diseño del Proyecto (todos los planos deberán ser georreferenciados en la proyección transversal Mercator UTM, NAD-27 con su respectiva tabla de coordenadas);',
    'Art. 26 Reglamento de la Ley General de Minería',
    '8 Planos generales del proyecto: Ubicación de todos los elementos que forman parte del proceso minero (perímetros de las áreas de extracción, rutas de acarreo, oficinas administrativas, bodegas, zonas de aparcamiento necesarias, áreas de almacenamiento de mineral, efluentes de operaciones mineras, trituradoras, tamices, bandas transportadoras, tuberías de aguas, fosa séptica, letrinas, área de ubicación de explosivos si fuera el caso). La ubicación de todos los elementos anteriormente descritos dependerá de la sustancia de interés a explotar y el proceso a realizar.',
    '9 Diseño de la planta de proceso si existiera.',
    '10 Plano del diseño de la mina con sus cortes transversales y verticales que delimitan el o los cuerpos a minar.',
    '11 Licencia ambiental y contrato de medidas de mitigación.',
    '12 Planes de contingencia (riesgo, desastres naturales, desempeño);',
    'Reglamento de Cierre de Minas, Acuerdo Ejecutivo 011-2017',
    '13 Plan de cierre y abandono;',
    'Art. 26 Reglamento de la Ley General de Minería',
    '14 Actualización de los estados financieros originales, firmados, timbrados y sellados por un perito certificado en el área contable. (balance general, estado de resultado) con fecha de cierre al año fiscal;',
    '15 Plan de inversiones mínimas;',
    '16 Evaluación de impacto social en etapas de explotación y cierre que contempla el estudio de impacto ambiental.',
    'Art. 75 de la Ley General de Minería',
    '17 Declaración Jurada del solicitante de no estar comprendido dentro de las inhabilidades de la Ley General de Minería.',
    'Art. 67-A Reforma de La Ley General de Minería',
    '18 Consulta Ciudadana.',
    'Art. 56-A Decreto Legislativo No. 109-2019',
    '19 Comprobante de Pago de Canon.'
  ]
};