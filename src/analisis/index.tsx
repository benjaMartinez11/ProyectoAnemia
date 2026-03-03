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
      <Text style={styles.title}>Ingrese sus valores de laboratorio</Text>

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
        <Text style={styles.buttonText}>Analizar sangre</Text>
      </TouchableOpacity>

      <Text style={styles.subtitle}>Suba un PDF o imagen</Text>

      <TouchableOpacity style={styles.uploadBox} onPress={handleFileUpload}>
        <Upload size={28} color="#4b4bff" />
        <Text style={styles.uploadText}>
          {selectedFile ? 'Cambiar archivo' : 'Seleccionar archivo'}
        </Text>
      </TouchableOpacity>

      {selectedFile && (
        <Text style={styles.successText}>Archivo seleccionado: {selectedFile.name}</Text>
      )}

      {errorMessage?.length > 0 && <Text style={styles.errorText}>{errorMessage}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  title: { fontSize: 20, fontWeight: '700', marginBottom: 10 },
  row: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  button: {
    backgroundColor: '#ccc',
    padding: 12,
    borderRadius: 8,
    marginTop: 10,
    alignItems: 'center',
  },
  buttonText: { fontWeight: '600', fontSize: 16 },
  subtitle: { marginTop: 20, fontWeight: '600', color: '#333' },
  uploadBox: {
    marginTop: 10,
    padding: 16,
    borderWidth: 2,
    borderColor: '#4b4bff',
    borderRadius: 10,
    alignItems: 'center',
  },
  uploadText: { marginTop: 8, fontSize: 14, color: '#4b4bff' },
  successText: { marginTop: 10, color: 'green' },
  errorText: { marginTop: 10, color: 'red' },
});
