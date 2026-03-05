import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import { Upload } from 'lucide-react-native';
import { LabInputField } from '../analisis/componentes';

export default function AnalisisScreen({ labValues, onChange, onAnalyze, errorMessage }: any) {
  const [selectedFile, setSelectedFile] = useState<any>(null);

  const handleFileUpload = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: ['application/pdf', 'image/*'],
      multiple: false,
    });

    if (result.canceled) return;

    const file = result.assets[0];
    setSelectedFile(file);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>INGRESO DE PARÁMETROS HEMATOLÓGICOS</Text>

      <View style={styles.row}>
        <LabInputField
          label="Hemoglobina"
          unit="g/dL"
          value={labValues.hemoglobina}
          onChange={onChange}
          fieldName="hemoglobina"
          testID="hemoglobina"
        />
        <LabInputField
          label="Hematocrito"
          unit="%"
          value={labValues.hematocrito}
          onChange={onChange}
          fieldName="hematocrito"
          testID="hematocrito"
        />
      </View>

      <View style={styles.row}>
        <LabInputField
          label="Glóbulos Rojos"
          unit="M/μL"
          value={labValues.globulosRojos}
          onChange={onChange}
          fieldName="globulosRojos"
          testID="globulosRojos"
        />
        <LabInputField
          label="VCM"
          unit="fL"
          value={labValues.vcm}
          onChange={onChange}
          fieldName="vcm"
          testID="vcm"
        />
      </View>

      <View style={styles.row}>
        <LabInputField
          label="HCM"
          unit="pg"
          value={labValues.hcm}
          onChange={onChange}
          fieldName="hcm"
          testID="hcm"
        />
        <LabInputField
          label="CHCM"
          unit="g/dL"
          value={labValues.chcm}
          onChange={onChange}
          fieldName="chcm"
          testID="chcm"
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={onAnalyze}>
        <Text style={styles.buttonText}>ANALIZAR SANGRE</Text>
      </TouchableOpacity>

      <Text style={styles.subtitle}>CARGA DE ESTUDIO MÉDICO</Text>

      <TouchableOpacity style={styles.uploadBox} onPress={handleFileUpload}>
        <Upload size={28} color="#00E5FF" />
        <Text style={styles.uploadText}>
          {selectedFile ? 'CAMBIAR ARCHIVO' : 'SELECCIONAR ARCHIVO'}
        </Text>
      </TouchableOpacity>

      {selectedFile && (
        <Text style={styles.successText}>
          ✔ Archivo cargado: {selectedFile.name}
        </Text>
      )}

      {errorMessage?.length > 0 && (
        <Text style={styles.errorText}>{errorMessage}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },

  title: {
    fontSize: 16,
    fontWeight: '700',
    color: '#AEEFFF',
    letterSpacing: 2,
    marginBottom: 20,
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },

  button: {
    marginTop: 20,
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: 'center',
    backgroundColor: '#00E5FF',
    shadowColor: '#00E5FF',
    shadowOpacity: 0.4,
    shadowRadius: 15,
    elevation: 8,
  },

  buttonText: {
    fontWeight: '700',
    fontSize: 15,
    letterSpacing: 2,
    color: '#06141F',
  },

  subtitle: {
    marginTop: 30,
    fontWeight: '600',
    fontSize: 13,
    letterSpacing: 2,
    color: '#4FDFFF',
  },

  uploadBox: {
    marginTop: 15,
    padding: 20,
    borderWidth: 1,
    borderColor: '#12394D',
    borderRadius: 16,
    alignItems: 'center',
    backgroundColor: '#0C1F2A',
  },

  uploadText: {
    marginTop: 10,
    fontSize: 13,
    letterSpacing: 1.5,
    color: '#00E5FF',
  },

  successText: {
    marginTop: 15,
    color: '#00FFB2',
    fontWeight: '600',
    letterSpacing: 1,
  },

  errorText: {
    marginTop: 15,
    color: '#FF4D6D',
    fontWeight: '600',
    letterSpacing: 1,
  },
});