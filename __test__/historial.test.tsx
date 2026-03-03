import { test, expect } from '@playwright/test';

test('debe mostrar mensaje positivo cuando los valores están en rango', async ({ page }) => {
  await page.goto('http://localhost:8081/');

  const hemoglobina = page.getByTestId('hemoglobina');
  await hemoglobina.click();
  await hemoglobina.fill('');
  await hemoglobina.type('12');
  await page.getByTestId('hematocrito').fill('36');
  await page.getByTestId('globulosRojos').fill('4');
  await page.getByTestId('vcm').fill('80');
  await page.getByTestId('hcm').fill('27');
  await page.getByTestId('chcm').fill('30');

  await page.getByText('Analizar sangre').click();

  // 👇 Forzamos ir a Historial
  await page.getByText('Historial').click();
  await expect(page.getByText('Todos los parámetros están dentro de rango.')).toBeVisible();
});

test('debe mostrar advertencia cuando hay valores fuera de rango', async ({ page }) => {
  await page.goto('http://localhost:8081/');
  await page.waitForLoadState('networkidle');

  const hemoglobina = page.getByTestId('hemoglobina');
  await hemoglobina.click();
  await hemoglobina.fill('');
  await hemoglobina.type('12');
  await page.getByTestId('hematocrito').fill('30');
  await page.getByTestId('globulosRojos').fill('3');
  await page.getByTestId('vcm').fill('120');
  await page.getByTestId('hcm').fill('40');
  await page.getByTestId('chcm').fill('20');

  await page.getByText('Analizar sangre').click();

  // 👇 Forzamos ir a Historial
  await page.getByText('Historial').click();

  await expect(page.getByTestId('rango')).toBeVisible();
});
