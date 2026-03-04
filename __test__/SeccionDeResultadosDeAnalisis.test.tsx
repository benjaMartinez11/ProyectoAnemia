import React from 'react';
import { render } from '@testing-library/react-native';
import { SeccionDeResultadosDeAnalisis } from '../src/resultados';

describe('SeccionDeResultadosDeAnalisis', () => {

  it('muestra mensaje cuando no hay datos', () => {
    const { getByText } = render(
      <SeccionDeResultadosDeAnalisis datos={null} />
    );

    expect(getByText('No hay resultados para mostrar.')).toBeTruthy();
  });

  it('muestra En rango cuando el valor es normal', () => {
    const datosMock = {
      fecha: '2026-03-04',
      hemoglobina: '14',
      hematocrito: '40',
      globulosRojos: '5',
      vcm: '90',
      hcm: '30',
      chcm: '33',
      diagnostico: 'Normal',
      recomendaciones: 'Ninguna'
    };

    const { getAllByText } = render(
      <SeccionDeResultadosDeAnalisis datos={datosMock} />
    );

    expect(getAllByText('✅ En rango').length).toBeGreaterThan(0);
  });

  it('muestra Fuera de rango cuando el valor es bajo', () => {
    const datosMock = {
      fecha: '2026-03-04',
      hemoglobina: '10',
      hematocrito: '30',
      globulosRojos: '3',
      vcm: '70',
      hcm: '20',
      chcm: '28',
      diagnostico: 'Posible anemia',
      recomendaciones: 'Consultar médico'
    };

    const { getAllByText } = render(
      <SeccionDeResultadosDeAnalisis datos={datosMock} />
    );

    expect(getAllByText('❌ Fuera de rango').length).toBeGreaterThan(0);
  });

});