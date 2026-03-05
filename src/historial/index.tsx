import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';

export const SeccionDeHistorialDeResultados = ({ datos }: any) => {
  return (
    <View style={styles.screen}>
      <ScrollView contentContainerStyle={styles.container}>
        {datos.length === 0 ? (
          <Text style={styles.emptyText}>
            No hay análisis guardados.
          </Text>
        ) : (
          datos.map((item: any) => (
            <View key={item.id} style={styles.card}>
              <Text style={styles.date}>📅 {item.fecha}</Text>

              <View style={styles.separator} />

              <View style={styles.row}>
                <Text style={styles.label}>Hemoglobina</Text>
                <Text style={styles.value}>{item.hemoglobina}</Text>
              </View>

              <View style={styles.row}>
                <Text style={styles.label}>Hematocrito</Text>
                <Text style={styles.value}>{item.hematocrito}</Text>
              </View>

              <View style={styles.row}>
                <Text style={styles.label}>Glóbulos Rojos</Text>
                <Text style={styles.value}>{item.globulosRojos}</Text>
              </View>

              <View style={styles.row}>
                <Text style={styles.label}>VCM</Text>
                <Text style={styles.value}>{item.vcm}</Text>
              </View>

              <View style={styles.row}>
                <Text style={styles.label}>HCM</Text>
                <Text style={styles.value}>{item.hcm}</Text>
              </View>

              <View style={styles.row}>
                <Text style={styles.label}>CHCM</Text>
                <Text style={styles.value}>{item.chcm}</Text>
              </View>

              <Text style={styles.sectionTitle}>🩺 DIAGNÓSTICO</Text>
              <Text style={styles.sectionText}>{item.diagnostico}</Text>

              <Text style={styles.sectionTitle}>📋 RECOMENDACIÓN</Text>
              <Text style={styles.sectionText} testID="rango">
                {item.recomendaciones}
              </Text>
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#EAF4FA', // fondo hospital suave
  },

  container: {
    padding: 20,
    paddingBottom: 40,
  },

  emptyText: {
    fontSize: 16,
    color: '#1A2A33',
    textAlign: 'center',
    marginTop: 40,
  },

  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 25,
    padding: 20,
    marginBottom: 20,
    elevation: 6,
  },

  date: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0F4C81',
    marginBottom: 10,
  },

  separator: {
    height: 1,
    backgroundColor: '#E0ECF5',
    marginBottom: 15,
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },

  label: {
    color: '#1A2A33',
    fontWeight: '600',
  },

  value: {
    color: '#1565C0',
    fontWeight: '700',
  },

  sectionTitle: {
    marginTop: 15,
    fontWeight: '700',
    color: '#0F4C81',
  },

  sectionText: {
    marginTop: 5,
    color: '#1A2A33',
    lineHeight: 20,
  },
});