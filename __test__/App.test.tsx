import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import App from '../app/index'; // ajustá la ruta si tu componente está en otro lugar

describe('Formulario de análisis de laboratorio', () => {
  test('permite rellenar todos los campos del formulario', () => {
    const { getByLabelText, getByText, queryByText } = render(<App />);

    // Obtener inputs por su label único
    const hemoglobinaInput = getByLabelText(/Hemoglobina-hemoglobina/i);
    const hematocritoInput = getByLabelText(/Hematocrito-hematocrito/i);
    const globulosRojosInput = getByLabelText(/Glóbulos Rojos-globulosRojos/i);
    const vcmInput = getByLabelText(/VCM-vcm/i);
    const hcmInput = getByLabelText(/HCM-hcm/i);
    const chcmInput = getByLabelText(/CHCM-chcm/i);

    // Simular ingreso de valores
    fireEvent.changeText(hemoglobinaInput, '14');
    fireEvent.changeText(hematocritoInput, '42');
    fireEvent.changeText(globulosRojosInput, '4.8');
    fireEvent.changeText(vcmInput, '88');
    fireEvent.changeText(hcmInput, '30');
    fireEvent.changeText(chcmInput, '33');

    // Simular clic en "Analizar sangre"
    const analizarBtn = getByRole('button', { name: /Analizar sangre/i });
    fireEvent.click(analizarBtn);

    // Verificar que no hay errores visibles
    expect(queryByText(/Te falta completar los datos/i)).toBeNull();
  });

  test('muestra mensaje de error si faltan campos', () => {
    const { getByText, queryByText } = render(<App />);

    // Simular clic en "Analizar sangre" sin completar nada
    const analizarBtn = getByRole('button', { name: /Analizar sangre/i });
    fireEvent.click(analizarBtn);

    // Esperamos que aparezca mensaje de error
    expect(queryByText(/Te falta completar los datos/i)).toBeTruthy();
  });
});
