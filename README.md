# Conversor de Divisas

Esta es una aplicación web simple que permite convertir montos de una divisa a otra utilizando los tipos de cambio proporcionados por el usuario.

## Características

- Conversión de divisas basada en tipos de cambio personalizados.
- Selección de divisa de origen y divisa extranjera.
- Ingreso de valores de compra y venta de dólar para las divisas seleccionadas.
- Cálculo automático de la cantidad convertida al ingresar un monto a convertir.
- Formato de moneda para los montos convertidos.

## Requisitos

- Node.js
- npm (Node Package Manager)

## Instalación

1. Clona este repositorio en tu máquina local:

   ```bash
   git clone https://github.com/tu-usuario/conversor-de-divisas.git
   ```

2. Ve al directorio del proyecto:

   ```bash
   cd conversor-de-divisas
   ```

3. Instala las dependencias del proyecto:

   ```bash
   npm install
   ```

4. Inicia la aplicación:

   ```bash
   npm start
   ```

   La aplicación estará disponible en [http://localhost:3000](http://localhost:3000).

## Personalización

Puedes personalizar las divisas disponibles y sus tipos de cambio editando el archivo `src/currencies.js`. Asegúrate de seguir el formato correcto y reinicia la aplicación para que los cambios surtan efecto.

## Contribuciones

¡Las contribuciones son bienvenidas! Si encuentras algún problema o tienes una mejora que proponer, por favor crea un issue o envía una solicitud de pull.

## Licencia

Este proyecto está bajo la licencia [MIT](LICENSE).