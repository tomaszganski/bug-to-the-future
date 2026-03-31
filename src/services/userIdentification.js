import { UAParser } from "ua-parser-js";

const USER_ID_KEY = "bug-to-future-user-id";

function joinLabel(...parts) {
  return parts.filter(Boolean).join(" ").trim();
}

/**
 * Parsed navigator.userAgent for analytics (browser, device class, OS).
 * Safe in SSR/tests: returns empty strings when navigator is missing.
 */
export function getClientInfo() {
  const ua =
    typeof navigator !== "undefined" && navigator.userAgent
      ? navigator.userAgent
      : "";
  const parser = new UAParser(ua);
  const r = parser.getResult();

  const deviceType = r.device?.type || "desktop";
  const deviceDetail = joinLabel(r.device?.vendor, r.device?.model);
  const device =
    deviceDetail.length > 0 ? `${deviceType} (${deviceDetail})` : deviceType;

  return {
    userAgent: ua,
    browser: joinLabel(r.browser?.name, r.browser?.version),
    deviceType,
    device,
    os: joinLabel(r.os?.name, r.os?.version),
  };
}

export function getUserId() {
  let userId = localStorage.getItem(USER_ID_KEY);

  if (!userId) {
    userId = crypto.randomUUID();
    localStorage.setItem(USER_ID_KEY, userId);
  }

  return userId;
}

export async function getIpAddress() {
  try {
    const response = await fetch("https://api.ipify.org?format=json");
    if (!response.ok) {
      return "unknown";
    }
    const data = await response.json();
    return data.ip || "unknown";
  } catch {
    return "unknown";
  }
}

export async function getUserIdentification() {
  const userId = getUserId();
  const ipAddress = await getIpAddress();
  const client = getClientInfo();

  return { userId, ipAddress, client };
}
