import { axUploadResource } from "@services/files.service";
import { ENDPOINT, FORM_TYPE } from "@static/constants";
import loadImage from "blueimp-load-image";

import notification from "./notification";

export function resizeImage(file: File, max = 1000): Promise<any> {
  return new Promise((resolve) => {
    loadImage(
      file,
      (img, data) => {
        try {
          if (data?.exif) {
            // fix orientation
            if (data.exif[274]) {
              loadImage.writeExifData(data.imageHead, data, "Orientation", 1);
            }

            // replace imageHead to restore exif of original image
            img.toBlob((blob) => {
              loadImage.replaceHead(blob, data.imageHead, resolve);
            }, file.type);
          } else {
            img.toBlob(resolve);
          }
        } catch (e) {
          console.warn("EXIF Failed", e);
          if (!img.toBlob) {
            notification("Outdated/Unsupported Browser");
          }
          img.toBlob(resolve);
        }
      },
      {
        meta: true,
        canvas: true,
        orientation: true,
        maxWidth: max,
        maxHeight: max
      }
    );
  });
}

export const syncPendingResources = async (pp) => {
  try {
    for (const fieldId of Object.keys(pp.ccaFieldValues)) {
      if (pp.ccaFieldValues[fieldId].type === FORM_TYPE.FILE) {
        const newValue: any = [];
        for (const resource of pp.ccaFieldValues[fieldId].value) {
          // not uploaded resource
          if (resource.path.startsWith("blob:")) {
            const uploadedResource = await axUploadResource(resource.file);
            newValue.push({
              attribution: resource.attribution,
              license: resource.license,
              path: `${ENDPOINT.FILES_PREVIEW}/get/raw/pages${uploadedResource.uri}`
            });
          } else {
            newValue.push(resource);
          }
        }

        pp.ccaFieldValues[fieldId].value = newValue;
      }
    }

    return { success: true, data: pp };
  } catch (e) {
    console.error(e);
    return { success: false };
  }
};
