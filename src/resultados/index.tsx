import { View, Text } from 'react-native';

export const SeccionDeResultadosDeAnalisis = ({ datos }: any) => {
  if (!datos) {
    return (
      <View style={{ padding: 20 }}>
        <Text>No hay resultados para mostrar.</Text>
      </View>
    );
  }

  const rangos: any = {
    hemoglobina: [12.0, 17.5],
    hematocrito: [36.0, 52.0],
    globulosRojos: [4.0, 6.0],
    vcm: [80.0, 100.0],
    hcm: [27.0, 33.0],
    chcm: [30.0, 36.0],
  };

  const verificarRango = (tipo: string, valor: string) => {
    const numero = parseFloat(valor);
    const [min, max] = rangos[tipo];

    if (numero < min || numero > max) {
      return { texto: '❌ Fuera de rango', color: 'red' };
    }

    return { texto: '✅ En rango', color: 'green' };
  };

  const renderItem = (label: string, key: string) => {
    const estado = verificarRango(key, datos[key]);

    return (
      <View style={{ marginTop: 10 }}>
        <Text>
          {label}: {datos[key]}
        </Text>
        <Text style={{ color: estado.color, fontWeight: '600' }}>
          {estado.texto}
        </Text>
      </View>
    );
  };

  return (
    <View style={{ padding: 20 }}>
      <Text
        style={{
          fontSize: 18,
          fontWeight: 'bold',
          marginBottom: 10,
        }}>
        Resultado del último análisis
      </Text>

      <Text>📅 Fecha: {datos.fecha}</Text>

      {renderItem('Hemoglobina', 'hemoglobina')}
      {renderItem('Hematocrito', 'hematocrito')}
      {renderItem('Glóbulos Rojos', 'globulosRojos')}
      {renderItem('VCM', 'vcm')}
      {renderItem('HCM', 'hcm')}
      {renderItem('CHCM', 'chcm')}

      <Text
        style={{
          marginTop: 20,
          fontWeight: 'bold',
        }}>
        🩺 Diagnóstico:
      </Text>
      <Text>{datos.diagnostico}</Text>

      <Text
        style={{
          marginTop: 10,
          fontWeight: 'bold',
        }}>
        📋 Recomendación:
      </Text>
      <Text>{datos.recomendaciones}</Text>
    </View>
  );
};