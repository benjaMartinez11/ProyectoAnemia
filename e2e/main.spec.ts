import { test, expect } from '@playwright/test';

const BASE_URL = 'http://127.0.0.1:8000';

test('debe devolver estado Normal cuando todos los valores están en rango', async ({ request }) => {
  const response = await request.post(`${BASE_URL}/analisis`, {
    data: {
      hemoglobina: 15.0,
      hematocrito: 45.0,
      globulosRojos: 5.0,
      vcm: 90.0,
      hcm: 30.0,
      chcm: 34.0
    }
  });

  expect(response.ok()).toBeTruthy();

  const body = await response.json();

  expect(body.status).toBe('Análisis Completado');
  expect(body.estado_general).toBe('Normal');
  expect(body.alertas).toHaveLength(0);
});


test('debe devolver estado Alterado cuando hay valores fuera de rango', async ({ request }) => {
  const response = await request.post(`${BASE_URL}/analisis`, {
    data: {
      hemoglobina: 18.5,   // Alto
      hematocrito: 55.0,   // Alto
      globulosRojos: 6.5,  // Alto
      vcm: 105.0,          // Alto
      hcm: 35.0,           // Alto
      chcm: 37.0           // Alto
    }
  });

  expect(response.ok()).toBeTruthy();

  const body = await response.json();

  expect(body.estado_general).toBe('Alterado');
  expect(body.alertas.length).toBeGreaterThan(0);
  expect(body.alertas).toContain('hemoglobina en nivel Alto');
});