import React, { useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';

// Componente principal de la aplicación
const App = () => {
  // 1. Estado principal
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [activeTab, setActiveTab] = useState('analisis');
  // NUEVO: Estado para manejo de archivos
  const [selectedFile, setSelectedFile] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  // 2. Valores de Laboratorio
  const [labValues, setLabValues] = useState({
    hemoglobina: '',
    hematocrito: '',
    globulosRojos: '',
    vcm: '',
    hcm: '',
    chcm: '',
  });

  // Efecto para el tema oscuro/claro
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // Manejador de cambios de input
  const handleInputChange = (field, value) => {
    setLabValues((prev) => ({ ...prev, [field]: value }));
  };

  // Función de análisis simplificada (sin llamadas a la API)
  const handleAnalyze = () => {
    console.log('Valores a analizar:', labValues);
    // Cambia a la pestaña de resultados si hay algún dato ingresado para simular la acción.
    if (labValues.hemoglobina || labValues.hematocrito || selectedFile) {
      setActiveTab('resultados');
    } else {
      console.log('Por favor, ingrese Hemoglobina y Hematocrito para el análisis.');
    }
  };

  // --- Manejador de carga de archivos (NUEVO) ---
  const handleFileUpload = (e) => {
    const file = e.target.files[0];

    // Limpiar estados antes de la validación
    setErrorMessage('');
    setSelectedFile(null);

    if (!file) return;

    const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png'];
    const maxSize = 10 * 1024 * 1024; // 10 MB

    if (!allowedTypes.includes(file.type)) {
      setErrorMessage('Solo se permiten archivos PDF, JPG o PNG.');
      return;
    }

    if (file.size > maxSize) {
      setErrorMessage('El archivo supera los 10 MB.');
      return;
    }

    // Si pasa todas las validaciones
    setSelectedFile(file);
  };

  // --- START SVG ICON DEFINITIONS ---

  const SunIcon = (props) => (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="lucide lucide-sun">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2" />
      <path d="M12 20v2" />
      <path d="m4.93 4.93 1.41 1.41" />
      <path d="m17.66 17.66 1.41 1.41" />
      <path d="M2 12h2" />
      <path d="M20 12h2" />
      <path d="m4.93 19.07 1.41-1.41" />
      <path d="m17.66 6.34 1.41-1.41" />
    </svg>
  );

  const MoonStarIcon = (props) => (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="lucide lucide-moon-star">
      <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
      <path d="M19 3v4" />
      <path d="M21 5h-4" />
    </svg>
  );

  const UploadIcon = (props) => (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="lucide lucide-upload">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="17 8 12 3 7 8" />
      <line x1="12" x2="12" y1="3" y2="15" />
    </svg>
  );

  const CalendarIcon = (props) => (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="lucide lucide-calendar">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );

  const MousePointerIcon = (props) => (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="lucide lucide-mouse-pointer">
      <path d="m3 3 7.07 16.27 3.65-4.59 4.59-3.65L3 3z" />
      <path d="M11 11l4 4" />
    </svg>
  );

  const CornerUpRightIcon = (props) => (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="lucide lucide-corner-up-right">
      <polyline points="15 14 20 9 15 4" />
      <path d="M4 20v-7a4 4 0 0 1 4-4h12" />
    </svg>
  );

  const FlaskConicalIcon = (props) => (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="lucide lucide-flask-conical">
      <path d="M14.425 2.125a1 1 0 0 0-.85-1.028l-3.2-.8A2 2 0 0 0 8 2.05v.2a2 2 0 0 0 1.25 1.83l.8.44a1 1 0 0 0 .95 0l.8-.44A2 2 0 0 0 14 2.25v-.13c.01-.01.01-.02 0-.02Z" />
      <path d="M9 3v2.85A2.15 2.15 0 0 0 9 8v12.27c0 1.34 1.13 2.43 2.5 2.43s2.5-1.1 2.5-2.43V8a2.15 2.15 0 0 0 0-2.15V3" />
    </svg>
  );
  // --- END SVG ICON DEFINITIONS ---

  // Componente de Alternancia de Tema
  const ThemeToggle = () => {
    const IconComponent = isDarkMode ? SunIcon : MoonStarIcon;
    return (
      <button
        onClick={() => setIsDarkMode(!isDarkMode)}
        aria-label="Toggle theme"
        className="rounded-full p-2 text-indigo-600 transition-colors duration-200 hover:bg-indigo-100 dark:text-indigo-400 dark:hover:bg-zinc-700">
        <IconComponent className="h-6 w-6" />
      </button>
    );
  };

  // Componente de Botón de Pestaña
  const TabButton = ({ label, tabId, isSelected }) => {
    const baseClasses =
      'flex flex-row items-center justify-center p-2 rounded-lg transition-all duration-150 border';
    const selectedClasses =
      'bg-gray-700 text-white border-gray-700 dark:bg-gray-300 dark:text-gray-900 dark:border-gray-300 shadow-md';
    const unselectedClasses =
      'bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200 dark:bg-zinc-700 dark:text-gray-200 dark:border-zinc-600 dark:hover:bg-zinc-600';

    // Mapeo de iconos SVG inline
    let DisplayIcon;
    if (tabId === 'analisis') DisplayIcon = MousePointerIcon;
    if (tabId === 'resultados') DisplayIcon = CornerUpRightIcon;
    if (tabId === 'historial') DisplayIcon = CalendarIcon;

    return (
      <button
        onClick={() => setActiveTab(tabId)}
        className={`${baseClasses} ${isSelected ? selectedClasses : unselectedClasses} w-1/3`}>
        {DisplayIcon && <DisplayIcon className="mr-1 h-4 w-4" />}
        <span className="text-sm font-medium">{label}</span>
      </button>
    );
  };

  // Componente para un par de campos de entrada
  const LabInputField = ({ label, unit, value, onChange, fieldName }) => (
    <div className="flex w-full flex-col">
      <label className="mb-1 text-sm font-medium text-gray-700 dark:text-gray-200">
        {label} (<span className="text-xs">{unit}</span>)
      </label>
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(fieldName, e.target.value)}
        className="w-full rounded-md border border-gray-400 bg-white p-2 text-gray-900 transition-colors focus:border-indigo-500 focus:ring-indigo-500 dark:border-zinc-500 dark:bg-zinc-700 dark:text-gray-100"
      />
    </div>
  );

  // Contenido de la pestaña de Análisis
  const AnalysisContent = () => (
    <div className="space-y-4">
      {/* Caja de inputs */}
      <div className="rounded-lg border border-gray-400 bg-white p-4 shadow-sm dark:border-zinc-500 dark:bg-zinc-700">
        <p className="mb-4 text-base font-semibold text-gray-700 dark:text-gray-200">
          Ingrese sus valores de laboratorio
        </p>

        {/* Input fields */}
        <div className="grid grid-cols-2 gap-4">
          <LabInputField
            label="Hemoglobina"
            unit="g/dL"
            value={labValues.hemoglobina}
            onChange={handleInputChange}
            fieldName="hemoglobina"
          />
          <LabInputField
            label="Hematocrito"
            unit="%"
            value={labValues.hematocrito}
            onChange={handleInputChange}
            fieldName="hematocrito"
          />
        </div>
        <div className="mt-4 grid grid-cols-2 gap-4">
          <LabInputField
            label="Glóbulos Rojos"
            unit="M/μL"
            value={labValues.globulosRojos}
            onChange={handleInputChange}
            fieldName="globulosRojos"
          />
          <LabInputField
            label="VCM"
            unit="fL"
            value={labValues.vcm}
            onChange={handleInputChange}
            fieldName="vcm"
          />
        </div>
        <div className="mt-4 grid grid-cols-2 gap-4">
          <LabInputField
            label="HCM"
            unit="pg"
            value={labValues.hcm}
            onChange={handleInputChange}
            fieldName="hcm"
          />
          <LabInputField
            label="CHCM"
            unit="g/dL"
            value={labValues.chcm}
            onChange={handleInputChange}
            fieldName="chcm"
          />
        </div>
      </div>

      {/* Botón de Analizar (Función simple) */}
      <div className="flex justify-center pt-4">
        <button
          onClick={handleAnalyze}
          className="rounded-md border border-gray-400 bg-gray-200 px-6 py-2 font-medium text-gray-800 shadow-sm transition-colors hover:bg-gray-300 dark:border-zinc-500 dark:bg-zinc-600 dark:text-gray-200 dark:hover:bg-zinc-500">
          Analizar sangre
        </button>
      </div>

      {/* Sección de Subida de Archivos (ACTUALIZADA con validación) */}
      <div className="pt-6">
        <p className="mb-4 text-sm font-semibold text-gray-700 dark:text-gray-200">
          Suba una foto o PDF (máx. 10 MB) para análisis:
        </p>

        <div className="shadow-inner flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-indigo-400 bg-white p-6 dark:border-indigo-600 dark:bg-zinc-700">
          <input
            id="file-upload"
            type="file"
            // Definimos los tipos de archivos aceptados
            accept=".pdf, image/jpeg, image/png"
            onChange={handleFileUpload}
            // Ocultamos el input de archivo estándar y usamos el label para dispararlo
            className="hidden"
          />

          <label
            htmlFor="file-upload"
            className="flex cursor-pointer items-center rounded-md border border-indigo-800 bg-indigo-600 px-4 py-2 font-medium text-white shadow-lg transition-colors hover:bg-indigo-700 dark:border-indigo-400">
            <UploadIcon className="mr-2 h-5 w-5" />
            {selectedFile ? 'Cambiar archivo' : 'Seleccionar archivo'}
          </label>

          {/* Mensajes de estado */}
          {selectedFile && (
            <p className="mt-3 text-center text-sm text-green-600 dark:text-green-400">
              Archivo seleccionado: **{selectedFile.name}** ({Math.round(selectedFile.size / 1024)}{' '}
              KB)
            </p>
          )}

          {errorMessage && (
            <p className="mt-3 text-center text-sm text-red-600 dark:text-red-400">
              Error: {errorMessage}
            </p>
          )}

          {!selectedFile && !errorMessage && (
            <p className="mt-2 text-center text-xs text-gray-500 dark:text-gray-400">
              Formatos aceptados: PDF, JPG, PNG.
            </p>
          )}
        </div>
      </div>
    </div>
  );

  // Contenido de la pestaña de Resultados (Placeholder)
  const ResultsContent = () => (
    <div className="p-4 text-center text-gray-600 dark:text-gray-300">
      <FlaskConicalIcon className="mx-auto mb-3 h-10 w-10 text-gray-400" />
      <p>Aquí aparecerán los resultados de su análisis.</p>
    </div>
  );

  // Contenido de la pestaña de Historial (Placeholder)
  const HistoryContent = () => (
    <div className="p-4 text-center text-gray-600 dark:text-gray-300">
      <CalendarIcon className="mx-auto mb-3 h-10 w-10 text-gray-400" />
      <p>Su historial de análisis se guardará aquí.</p>
    </div>
  );

  // Función para renderizar el contenido de la pestaña activa
  const renderContent = () => {
    switch (activeTab) {
      case 'analisis':
        return <AnalysisContent />;
      case 'resultados':
        return <ResultsContent />;
      case 'historial':
        return <HistoryContent />;
      default:
        return null;
    }
  };

  // 3. Renderizado principal
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4 transition-colors duration-300 dark:bg-zinc-900">
      {/* Contenedor principal de la aplicación (Simulando la vista de un móvil) */}
      <div className="max-h-screen w-full max-w-md overflow-y-auto rounded-lg border border-gray-400 bg-white shadow-xl dark:border-zinc-700 dark:bg-zinc-800">
        {/* Encabezado y Título */}
        <div className="flex items-center justify-between border-b border-gray-400 bg-white p-4 dark:border-zinc-700 dark:bg-zinc-800">
          <div className="w-10"></div>
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">Anemiache</h1>
          <ThemeToggle />
        </div>

        {/* Navegación por Pestañas */}
        <div className="flex justify-between gap-2 border-b border-gray-400 bg-white p-4 dark:border-zinc-700 dark:bg-zinc-800">
          <TabButton label="Análisis" tabId="analisis" isSelected={activeTab === 'analisis'} />
          <TabButton
            label="Resultados"
            tabId="resultados"
            isSelected={activeTab === 'resultados'}
          />
          <TabButton label="Historial" tabId="historial" isSelected={activeTab === 'historial'} />
        </div>

        {/* Contenido de la Pestaña Activa */}
        <div className="border border-gray-400 bg-blue-100 p-6 dark:border-zinc-700 dark:bg-zinc-800">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default App;
