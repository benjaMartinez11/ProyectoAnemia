import { View, Text } from 'react-native';

export const SeccionDeResultadosDeAnalisis = ({ datos }: any) => {
  if (!datos) {
    return (
      <View style={{ padding: 20 }}>
        <Text>No hay resultados para mostrar.</Text>
      </View>
    );
  }

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

      <Text style={{ marginTop: 10 }}>
        Hemoglobina: {datos.hemoglobina}
      </Text>
      <Text>Hematocrito: {datos.hematocrito}</Text>
      <Text>Glóbulos Rojos: {datos.globulosRojos}</Text>
      <Text>VCM: {datos.vcm}</Text>
      <Text>HCM: {datos.hcm}</Text>
      <Text>CHCM: {datos.chcm}</Text>

      <Text
        style={{
          marginTop: 15,
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