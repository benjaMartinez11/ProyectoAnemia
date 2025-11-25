import React, { useState } from 'react';
import { SeccionDeHistorialDeResultados } from '../src/historial';
import { SeccionDeResultadosDeAnalisis } from '../src/resultados';
import FormularioParaAnalisisDeResultados from '../src/analisis';
import { MousePointer, CornerUpRight, Calendar, FlaskConical } from "lucide-react-native";
import { Text, View } from 'react-native';
import { Button } from '../components/ui/button';


 
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
      <Calendar size={20} color="#555" />
  );

  const MousePointerIcon = () => (
    <MousePointer size={20} color="#555" />
  );

  const CornerUpRightIcon = (props: any) => (
          <CornerUpRight size={20} color="#555" />
  );

  const FlaskConicalIcon = (props: any) => (
          <FlaskConical size={20} color="#555" />

  );

  // Botón de pestaña
  const TabButton = ({ label, tabId, isSelected }:{label: string, tabId: string, isSelected: boolean  }) => {
    const baseClasses =
      'flex flex-row items-center justify-center p-2 rounded-lg transition-all duration-150 border';
    const selectedClasses = 'bg-gray-700 text-white border-gray-700 shadow-md';
    const unselectedClasses = 'bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200';

    let DisplayIcon;
    if (tabId === 'analisis') DisplayIcon = MousePointerIcon;
    if (tabId === 'resultados') DisplayIcon = CornerUpRightIcon;
    if (tabId === 'historial') DisplayIcon = CalendarIcon;

    return (
      <Button
        onPress={() => setActiveTab(tabId)}>
        {DisplayIcon && <DisplayIcon className="mr-1 h-4 w-4" />}
        <Text className="text-sm font-medium">{label}</Text>
      </Button>
    );
  };

  // Campos de entrada

  const renderContent = () => {
    switch (activeTab) {
      case 'analisis':
        return <FormularioParaAnalisisDeResultados />;
      case 'resultados':
        return <SeccionDeResultadosDeAnalisis />;
      case 'historial':
        return <SeccionDeHistorialDeResultados />;
      default:
        return null;
    }
  };

  return (
    <View className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <View className="max-h-screen w-full max-w-md overflow-y-auto rounded-lg border border-gray-400 bg-white shadow-xl">
        <View className="flex items-center justify-center border-b border-gray-400 bg-white p-4">
          <Text className="text-2xl font-semibold text-gray-900">Anemiache</Text>
        </View>

        <View className="flex justify-between gap-2 border-b border-gray-400 bg-white p-4">
          <TabButton label="Análisis" tabId="analisis" isSelected={activeTab === 'analisis'} />
          <TabButton
            label="Resultados"
            tabId="resultados"
            isSelected={activeTab === 'resultados'}
          />
          <TabButton label="Historial" tabId="historial" isSelected={activeTab === 'historial'} />
        </View>

      </View>
    </View>
  );
};

export default App;
