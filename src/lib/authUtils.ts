import { jwtDecode } from "jwt-decode";

const isExpired = (token: any) => {
  const expiry = token.exp;
  const currentTime = Math.floor(Date.now() / 1000);
  return expiry < currentTime;
};

export const checkAuthToken = (jwtToken: string) => {
  if (!jwtToken) return { isValid: false };
  try {
    let token: any = jwtDecode<any>(jwtToken);
    if (isExpired(token)) throw new Error("JWT has expired");
    return { isValid: true, token };
  } catch (error) {
    console.error(error);
    return { isValid: false };
  }
};

export const saveAuthToken = (jwt: string) => {
  if (!jwt) throw new Error("No token provided");
  localStorage.setItem("token", jwt);
};
