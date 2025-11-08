// src/config/api.ts

/**
 * URL Base de tu Backend (Node.js/Express)
 * * NOTA CRÍTICA:
 * - NO uses 'localhost' o '127.0.0.1' si estás probando en un teléfono físico o emulador.
 * - Debes usar la IP local (LAN) de tu máquina host.
 * - Asegúrate de que el puerto (3000) esté expuesto en tu docker-compose.yml.
 */
export const API_URL = "http://192.168.0.104:3000";
// Reemplaza '192.168.1.100' con la IP de tu computadora en tu red Wi-Fi.

// Opcional: Si usas Expo Go con el túnel (más lento, pero no requiere IP local)
// export const API_URL = 'https://tunel-de-expo.ngrok.io';
