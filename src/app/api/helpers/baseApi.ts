import axios, { AxiosError, CreateAxiosDefaults, ResponseType } from "axios";

type methods = "post" | "get" | "put" | "delete" | "patch";

const createApiClient = ({
  baseURL,
  responseType = "json",
  headers,
  method,
  getToken,
  logout,
  options,
}: {
  baseURL: string;
  responseType?: ResponseType;
  headers?: CreateAxiosDefaults["headers"];
  method?: methods;
  getToken: () => string | null;
  logout: () => void;
  options?: Omit<
    CreateAxiosDefaults,
    "baseURL" | "responseType" | "headers" | "method"
  >;
}) => {
  const apiClient = axios.create({
    baseURL: baseURL,
    responseType: responseType,
    headers: headers ?? { "Content-Type": "application/json" },
    method: method,
    ...options,
  });

  apiClient.interceptors.request.use(
    (config) => {
      const token = getToken();

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      return config;
    },
    (error) => Promise.reject(error)
  );

  apiClient.interceptors.response.use(
    (Response) => Response,

    (error: AxiosError) => {
      const status = error.response?.status;

      if (status === 401) {
        logout();
      }
      return Promise.reject(error);
    }
  );

  return apiClient;
};

export default createApiClient;
