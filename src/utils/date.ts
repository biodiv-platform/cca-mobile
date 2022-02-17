import dayjs from "dayjs";
import CustomParseFormat from "dayjs/plugin/customParseFormat";
import RealtiveTime from "dayjs/plugin/relativeTime";
import UTCPlugin from "dayjs/plugin/utc";

dayjs.extend(CustomParseFormat);
dayjs.extend(RealtiveTime);
dayjs.extend(UTCPlugin);

const FORMAT_TIMESTAMP = "DD-MM-YYYY hh:mm A";
const FORMAT_DATE_TIMESTAMP = "DD-MM-YYYY";
const FORMAT_YEAR_TIMESTAMP = "YYYY";

export const dateToUTC = (ts?) => (ts ? dayjs(ts, FORMAT_DATE_TIMESTAMP).utc() : dayjs().utc());

export const parseTimeStampFromUTC = (ts) => dayjs.utc(ts).local();
export const formatTimeStampFromUTC = (ts) => dayjs.utc(ts).local().format(FORMAT_TIMESTAMP);
export const formatYearFromUTC = (ts) => dayjs.utc(ts).local().format(FORMAT_YEAR_TIMESTAMP);
export const parseDate = (ts) => (ts ? dayjs(ts, FORMAT_DATE_TIMESTAMP).toDate() : new Date());
export const formatDate = (ts, format = FORMAT_DATE_TIMESTAMP) => ts && dayjs(ts).format(format);
export const formatYear = (ts, format = FORMAT_YEAR_TIMESTAMP) => ts && dayjs(ts).format(format);

export const parseDateRange = (ts) => (ts ? ts.map((i) => parseDate(i)) : []);
export const formatDateRange = (ts) => (ts ? ts.map((i) => formatDate(i)) : []);

/**
 * this function converts any auto parsable date string to date object for react-datepicker
 *
 * @param {*} dateValue
 */
export const parseToDateObject = (dateValue?) => (dateValue ? new Date(dateValue) : dateValue);
