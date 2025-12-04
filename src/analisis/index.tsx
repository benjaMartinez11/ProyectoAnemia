import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import { Upload, FlaskConical } from 'lucide-react-native';
import { LabInputField } from './componentes';


export default function AnalisisScreen() {
  const [selectedFile, setSelectedFile] = useState<any>(null);
  const [errorMessage, setErrorMessage] = useState('');

  const [labValues, setLabValues] = useState({
    hemoglobina: '',
    hematocrito: '',
    globulosRojos: '',
    vcm: '',
    hcm: '',
    chcm: '',
  });

  const handleInputChange = (field: string, value: string) => {
    setLabValues((prev) => ({ ...prev, [field]: value }));
  };

  const handleAnalyze = () => {
    const faltantes: string[] = [];

    Object.entries(labValues).forEach(([key, val]) => {
      if (!val) faltantes.push(key);
    });

    if (faltantes.length) {
      setErrorMessage('Faltan completar: ' + faltantes.join(', '));
      return;
    }

    setErrorMessage('');
    console.log('Analizando...', labValues);
  };

  // 📌 Selección de archivo con Expo DocumentPicker
  const handleFileUpload = async () => {
    setErrorMessage('');

    const result = await DocumentPicker.getDocumentAsync({
      type: ['application/pdf', 'image/*'],
      multiple: false,
    });

    if (result.canceled) return;

    const file = result.assets[0];

    if (file.size! > 10 * 1024 * 1024) {
      setErrorMessage('El archivo supera los 10 MB.');
      return;
    }

    setSelectedFile(file);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ingrese sus valores de laboratorio</Text>

      {/* 📌 Inputs */}
      <View style={styles.row}>
        <LabInputField
          label="IDCampoDeTextoParaHemoglobina"
          unit="g/dL"
          value={labValues.hemoglobina}
          onChange={handleInputChange}
          fieldName="IDCampoDeTextoParaHemoglobina"
          testID="IDCampoDeTextoParaHemoglobina"
          />
        <LabInputField
          label="IDCampoDeTextoParaHematocritos"
          unit="%"
          value={labValues.hematocrito}
          onChange={handleInputChange}
          fieldName="IDCampoDeTextoParaHematocritos"
          testID="IDCampoDeTextoParaHematocritos"
        />
      </View>

      <View style={styles.row}>
        <LabInputField
          label="IDCampoDeTextoParaGlobulosRojos"
          unit="M/μL"
          value={labValues.globulosRojos}
          onChange={handleInputChange}
          fieldName="IDCampoDeTextoParaGlobulosRojos"
          testID='IDCampoDeTextoParaGlobulosRojos'
        />
        <LabInputField
          label="IDCampoDeTextoParaVcm"
          unit="fL"
          value={labValues.vcm}
          onChange={handleInputChange}
          fieldName="IDCampoDeTextoParaVcm"
          testID='IDCampoDeTextoParaVcm'
        />
      </View>

      <View style={styles.row}>
        <LabInputField
          label="IDCampoDeTextoParaHcm"
          unit="pg"
          value={labValues.hcm}
          onChange={handleInputChange}
          fieldName="IDCampoDeTextoParaHcm"
          testID='IDCampoDeTextoParaHcm'
        />
        <LabInputField
          label="IDCampoDeTextoParaChcm"
          unit="g/dL"
          value={labValues.chcm}
          onChange={handleInputChange}
          fieldName="IDCampoDeTextoParaChcm"
          testID='IDCampoDeTextoParaChcm'
        />
      </View>

      {/* 📌 Botón analizar */}
      <TouchableOpacity style={styles.button} onPress={handleAnalyze} testID="BotonParaAnalizarFormulario">
        <Text style={styles.buttonText}>Analizar sangre</Text>
      </TouchableOpacity>

      {/* 📌 Subida de archivo */}
      <Text style={styles.subtitle}>Suba un PDF o imagen (máx. 10 MB)</Text>

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
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
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
    justifyContent: 'center',
  },
  uploadText: { marginTop: 8, fontSize: 14, color: '#4b4bff' },
  successText: { marginTop: 10, color: 'green', fontSize: 14 },
  errorText: { marginTop: 10, color: 'red', fontSize: 14 },
});
