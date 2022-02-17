import { formatTimeStampFromUTC } from "@utils/date";
import React from "react";

export default function TimeAgo({ value }) {
  if (!value) return null;

  return <>{formatTimeStampFromUTC(value)}</>;
}
