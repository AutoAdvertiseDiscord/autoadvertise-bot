import crypto from "crypto";

/**
 * Generates a license key in XXXX-XXXX-XXXX-XXXX format
 */
export function generateLicenseKey(): string {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  const segments = 4;
  const segmentLength = 4;

  return Array.from({ length: segments }, () =>
    Array.from(
      { length: segmentLength },
      () => chars[crypto.randomInt(chars.length)],
    ).join(""),
  ).join("-");
}

/**
 * Calculates expiry date from durationDays (null = lifetime)
 */
export function calculateExpiry(durationDays: number | null): Date | null {
  if (durationDays === null) return null;
  const expiry = new Date();
  expiry.setDate(expiry.getDate() + durationDays);
  return expiry;
}
