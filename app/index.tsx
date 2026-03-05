import React, { useState } from 'react';
import { SeccionDeHistorialDeResultados } from '../src/historial';
import { SeccionDeResultadosDeAnalisis } from '../src/resultados';
import FormularioParaAnalisisDeResultados from '../src/analisis';
import { MousePointer, CornerUpRight, Calendar } from 'lucide-react-native';
import { Text, View, StyleSheet } from 'react-native';
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

    const isActive = activeTab === tabId;

    return (
      <Button
        onPress={() => setActiveTab(tabId)}
        style={[
          styles.tabButton,
          isActive && styles.activeTabButton,
        ]}
      >
        {Icon && (
          <Icon
            size={18}
            color={isActive ? '#00E5FF' : '#5F7C8A'}
          />
        )}
        <Text
          style={[
            styles.tabText,
            isActive && styles.activeTabText,
          ]}
        >
          {label}
        </Text>
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
    <View style={styles.appBackground}>
      <View style={styles.glassContainer}>
        <View style={styles.header}>
          <Text style={styles.title}>ANEMIACHE</Text>
          <Text style={styles.subtitle}>
            Sistema de Evaluación Hematológica
          </Text>
        </View>

        <View style={styles.tabsContainer}>
          <TabButton label="Análisis" tabId="analisis" />
          <TabButton label="Resultados" tabId="resultados" />
          <TabButton label="Historial" tabId="historial" />
        </View>

        <View style={styles.content}>
          {renderContent()}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  appBackground: {
    flex: 1,
    backgroundColor: '#06141F',
    padding: 20,
  },

  glassContainer: {
    flex: 1,
    backgroundColor: '#0E2230',
    borderRadius: 24,
    padding: 20,
    borderWidth: 1,
    borderColor: '#12394D',
    shadowColor: '#00E5FF',
    shadowOpacity: 0.2,
    shadowRadius: 25,
    elevation: 15,
  },

  header: {
    marginBottom: 30,
  },

  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#E6FAFF',
    letterSpacing: 3,
  },

  subtitle: {
    fontSize: 12,
    color: '#4FDFFF',
    marginTop: 6,
    letterSpacing: 2,
  },

  tabsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 25,
  },

  tabButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 14,
    backgroundColor: '#102C3A',
  },

  activeTabButton: {
    backgroundColor: '#0C1F2A',
    borderWidth: 1,
    borderColor: '#00E5FF',
  },

  tabText: {
    marginLeft: 6,
    fontSize: 14,
    color: '#5F7C8A',
    letterSpacing: 1,
  },

  activeTabText: {
    color: '#00E5FF',
    fontWeight: '600',
  },

  content: {
    flex: 1,
  },
});

export default App;