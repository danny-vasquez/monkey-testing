const { test, expect } = require("@playwright/test");

test.describe("Los estudiantes under monkeys", () => {
  test("visits los estudiantes and survives monkeys", async ({ page }) => {
    await page.goto("https://losestudiantes.com");
    await page.waitForTimeout(2000);
    await randomEvent(page, 20);
  });
});

async function randomEvent(page, eventsLeft) {
  if (eventsLeft <= 0) return;

  // Selección aleatoria del tipo de evento
  const eventTypes = ["clickLink", "fillInput", "selectCombo", "clickButton"];
  const randomEventType = eventTypes[Math.floor(Math.random() * eventTypes.length)];

  try {
    //ejecuta el evento seleccionado aleatoriamente
    switch (randomEventType) {
      case "clickLink":
        await randomClick(page, "a");
        break;
      case "fillInput":
        await randomFill(page);
        break;
      case "selectCombo":
        await randomSelect(page);
        break;
      case "clickButton":
        await randomClick(page, "button");
        break;
    }
  } catch (error) {
    console.log(`Error en el try ${randomEventType}:`, error);
  }

  await page.waitForTimeout(1000);

  await randomEvent(page, eventsLeft - 1);

}

async function randomClick(page, selector) {
  const elements = await page.$$(selector);
  if (elements.length === 0) return;

  const randomEl = elements[getRandomInt(0, elements.length)];
  if (await randomEl.isVisible()) {
    try {
      await randomEl.click({ force: true });
      console.log(`-->se clickea en ${selector}`);
    } catch (error) {
      console.log("--->No se pudo hacer click --->", error);
    }
  }
}

async function randomFill(page) {

  //inputs de tipo texto, email o sin tipo
  const inputs = await page.$$("input[type='text'], input[type='email'], input:not([type])");
  if (inputs.length === 0) return;

  const randomInput = inputs[getRandomInt(0, inputs.length)];
  if (await randomInput.isVisible()) {
    try {

      const randomText = Math.random().toString(36).substring(7);
      await randomInput.fill(randomText);

      console.log(`--> llenando input con: ${randomText}`);
    } catch (error) {
      console.log("--_>No se pudo llenar input:", error);
    }
  }
}

async function randomSelect(page) {
  const selects = await page.$$("select");
  if (selects.length === 0) return;

  const randomSelect = selects[getRandomInt(0, selects.length)];
  if (await randomSelect.isVisible()) {
    try {
      const options = await randomSelect.$$("option");
      if (options.length > 1) {
        const randomIndex = getRandomInt(0, options.length);
        const value = await options[randomIndex].getAttribute("value");
        await randomSelect.selectOption(value);
        console.log(`-->se selecciona opción: ${value}`);
      }
    } catch (error) {
      console.log("--->No se pudo seleccionar el combo:", error);
    }
  }
}

//generador de enteros aleatorios en un rango
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}
