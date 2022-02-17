import { ENDPOINT } from "@static/constants";
import { http } from "@utils/http";

export const axGetUserParticipations = async () => {
  try {
    const { data } = await http.get(`${ENDPOINT.CCA}/v1/data/myList`);

    return { success: true, data: data.ccaDataList };
  } catch (e) {
    console.error(e);

    return { success: false, data: [] };
  }
};
