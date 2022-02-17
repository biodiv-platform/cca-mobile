import SITE_CONFIG from "@configs/site-config";

export const getMapCenter = (zoomDiff, extra = {}) => ({
  ...SITE_CONFIG.MAP.CENTER,
  bearing: 0,
  pitch: 0,
  zoom: SITE_CONFIG.MAP.CENTER.zoom + (zoomDiff || 0),
  ...extra
});

/**
 * This function is designed to use existing pre-initialized
 * google maps instance and perform reverse geocode
 *
 * @export
 * @param {*} location
 */
export function reverseGeocode(location) {
  return new Promise<any[]>((resolve, reject) => {
    const geocoder = new (window as any).google.maps.Geocoder();
    geocoder.geocode({ location }, function (results, status) {
      if (status === "OK" && results.length > 0) {
        resolve(results);
      } else {
        reject(status);
      }
    });
  });
}
