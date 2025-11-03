# Monkey-testing ->Danny Javier Vasquez Ceron

## Descripción:
Este proyecto implementa pruebas automatizadas de monkey-testing utilizando Playwright en JavaScript. El objetivo es garantizar la estabilidad y el correcto funcionamiento de la aplicación a través de pruebas aleatorias e impredecibles.

## versiones utilizadas:
- node v23.10.0
- npm 11.6.2
- playwright 1.56.1

## Entorno donde se ejecutó: 
- WSL2 - Ubuntu 22.04.3 LTS
- Visual Studio Code

## Pasos para ejecutar las pruebas:

1. Clonar o descomprimir el repositorio
2. Acceder a la carpeta del proyecto
   ```
   cd monkey-testing
   ```
3. Instalar las dependencias con el comando:
    ```
    npm install
    ```
4. Ejecutar las pruebas con el comando:
    ```
    npx playwright test monkey.spec.js
    ```
    (Opcional) Para ver el reporte en tiempo real, ejecutar:
    ```
    npx playwright test monkey.spec.js --headed
    ```

## Visualización de reportes:
Después de ejecutar las pruebas, en la carpeta playwright-report se generará un reporte index.html con los resultados de las pruebas. Puede abrirse con cualquier navegador web o utilizando Live Server en Visual Studio Code.