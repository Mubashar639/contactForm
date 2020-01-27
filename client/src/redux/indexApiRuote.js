export const baseUrl =
  window.location.origin === "http://localhost:3000"
    ? "http://localhost:5000"
    : window.location.origin;
