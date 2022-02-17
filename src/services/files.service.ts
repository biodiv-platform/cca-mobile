import { ENDPOINT } from "@static/constants";
import { http } from "@utils/http";
import { nanoid } from "nanoid";

export const axUploadResource = async (file: File) => {
  const formData = new FormData();
  formData.append("hash", nanoid());
  formData.append("directory", "pages");
  formData.append("upload", file, file.name);

  const { data } = await http.post(`${ENDPOINT.FILES}/upload/resource-upload`, formData, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  });

  return data;
};
