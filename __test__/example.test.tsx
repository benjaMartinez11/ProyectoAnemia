import { render } from '@testing-library/react-native';
import { Text } from 'react-native';

// Simulamos un componente simple para test
const HomeScreen = () => {
  return <Text>Welcome!</Text>;
};

describe('<HomeScreen />', () => {
  it('renders the welcome text', () => {
    const { getByText } = render(<HomeScreen />);
    // Comprueba que el texto esté en pantalla
    expect(getByText('Welcome!')).toBeTruthy();
  });
});
