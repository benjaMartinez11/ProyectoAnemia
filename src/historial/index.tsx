import React from 'react';
import { View, Text, ScrollView } from 'react-native';

export const SeccionDeHistorialDeResultados = ({ datos }: any) => {
  return (
    <ScrollView>
      {datos.length === 0 ? (
        <Text>No hay análisis guardados.</Text>
      ) : (
        datos.map((item: any) => (
          <View
            key={item.id}
            style={{
              backgroundColor: '#f3f4f6',
              padding: 15,
              borderRadius: 10,
              marginBottom: 10,
            }}>
            <Text style={{ fontWeight: 'bold', marginBottom: 5 }}>📅 {item.fecha}</Text>

            <Text>Hemoglobina: {item.hemoglobina}</Text>
            <Text>Hematocrito: {item.hematocrito}</Text>
            <Text>Glóbulos Rojos: {item.globulosRojos}</Text>
            <Text>VCM: {item.vcm}</Text>
            <Text>HCM: {item.hcm}</Text>
            <Text>CHCM: {item.chcm}</Text>

            <Text style={{ marginTop: 10, fontWeight: 'bold' }}>🩺 Diagnóstico:</Text>
            <Text>{item.diagnostico}</Text>

            <Text style={{ marginTop: 5, fontWeight: 'bold' }}>📋 Recomendación:</Text>
            <Text testID="rango">{item.recomendaciones}</Text>
          </View>
        ))
      )}
    </ScrollView>
  );
};
