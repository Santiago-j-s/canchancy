/**
 * API base URL for field availability
 */
export const API_BASE_URL = "https://alquilatucancha.com/api/v3";

/**
 * Field IDs for different locations according to ATC API
 */
export const FIELDS = {
  CASTRO: {
    id: "1061",
    name: "Castro",
  },
  GOLAZO: {
    id: "1625",
    name: "Golazo",
  },
} as const;

/**
 * Number of days to show in the availability calendar
 */
export const DAYS_TO_SHOW = 7;

/**
 * Timezone for date/time operations
 */
export const TIMEZONE = "America/Argentina/Buenos_Aires";
