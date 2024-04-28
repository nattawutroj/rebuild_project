import { useMutation } from "@tanstack/react-query";
import { authClient } from "../apis/authClient";
import { AuthCredentials, AuthResponse } from "@/types/User";

export const useAuthenticateMutation = () => {
  return useMutation<AuthResponse, Error, AuthCredentials, unknown>({
    mutationFn: (credentials: AuthCredentials) =>
      authClient.authenticate(credentials.username, credentials.password),
  });
};
