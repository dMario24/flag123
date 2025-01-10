/**
 * Extract Browser type from User-Agent header
 * @param userAgent - User-Agent string
 */
export function extractBrowserType(userAgent: string): string {

  if (userAgent.includes("Firefox")) return "Firefox";
  if (userAgent.includes("Whale")) return "Whale";
  if (userAgent.includes("Safari")) return "Safari";
  if (userAgent.includes("Edge")) return "Edge";
  if (userAgent.includes("Opera")) return "Opera";
  if (userAgent.includes("Chrome")) return "Chrome";
  return "unknown";
}
