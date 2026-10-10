import { HexclaveClientApp } from "@hexclave/react";

export const hexclaveClientApp = new HexclaveClientApp({
  projectId: import.meta.env.VITE_HEXCLAVE_PROJECT_ID,
  publishableClientKey: import.meta.env.VITE_HEXCLAVE_PUBLISHABLE_CLIENT_KEY,
  tokenStore: "cookie",
  urls: {
    default: {
      type: "hosted",
    }
  },
});

