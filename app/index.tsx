import React, { useState } from 'react';
import { SeccionDeHistorialDeResultados } from '../src/historial';
import { SeccionDeResultadosDeAnalisis } from '../src/resultados';
import FormularioParaAnalisisDeResultados from '../src/analisis';
import { MousePointer, CornerUpRight, Calendar } from 'lucide-react-native';
import { Text, View } from 'react-native';
import { Button } from '../components/ui/button';

const App = () => {
  const [activeTab, setActiveTab] = useState('analisis');
  const [errorMessage, setErrorMessage] = useState('');
  const [resultadoActual, setResultadoActual] = useState<any>(null);

  const [labValues, setLabValues] = useState({
    hemoglobina: '',
    hematocrito: '',
    globulosRojos: '',
    vcm: '',
    hcm: '',
    chcm: '',
  });

  const [historial, setHistorial] = useState<any[]>([]);

  const handleInputChange = (field: string, value: string) => {
    setLabValues((prev) => ({ ...prev, [field]: value }));
  };

  const handleAnalyze = (valores: any) => {
    const camposFaltantes: string[] = [];

    Object.entries(valores).forEach(([key, val]) => {
      if (!val) camposFaltantes.push(key);
    });

    if (camposFaltantes.length > 0) {
      setErrorMessage(`Te falta completar: ${camposFaltantes.join(', ')}`);
      return;
    }

    setErrorMessage('');

    const datosNumericos = {
      hemoglobina: parseFloat(valores.hemoglobina),
      hematocrito: parseFloat(valores.hematocrito),
      globulosRojos: parseFloat(valores.globulosRojos),
      vcm: parseFloat(valores.vcm),
      hcm: parseFloat(valores.hcm),
      chcm: parseFloat(valores.chcm),
    };

    const rangos: any = {
      hemoglobina: [12.0, 17.5],
      hematocrito: [36.0, 52.0],
      globulosRojos: [4.0, 6.0],
      vcm: [80.0, 100.0],
      hcm: [27.0, 33.0],
      chcm: [30.0, 36.0],
    };

    let fueraDeRango = false;

    Object.entries(datosNumericos).forEach(([key, value]) => {
      const [min, max] = rangos[key];
      if (value < min || value > max) {
        fueraDeRango = true;
      }
    });

    let diagnostico = '';
    let recomendaciones = '';

    if (!fueraDeRango) {
      diagnostico = 'Todos los parámetros están dentro de rango.';
      recomendaciones =
        'Mantener alimentación equilibrada y controles anuales.';
    } else {
      diagnostico = 'Se detectaron valores fuera de rango.';
      recomendaciones =
        'Se recomienda evaluación médica para diagnóstico preciso.';
    }

    const nuevoRegistro = {
      id: Date.now().toString(),
      fecha: new Date().toLocaleString(),
      ...valores,
      diagnostico,
      recomendaciones,
    };

    setHistorial((prev) => [nuevoRegistro, ...prev]);
    setResultadoActual(nuevoRegistro);
    setActiveTab('resultados');
  };

  const TabButton = ({ label, tabId }: { label: string; tabId: string }) => {
    let Icon;
    if (tabId === 'analisis') Icon = MousePointer;
    if (tabId === 'resultados') Icon = CornerUpRight;
    if (tabId === 'historial') Icon = Calendar;

    return (
      <Button onPress={() => setActiveTab(tabId)}>
        {Icon && <Icon size={18} />}
        <Text style={{ marginLeft: 5 }}>{label}</Text>
      </Button>
    );
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'analisis':
        return (
          <FormularioParaAnalisisDeResultados
            labValues={labValues}
            onChange={handleInputChange}
            onAnalyze={() => handleAnalyze(labValues)}
            errorMessage={errorMessage}
          />
        );

      case 'resultados':
        return (
          <SeccionDeResultadosDeAnalisis datos={resultadoActual} />
        );

      case 'historial':
        return (
          <SeccionDeHistorialDeResultados datos={historial} />
        );

      default:
        return null;
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#f3f4f6', padding: 20 }}>
      <View
        style={{
          flex: 1,
          backgroundColor: 'white',
          borderRadius: 12,
          padding: 16,
        }}>
        <View style={{ alignItems: 'center', marginBottom: 20 }}>
          <Text style={{ fontSize: 28, fontWeight: 'bold' }}>
            Anemiache
          </Text>
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: 20,
          }}>
          <TabButton label="Análisis" tabId="analisis" />
          <TabButton label="Resultados" tabId="resultados" />
          <TabButton label="Historial" tabId="historial" />
        </View>

        <View style={{ flex: 1 }}>{renderContent()}</View>
      </View>
    </View>
  );
};

export default App;