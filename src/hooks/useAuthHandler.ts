import { useNavigate } from "@tanstack/react-router";
import { useAuth } from "@/hooks";
import { AuthCredentials } from "@/types/User";
import { useAuthenticateMutation } from "@/api/queries/auth";
import { checkAuthToken, saveAuthToken } from "@/lib/authUtils";
import { useCallback } from "react";

export const useAuthHandler = () => {
  const navigate = useNavigate();
  const auth = useAuth();
  const { mutate: authenticate, status, error } = useAuthenticateMutation();

  const login = useCallback(
    (credentials: AuthCredentials) => {
      authenticate(credentials, {
        onSuccess: (data) => {
          console.log("data", data);
          try {
            const jwt = data?.token;
            const { isValid, token } = checkAuthToken(jwt);
            if (!isValid) throw new Error("Invalid token");
            auth.setUser(token);
            saveAuthToken(jwt);
            navigate({ to: "/" });
          } catch (error) {
            console.error("Authentication error", error);
          }
        },
        onError: (error) => {
          console.error("Authentication error", error);
        },
      });
    },
    [authenticate, navigate, auth],
  );

  return { login, isLoading: status === "pending", error };
};
