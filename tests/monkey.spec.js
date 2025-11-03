const { test, expect } = require("@playwright/test");

test.describe("Los estudiantes under monkeys", () => {
  test("visits los estudiantes and survives monkeys", async ({ page }) => {
    await page.goto("https://losestudiantes.com");
    await page.waitForTimeout(1000);
    await randomClick(page, 10);
  });
});

async function randomClick(page, monkeysLeft) {
  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }

  if (monkeysLeft > 0) {
    const links = await page.$$("a");
    if (links.length > 0) {
      const randomLink = links[getRandomInt(0, links.length)];
      const isVisible = await randomLink.isVisible();

      if (isVisible) {
        try {
          await randomLink.click();
          monkeysLeft = monkeysLeft - 1;
        } catch (error) {
          console.log("Could not click on element:", error);
        }
      }

      await page.waitForTimeout(1000);
      await randomClick(page, monkeysLeft);
    }
  }
}
