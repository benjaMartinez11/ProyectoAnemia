import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

export const SeccionDeResultadosDeAnalisis = ({ datos }: any) => {
  if (!datos) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No hay resultados para mostrar.</Text>
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
      return { texto: '❌ Fuera de rango', color: '#D32F2F' };
    }

    return { texto: '✅ En rango', color: '#2E7D32' };
  };

  const renderItem = (label: string, key: string) => {
    const estado = verificarRango(key, datos[key]);

    return (
      <View style={styles.item}>
        <View style={styles.itemRow}>
          <Text style={styles.label}>{label}</Text>
          <Text style={styles.value}>{datos[key]}</Text>
        </View>
        <Text style={[styles.status, { color: estado.color }]}>
          {estado.texto}
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.screen}>
      <ScrollView style={styles.container}>
        <Text style={styles.title}>
          RESULTADO DEL ÚLTIMO ANÁLISIS
        </Text>

        <Text style={styles.dateText}>
          📅 Fecha: {datos.fecha}
        </Text>

        {renderItem('Hemoglobina', 'hemoglobina')}
        {renderItem('Hematocrito', 'hematocrito')}
        {renderItem('Glóbulos Rojos', 'globulosRojos')}
        {renderItem('VCM', 'vcm')}
        {renderItem('HCM', 'hcm')}
        {renderItem('CHCM', 'chcm')}

        <Text style={styles.sectionTitle}>🩺 DIAGNÓSTICO</Text>
        <Text style={styles.sectionText}>{datos.diagnostico}</Text>

        <Text style={styles.sectionTitle}>📋 RECOMENDACIÓN</Text>
        <Text style={styles.sectionText}>{datos.recomendaciones}</Text>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#EAF4FA', // fondo exterior
    padding: 15,
  },

  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 30, // 🔵 BIEN REDONDO
    padding: 20,
    elevation: 6,
  },

  emptyContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },

  emptyText: {
    color: '#1A2A33',
    fontSize: 16,
  },

  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0F4C81',
    letterSpacing: 2,
    marginBottom: 15,
  },

  dateText: {
    color: '#1565C0',
    fontWeight: '600',
    marginBottom: 20,
  },

  item: {
    marginBottom: 18,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#D0E3F0',
  },

  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  label: {
    color: '#1A2A33',
    fontSize: 15,
    fontWeight: '600',
  },

  value: {
    color: '#0F4C81',
    fontWeight: '700',
  },

  status: {
    marginTop: 6,
    fontWeight: '600',
    letterSpacing: 1,
  },

  sectionTitle: {
    marginTop: 25,
    color: '#0F4C81',
    fontWeight: '700',
    letterSpacing: 2,
  },

  sectionText: {
    marginTop: 6,
    color: '#1A2A33',
    lineHeight: 20,
  },
});