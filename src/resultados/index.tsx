import { FlaskConicalIcon } from 'lucide-react-native';
import { View, Text } from 'react-native';

export const SeccionDeResultadosDeAnalisis = () => (
  <View className="p-4 text-center text-gray-600">
    <FlaskConicalIcon className="mx-auto mb-3 h-10 w-10 text-gray-400" />
    <Text>Aquí aparecerán los resultados de su análisis.</Text>
  </View>
);
