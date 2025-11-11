import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import App from '../app/index'; // 👈 Ajustá esta ruta si tu componente está en otro lugar

describe('Formulario de análisis de laboratorio', () => {
  test('permite rellenar todos los campos del formulario', () => {
    const { getByLabelText, getByText } = render(<App />);

    // Obtener inputs por su label
    const hemoglobinaInput = getByLabelText(/Hemoglobina/i);
    const hematocritoInput = getByLabelText(/Hematocrito/i);
    const globulosRojosInput = getByLabelText(/Glóbulos Rojos/i);
    const vcmInput = getByLabelText(/VCM/i);
    const hcmInput = getByLabelText(/HCM/i);
    const chcmInput = getByLabelText(/CHCM/i);

    // Simular ingreso de valores
    fireEvent.changeText(hemoglobinaInput, '14');
    fireEvent.changeText(hematocritoInput, '42');
    fireEvent.changeText(globulosRojosInput, '4.8');
    fireEvent.changeText(vcmInput, '88');
    fireEvent.changeText(hcmInput, '30');
    fireEvent.changeText(chcmInput, '33');

    // Simular análisis
    const analizarBtn = getByText(/Analizar sangre/i);
    fireEvent.press(analizarBtn);

    // Verificar que ya no hay errores visibles
    expect(() => getByText(/Te falta completar los datos/i)).toThrow();
  });

  test('muestra mensaje de error si faltan campos', () => {
    const { getByText, queryByText } = render(<App />);

    // Simular clic en "Analizar sangre" sin completar nada
    const analizarBtn = getByText(/Analizar sangre/i);
    fireEvent.press(analizarBtn);

    // Esperamos que aparezca mensaje de error
    expect(queryByText(/Te falta completar los datos/i)).toBeTruthy();
  });
});
