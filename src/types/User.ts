export interface User {
  data: string | any;
  exp: number;
  iat: number;
}

export interface AuthResponse {
  status: number;
  error: boolean;
  token: string;     
  data: JSON;
}

export interface AuthCredentials {
  username: string;
  password: string;
}
