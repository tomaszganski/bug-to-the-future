const USER_ID_KEY = "bug-to-future-user-id";

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

  return { userId, ipAddress };
}
