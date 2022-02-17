import axios from "axios";
import { stringify } from "@utils/query-string";

import { ENDPOINT } from "../static/constants";

/**
 * Acquires initial tokens against provided credentials
 *
 * @param {username: string, password: string} body
 * @returns {*}
 */
export const axLogin = async (payload) => {
  try {
    const { data } = await axios.post(`${ENDPOINT.USER}/v1/authenticate/login`, stringify(payload));
    return { success: true, data };
  } catch (e: any) {
    console.error(e);
    return { success: false, data: e?.response?.data };
  }
};
