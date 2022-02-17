import { useState } from "react";
import { Geolocation, Position, PositionOptions } from "@capacitor/geolocation";

interface GeoWatchPositionResult {
  error?: any;
  currentPosition?: Position;
  startWatch: (options?: PositionOptions) => void;
  clearWatch: () => void;
}

export function useWatchPosition(): GeoWatchPositionResult {
  const [currentPosition, setCurrentPosition] = useState<Position>();
  const [watchId, setWatchId] = useState("");
  const [error, setError] = useState();

  const clearWatch = () => {
    if (watchId) {
      Geolocation.clearWatch({ id: watchId });
      setCurrentPosition(undefined);
      setWatchId("");
    }
  };

  const startWatch = async (options?: PositionOptions) => {
    if (!watchId) {
      const id = await Geolocation.watchPosition(options || {}, (pos: Position | null, err) => {
        if (err) {
          setError(err);
        }
        if (pos) {
          setCurrentPosition(pos);
        }
      });
      setWatchId(id);
    }
  };

  return {
    error,
    currentPosition,
    clearWatch,
    startWatch
  };
}
