/**
 * Configuration for Newsletter SDK
 * Supports multiple environments: staging and production
 * Can be initialized with custom API base URL
 */

export type EnvironmentType = "staging" | "prod" | "custom";

export interface SDKConfig {
  apiBaseUrl: string;
  environment: EnvironmentType;
}

// Default configurations for different environments
const ENVIRONMENT_CONFIGS: Record<Exclude<EnvironmentType, "custom">, SDKConfig> = {
  staging: {
    apiBaseUrl: "https://postie-staging.exainter.com/api",
    environment: "staging",
  },
  prod: {
    apiBaseUrl: "https://api.postie.exainter.com",
    environment: "prod",
  },
};

// Global SDK configuration
let globalConfig: SDKConfig = ENVIRONMENT_CONFIGS.staging;

/**
 * Initialize SDK configuration with a specific environment
 * @param environment - The environment to configure (staging or prod)
 */
export function initializeSDK(environment: Exclude<EnvironmentType, "custom">): void {
  globalConfig = ENVIRONMENT_CONFIGS[environment];
}

/**
 * Initialize SDK configuration with custom API base URL
 * @param apiBaseUrl - Custom API base URL (e.g., https://custom.api.com)
 */
export function initializeSDKWithCustomUrl(apiBaseUrl: string): void {
  globalConfig = {
    apiBaseUrl,
    environment: "custom",
  };
}

/**
 * Get the current SDK configuration
 * @returns Current SDK configuration
 */
export function getSDKConfig(): SDKConfig {
  return globalConfig;
}

/**
 * Get the API base URL for SDK requests
 * @returns The configured API base URL
 */
export function getApiBaseUrl(): string {
  return globalConfig.apiBaseUrl;
}

/**
 * Reset configuration to default (staging)
 */
export function resetSDKConfig(): void {
  globalConfig = ENVIRONMENT_CONFIGS.staging;
}
