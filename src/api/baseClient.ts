/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosInstance, AxiosResponse } from "axios";

export interface APIResponse<T> {
  data: T | null | any;
  error: string | null;
}

class BaseClient {
  protected instance: AxiosInstance;

  constructor() {
    this.instance = axios.create({
      baseURL: import.meta.env.VITE_API_BASE_URL,
    });

    this.instance.interceptors.request.use(this.handleRequest);
  }

  private handleRequest(config: any) {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  }

  protected async get<T>(url: string, config = {}): Promise<APIResponse<T>> {
    try {
      const response: AxiosResponse<T> = await this.instance.get(url, config);
      return { data: response.data, error: null };
    } catch (error: any) {
      return { data: null, error: this.handleError(error) };
    }
  }

  protected async post<T>(
    url: string,
    data = {},
    config = {},
  ): Promise<APIResponse<T>> {
    try {
      const response: AxiosResponse<T> = await this.instance.post(
        url,
        data,
        config,
      );
      return { data: response.data, error: null };
    } catch (error: any) {
      return { data: null, error: this.handleError(error) };
    }
  }

  protected async put<T>(
    url: string,
    data = {},
    config = {},
  ): Promise<APIResponse<T>> {
    try {
      const response: AxiosResponse<T> = await this.instance.put(
        url,
        data,
        config,
      );
      return { data: response.data, error: null };
    } catch (error: any) {
      return { data: null, error: this.handleError(error) };
    }
  }

  protected async delete<T>(url: string, config = {}): Promise<APIResponse<T>> {
    try {
      const response: AxiosResponse<T> = await this.instance.delete(
        url,
        config,
      );
      return { data: response.data, error: null };
    } catch (error: any) {
      return { data: null, error: this.handleError(error) };
    }
  }

  private handleError(error: any): string {
    if (axios.isAxiosError(error) && error.response) {
      return error.response.data.Message || "An unexpected error occurred";
    }
    return "An unexpected error occurred";
  }
}

export default BaseClient;
