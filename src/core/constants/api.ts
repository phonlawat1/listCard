// Base URLs
export const API_BASE_URL = "https://api.example.com";

export const API_TIMEOUT = 30000; // 30 seconds

// Request headers
export const DEFAULT_HEADERS = {
  "Content-Type": "application/json",
};

// Retry configuration
export const RETRY_CONFIG = {
  maxRetries: 3,
  retryDelay: 1000, // ms
  retryableStatuses: [408, 429, 500, 502, 503, 504],
};

export default {
  API_BASE_URL,
  API_TIMEOUT,
  DEFAULT_HEADERS,
  RETRY_CONFIG,
};
