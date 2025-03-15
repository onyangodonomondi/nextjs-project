/**
 * Safely parse JSON without throwing exceptions
 * 
 * @param {string} jsonString - The JSON string to parse
 * @param {any} fallback - Optional fallback value if parsing fails
 * @returns {any} The parsed JSON or fallback value
 */
export function safeJsonParse(jsonString: string, fallback: any = null): any {
  try {
    return JSON.parse(jsonString);
  } catch (error) {
    console.error('JSON parse error:', error);
    return fallback;
  }
}

/**
 * Safely stringify an object to JSON without throwing exceptions
 * 
 * @param {any} value - The value to stringify
 * @param {string} fallback - Optional fallback string if stringify fails
 * @returns {string} The stringified JSON or fallback value
 */
export function safeJsonStringify(value: any, fallback: string = '{}'): string {
  try {
    return JSON.stringify(value);
  } catch (error) {
    console.error('JSON stringify error:', error);
    return fallback;
  }
} 