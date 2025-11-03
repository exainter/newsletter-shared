// Punto de entrada del paquete compartido.
// Exporta tipos, utilidades y el SDK generado desde OpenAPI.

export const version = "1.0.0-prod";

// Configuration exports
export {
  initializeSDK,
  initializeSDKWithCustomUrl,
  getSDKConfig,
  getApiBaseUrl,
  resetSDKConfig,
  type SDKConfig,
  type EnvironmentType,
} from "./config/index.js";

// SDK exports - types and client wrapper
export * from "./sdk/index.js";
