import axios, { AxiosInstance } from 'axios';

class Service {
  readonly Api: AxiosInstance;

  constructor() {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const apiKey = process.env.NEXT_PUBLIC_API_KEY;

    this.Api = axios.create({
      baseURL: apiUrl,
      params: { api_key: apiKey },
    });

    this.Api.interceptors.response.use(function (response) {
      // TODO: handle 500 error
      if (response.status === 500) {
        // empty
      }

      return response;
    });
  }

  setAuthToken(token: string) {
    if (!token) {
      return;
    }

    this.Api.defaults.headers.common['Authorization'] = token;
  }

  removeAuthToken() {
    delete this.Api.defaults.headers.common['Authorization'];
  }
}

export const service = new Service();
