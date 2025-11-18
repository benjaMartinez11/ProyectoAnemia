import { View, Text, TextInput, StyleSheet } from 'react-native';

export const LabInputField = ({
  label,
  unit,
  value,
  onChange,
  fieldName,
}: {
  label: string;
  unit: string;
  value: string | number;
  onChange: (fieldName: string, value: string) => void;
  fieldName: string;
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>
        {label} <Text style={styles.unit}>({unit})</Text>
      </Text>

      <TextInput
        keyboardType="numeric"
        value={String(value)}
        onChangeText={(text) => onChange(fieldName, text)}
        style={styles.input}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 12,
    width: '48%',
  },
  label: {
    marginBottom: 4,
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  unit: {
    fontSize: 12,
    color: '#666',
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#aaa',
    borderRadius: 6,
    padding: 8,
    backgroundColor: '#fff',
    color: '#000',
  },
});
