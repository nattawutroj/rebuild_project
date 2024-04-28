import { AuthResponse } from "@/types/User";
import BaseClient from "../baseClient";
import { ENDPOINTS } from "@/endpoints";
import axios from "../axios";

class AuthClient extends BaseClient {
  async authenticate(
    username: string,
    password: string,
  ): Promise<AuthResponse> {
    const response = await axios.post<AuthResponse>(ENDPOINTS.authenticate, {
      username: username,
      password: password,
    });
    return response.data;
  }
}

export const authClient = new AuthClient();
