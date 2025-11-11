import React, { useState } from 'react';

// Componente principal de la aplicación
const App = () => {
  const [activeTab, setActiveTab] = useState('analisis');
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

  // Manejador de cambios de input
  const handleInputChange = (field: any, value: any) => {
    setLabValues((prev) => ({ ...prev, [field]: value }));
  };

  // Función de análisis simplificada (sin llamadas a la API)
  const handleAnalyze = () => {
    const camposFaltantes: string[] = [];

    // Verificar campos vacíos
    if (!labValues.hemoglobina) camposFaltantes.push('Hemoglobina');
    if (!labValues.hematocrito) camposFaltantes.push('Hematocrito');
    if (!labValues.globulosRojos) camposFaltantes.push('Glóbulos Rojos');
    if (!labValues.vcm) camposFaltantes.push('VCM');
    if (!labValues.hcm) camposFaltantes.push('HCM');
    if (!labValues.chcm) camposFaltantes.push('CHCM');

    // Si hay campos vacíos, mostrar mensaje
    if (camposFaltantes.length > 0) {
      const mensaje = `Te falta completar los datos de: ${camposFaltantes.join(', ')}`;
      setErrorMessage(mensaje);
      return;
    }

    // Si todo está completo, continuar
    setErrorMessage('');
    console.log('Valores a analizar:', labValues);
    setActiveTab('resultados');
  };

  // --- Manejador de carga de archivos ---
  const handleFileUpload = (e: any) => {
    const file = e.target.files[0];
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

    setSelectedFile(file);
  };

  // --- Íconos usados ---
  const UploadIcon = (props: any) => (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
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

  const CalendarIcon = (props: any) => (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
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

  const MousePointerIcon = (props: any) => (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
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

  const CornerUpRightIcon = (props: any) => (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
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

  const FlaskConicalIcon = (props: any) => (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="lucide lucide-flask-conical">
      <path d="M14.425 2.125a1 1 0 0 0-.85-1.028l-3.2-.8A2 2 0 0 0 8 2.05v.2a2 2 0 0 0 1.25 1.83l.8.44a1 1 0 0 0 .95 0l.8-.44A2 2 0 0 0 14 2.25v-.13Z" />
      <path d="M9 3v2.85A2.15 2.15 0 0 0 9 8v12.27c0 1.34 1.13 2.43 2.5 2.43s2.5-1.1 2.5-2.43V8a2.15 2.15 0 0 0 0-2.15V3" />
    </svg>
  );

  // Botón de pestaña
  const TabButton = ({ label, tabId, isSelected }) => {
    const baseClasses =
      'flex flex-row items-center justify-center p-2 rounded-lg transition-all duration-150 border';
    const selectedClasses = 'bg-gray-700 text-white border-gray-700 shadow-md';
    const unselectedClasses = 'bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200';

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

  // Campos de entrada
  const LabInputField = ({ label, unit, value, onChange, fieldName }) => (
    <div className="flex w-full flex-col">
      <label className="mb-1 text-sm font-medium text-gray-700">
        {label} (<span className="text-xs">{unit}</span>)
      </label>
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(fieldName, e.target.value)}
        className="w-full rounded-md border border-gray-400 bg-white p-2 text-gray-900 focus:border-indigo-500 focus:ring-indigo-500"
      />
    </div>
  );

  const AnalysisContent = () => (
    <div className="space-y-4">
      <div className="rounded-lg border border-gray-400 bg-white p-4 shadow-sm">
        <p className="mb-4 text-base font-semibold text-gray-700">
          Ingrese sus valores de laboratorio
        </p>
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

      <div className="flex justify-center pt-4">
        <button
          onClick={handleAnalyze}
          className="rounded-md border border-gray-400 bg-gray-200 px-6 py-2 font-medium text-gray-800 shadow-sm hover:bg-gray-300">
          Analizar sangre
        </button>
      </div>

      <div className="pt-6">
        <p className="mb-4 text-sm font-semibold text-gray-700">
          Suba una foto o PDF (máx. 10 MB) para análisis:
        </p>

        <div className="shadow-inner flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-indigo-400 bg-white p-6">
          <input
            id="file-upload"
            type="file"
            accept=".pdf, image/jpeg, image/png"
            onChange={handleFileUpload}
            className="hidden"
          />
          <label
            htmlFor="file-upload"
            className="flex cursor-pointer items-center rounded-md border border-indigo-800 bg-indigo-600 px-4 py-2 font-medium text-white shadow-lg hover:bg-indigo-700">
            <UploadIcon className="mr-2 h-5 w-5" />
            {selectedFile ? 'Cambiar archivo' : 'Seleccionar archivo'}
          </label>

          {selectedFile && (
            <p className="mt-3 text-center text-sm text-green-600">
              Archivo seleccionado: <strong>{selectedFile.name}</strong> (
              {Math.round(selectedFile.size / 1024)} KB)
            </p>
          )}

          {errorMessage && (
            <p className="mt-3 text-center text-sm text-red-600">Error: {errorMessage}</p>
          )}

          {!selectedFile && !errorMessage && (
            <p className="mt-2 text-center text-xs text-gray-500">
              Formatos aceptados: PDF, JPG, PNG.
            </p>
          )}
        </div>
      </div>
    </div>
  );

  const ResultsContent = () => (
    <div className="p-4 text-center text-gray-600">
      <FlaskConicalIcon className="mx-auto mb-3 h-10 w-10 text-gray-400" />
      <p>Aquí aparecerán los resultados de su análisis.</p>
    </div>
  );

  const HistoryContent = () => (
    <div className="p-4 text-center text-gray-600">
      <CalendarIcon className="mx-auto mb-3 h-10 w-10 text-gray-400" />
      <p>Su historial de análisis se guardará aquí.</p>
    </div>
  );

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

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <div className="max-h-screen w-full max-w-md overflow-y-auto rounded-lg border border-gray-400 bg-white shadow-xl">
        <div className="flex items-center justify-center border-b border-gray-400 bg-white p-4">
          <h1 className="text-2xl font-semibold text-gray-900">Anemiache</h1>
        </div>

        <div className="flex justify-between gap-2 border-b border-gray-400 bg-white p-4">
          <TabButton label="Análisis" tabId="analisis" isSelected={activeTab === 'analisis'} />
          <TabButton
            label="Resultados"
            tabId="resultados"
            isSelected={activeTab === 'resultados'}
          />
          <TabButton label="Historial" tabId="historial" isSelected={activeTab === 'historial'} />
        </div>

        <div className="border border-gray-400 bg-blue-100 p-6">{renderContent()}</div>
      </div>
    </div>
  );
};

export default App;
