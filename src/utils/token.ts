export function authHeader() {
    const getToken: any = localStorage.getItem("vite-react-ts-pwa_token");
    if (getToken) {
      return { Authorization: `Bearer ${getToken}` };
    } else {
      return {};
    }
  }