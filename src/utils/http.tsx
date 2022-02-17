import { ENDPOINT, STORAGE_KEYS } from "@static/constants";
import axios from "axios";

import { getParsedUser, isTokenExpired } from "./auth";
import { Storage } from "./storage";

const defaultHeaders: any = {
  headers: {
    post: { "Content-Type": "application/json" },
    put: { "Content-Type": "application/json" }
  }
};

/**
 * Renews `access_token` if expired
 *
 * @param {string} refreshToken
 * @returns {string}
 */
const axRenewToken = async (refreshToken: string) => {
  const { data } = await axios.post(`${ENDPOINT.USER}/v1/authenticate/refresh-tokens`, null, {
    params: { refreshToken }
  });
  Storage.set(STORAGE_KEYS.BATOKEN, data.access_token);
  Storage.set(STORAGE_KEYS.BRTOKEN, data.refresh_token);
  return data.accessToken;
};

/**
 * Returns `access_token`
 *
 * @returns {string}
 */
export const getBearerToken = async () => {
  try {
    const user = await getParsedUser();
    const isExpired = isTokenExpired(user.exp);
    const finalToken = isExpired ? await axRenewToken(user.refreshToken) : user.accessToken;
    return `Bearer ${finalToken}`;
  } catch (e) {
    return false;
  }
};

const http = axios.create(defaultHeaders);

/*
 * Custom interceptor that allows user to pass custom context (for SSR)
 */
http.interceptors.request.use(
  async (options) => {
    if (options?.headers?.unauthorized || options?.data?.headers?.unauthorized) {
      return options;
    }

    const token = await getBearerToken();
    if (token) {
      options.headers = { ...(options.headers || {}), Authorization: token };
    } else {
      if (!options?.params?.skipRefresh) {
        throw -1;
      }
    }

    if (options?.params?.ctx) {
      delete options.params.ctx;
      delete options.params.skipRefresh;
    }

    return options;
  },
  (error) => {
    console.error("Session Expired!");
    return Promise.reject(error);
  }
);

const plainHttp = axios.create(defaultHeaders);

export { http, plainHttp };
