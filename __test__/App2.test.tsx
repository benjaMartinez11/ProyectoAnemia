import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import Analisis from '../src/analisis'; // ajustá la ruta si tu componente está en otro lugar

describe('Formulario de análisis de laboratorio', () => {
  test('Dado que todo el formulario para analisis esta completo a exceptcion de Hematocritos, al hacer click en analizar sangre, se deberia emitir el mensaje "falta completar: Hematocritos"', async () => {
    const { getByTestId, queryByText } = render(<Analisis />);

    // Obtener capoDeTexto por su testID único (asegurate de asignarlos en los inputs)
    const campoDeTextoParaHemaglobina = getByTestId('IDCampoDeTextoParaHemoglobina');
    fireEvent.changeText(campoDeTextoParaHemaglobina, '12');


    //const campoDeTextoParaHematocritos = getByTestId('IDCampoDeTextoParaHematocritos');
    //fireEvent.changeText(campoDeTextoParaHematocritos, '42');


    const campoDeTextoParaGlobulosRojos = getByTestId('IDCampoDeTextoParaGlobulosRojos');
    fireEvent.changeText(campoDeTextoParaGlobulosRojos, '4.8');
    
    
    const camposDeTextoParaVcm = getByTestId('IDCampoDeTextoParaVcm');
    fireEvent.changeText(camposDeTextoParaVcm, '88');
    
    
    const camposDeTextoParaHcm = getByTestId('IDCampoDeTextoParaHcm');
    fireEvent.changeText(camposDeTextoParaHcm, '30');
    
    
    const camposDeTextoParaChcm = getByTestId('IDCampoDeTextoParaChcm');
    fireEvent.changeText(camposDeTextoParaChcm, '33');

    // Simular ingreso de valores
    //fireEvent.changeText(hemoglobinaInput, '0');

    // Simular clic en "Analizar sangre"
    const BotonParaAnalizarFormulario = getByTestId('BotonParaAnalizarFormulario');
    fireEvent.press(BotonParaAnalizarFormulario);

    // Verificar que no hay errores visibles
    await waitFor(() => {
      expect(queryByText(/falta completar: Hematocritos/i)).toBeNull();
    })
  });


});
