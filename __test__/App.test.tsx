import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import App from '../app/index'; // ajustá la ruta si tu componente está en otro lugar

describe('Formulario de análisis de laboratorio', () => {
  test('permite rellenar todos los campos del formulario', () => {
    const { getByTestId, queryByText } = render(<App />);

    // Obtener inputs por su testID único (asegurate de asignarlos en los inputs)
    const hemoglobinaInput = getByTestId('hemoglobina');
    const hematocritoInput = getByTestId('hematocrito');
    const globulosRojosInput = getByTestId('globulosRojos');
    const vcmInput = getByTestId('vcm');
    const hcmInput = getByTestId('hcm');
    const chcmInput = getByTestId('chcm');

    // Simular ingreso de valores
    fireEvent.changeText(hemoglobinaInput, '14');
    fireEvent.changeText(hematocritoInput, '42');
    fireEvent.changeText(globulosRojosInput, '4.8');
    fireEvent.changeText(vcmInput, '88');
    fireEvent.changeText(hcmInput, '30');
    fireEvent.changeText(chcmInput, '33');

    // Simular clic en "Analizar sangre"
    const analizarBtn = getByTestId('analizarBtn');
    fireEvent.press(analizarBtn);

    // Verificar que no hay errores visibles
    expect(queryByText(/Te falta completar los datos/i)).toBeNull();
  });

  test('muestra mensaje de error si faltan campos', () => {
    const { getByTestId, queryByText } = render(<App />);

    // Simular clic en "Analizar sangre" sin completar nada
    const analizarBtn = getByTestId('analizarBtn');
    fireEvent.press(analizarBtn);

    // Esperamos que aparezca mensaje de error
    expect(queryByText(/Te falta completar los datos/i)).toBeTruthy();
  });
});
