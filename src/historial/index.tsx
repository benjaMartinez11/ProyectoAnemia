import { CalendarIcon } from 'lucide-react-native';
import { View, Text } from 'react-native';

export const SeccionDeHistorialDeResultados = () => (
  <View className="p-4 text-center text-gray-600">
    <CalendarIcon className="mx-auto mb-3 h-10 w-10 text-gray-400" />
    <Text>Su historial de análisis se guardará aquí.</Text>
  </View>
);
