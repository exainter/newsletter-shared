/**
 * SDK Client Wrapper
 * Wraps the auto-generated SDK client and adds base URL support
 * Uses a global fetch interceptor to prepend the configured API base URL
 */

import { getApiBaseUrl } from "../config/index.js";
import * as generatedClient from "./client.js";

// Store the original global fetch
const originalFetch = globalThis.fetch;

// Create a custom fetch that resolves URLs using the configured base URL
function createFetchInterceptor(baseUrl: string) {
  return async function fetchWithBaseUrl(
    url: string | Request,
    options?: RequestInit,
  ): Promise<Response> {
    let urlString: string;

    if (typeof url === "string") {
      urlString = url;
    } else {
      urlString = url.url;
    }

    // Prepend base URL to relative paths
    const fullUrl = urlString.startsWith("http") ? urlString : `${baseUrl}${urlString}`;

    return originalFetch(fullUrl, options);
  };
}

/**
 * Initialize the SDK with the configured base URL
 * This sets up a global fetch interceptor for all SDK calls
 */
export function initializeSDKFetch(): void {
  const baseUrl = getApiBaseUrl();
  const fetchInterceptor = createFetchInterceptor(baseUrl);

  // Override global fetch
  (globalThis as any).fetch = fetchInterceptor;
}

/**
 * Create SDK client with configured base URL
 * The client uses the global fetch which should be intercepted
 */
export function createSDKClient() {
  const baseUrl = getApiBaseUrl();

  // Ensure fetch is intercepted
  if ((globalThis as any).fetch === originalFetch) {
    initializeSDKFetch();
  }

  return {
    // Health endpoints
    healthHealthGet: async (options?: RequestInit) => {
      return generatedClient.healthHealthGet(options);
    },
    healthzHealthzGet: async (options?: RequestInit) => {
      return generatedClient.healthzHealthzGet(options);
    },

    // User endpoints
    userMeUserMeGet: async (options?: RequestInit) => {
      return generatedClient.userMeUserMeGet(options);
    },

    // Campaign endpoints
    listCampaignsCampaignsGet: async (
      params: generatedClient.ListCampaignsCampaignsGetParams,
      options?: RequestInit,
    ) => {
      return generatedClient.listCampaignsCampaignsGet(params, options);
    },

    // Insights endpoints
    getAggregatedInsightsInsightsGet: async (
      params?: generatedClient.GetAggregatedInsightsInsightsGetParams,
      options?: RequestInit,
    ) => {
      return generatedClient.getAggregatedInsightsInsightsGet(params, options);
    },

    // Events endpoints
    byCampaignEventsByCampaignGet: async (
      params: generatedClient.ByCampaignEventsByCampaignGetParams,
      options?: RequestInit,
    ) => {
      return generatedClient.byCampaignEventsByCampaignGet(params, options);
    },
    byEmailEventsByEmailGet: async (
      params: generatedClient.ByEmailEventsByEmailGetParams,
      options?: RequestInit,
    ) => {
      return generatedClient.byEmailEventsByEmailGet(params, options);
    },

    // Get the current base URL being used
    getBaseUrl: () => baseUrl,
  };
}

// Export generated client types
export * from "./client.js";

// Initialize fetch interceptor on module load
initializeSDKFetch();

// Create a default SDK client instance
export const defaultSDKClient = createSDKClient();

// Re-export convenience functions
export const healthHealthGet = defaultSDKClient.healthHealthGet;
export const healthzHealthzGet = defaultSDKClient.healthzHealthzGet;
export const userMeUserMeGet = defaultSDKClient.userMeUserMeGet;
export const listCampaignsCampaignsGet = defaultSDKClient.listCampaignsCampaignsGet;
export const getAggregatedInsightsInsightsGet =
  defaultSDKClient.getAggregatedInsightsInsightsGet;
export const byCampaignEventsByCampaignGet =
  defaultSDKClient.byCampaignEventsByCampaignGet;
export const byEmailEventsByEmailGet = defaultSDKClient.byEmailEventsByEmailGet;
