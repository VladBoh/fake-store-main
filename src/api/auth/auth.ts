import { api } from "..";
import type { AuthCredentials, AuthResponse } from "./auth.types";

const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<AuthResponse, AuthCredentials>({
      query: (credentials) => ({
        url: '/auth/login',
        method: 'POST',
        body: credentials,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
} = authApi;