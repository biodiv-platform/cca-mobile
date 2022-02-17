import { ENDPOINT } from "@static/constants";
import { http } from "@utils/http";

export const axGetAllTemplates = async (language?) => {
  try {
    const { data } = await http.get(`${ENDPOINT.CCA}/v1/template/all`, {
      params: { platform: "MOBILE", excludeFields: false, language }
    });

    return { success: true, data };
  } catch (e) {
    console.error(e);

    return { success: false, data: [] };
  }
};

export const axGetAllData = async (params?) => {
  try {
    const { data } = await http.get(`${ENDPOINT.CCA}/v1/data/all`, { params });

    return { success: true, data };
  } catch (e) {
    console.error(e);

    return { success: false, data: [] };
  }
};

export const axSaveContribution = async (payload) => {
  try {
    const { data } = await http.post(`${ENDPOINT.CCA}/v1/data/save`, payload);

    return { success: true, data };
  } catch (e) {
    console.error(e);

    return { success: false, data: {} };
  }
};

export const axUpdateContribution = async (payload) => {
  try {
    const { data } = await http.put(`${ENDPOINT.CCA}/v1/data/update`, payload);

    return { success: true, data };
  } catch (e) {
    console.error(e);

    return { success: false, data: {} };
  }
};
