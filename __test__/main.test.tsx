import { test, expect } from '@playwright/test';

test('should analyze blood values correctly (caso normal)', async ({ request }) => {

  const response = await request.post('http://127.0.0.1:8000/analisis', {
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
  expect(body.alertas).toEqual([]);
});