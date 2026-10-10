import { HexclaveClientApp } from "@hexclave/react";

const getAnalyticsEnabled = () => {
  if (typeof window === "undefined") return true;
  try {
    const consent = localStorage.getItem("ratemylandlords_cookie_consent");
    if (consent) {
      const parsed = JSON.parse(consent);
      return parsed.analytics === true;
    }
  } catch (e) {
    // Ignore error
  }
  return false; // Default to false if no consent yet
};

export const hexclaveClientApp = new HexclaveClientApp({
  projectId: import.meta.env.VITE_HEXCLAVE_PROJECT_ID,
  publishableClientKey: import.meta.env.VITE_HEXCLAVE_PUBLISHABLE_CLIENT_KEY,
  tokenStore: "cookie",
  urls: {
    default: {
      type: "hosted",
    }
  },
  analytics: {
    enabled: getAnalyticsEnabled(),
  }
});

