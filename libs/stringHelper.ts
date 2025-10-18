import type { Dayjs, OpUnitType } from "dayjs";

import "dayjs/locale/id";
import dayjs from "dayjs";

export const formatCurrency = (value: string | number) => {
  return new Intl.NumberFormat("id-ID").format(Number(value));
};

export type DatePickerFormat =
  | Dayjs
  | Date
  | string
  | number
  | null
  | undefined;

/**
 * The `formatStr` object contains various date and time format strings used for formatting
 * dates and times in different formats across the application.
 *
 * @typedef {Object} FormatStr
 * @property {string} dateTime - The format for both date and time (e.g. '17 Apr 2022 12:00 AM').
 * @property {string} date - The format for the date (e.g. '17 Apr 2022').
 * @property {string} time - The format for time (e.g. '12:00 AM').
 * @property {Object} split - The object contains specific formats used for different date-time operations.
 * @property {string} split.dateTime - The format for date and time with a slash (e.g. '17/04/2022 12:00 AM').
 * @property {string} split.date - The format for date with a slash (e.g. '17/04/2022').
 * @property {string} split.dateMonth - The format for date with the abbreviated month (e.g. 'Apr 17, 2022').
 * @property {string} split.timeDate - The format for time and date with a slash (e.g. '12:00 17/Apr').
 * @property {string} full_date - The format for full date and time with full day name (e.g. 'Sunday, 17 Apr 2022 12:00').
 * @property {Object} paramCase - The object contains date-time formats with hyphens in the format string.
 * @property {string} paramCase.dateTime - The format for date and time with hyphens (e.g. '17-04-2022 12:00 AM').
 * @property {string} paramCase.date - The format for date with hyphens (e.g. '17-04-2022').
 * @property {string} payload - The format for date in the 'YYYY-MM-DD' format (e.g. '2022-04-17').
 */

/**
 * @type {FormatStr}
 */
export const formatStr = {
  dateTime: "DD MMM YYYY h:mm A", // 17 Apr 2022 12:00 AM
  date: "DD MMM YYYY", // 17 Apr 2022
  time: "h:mm A", // 12:00 AM
  split: {
    dateTime: "DD/MM/YYYY h:mm A", // 17/04/2022 12:00 AM
    date: "DD/MM/YYYY", // 17/04/2022
    dateMonth: "MMM DD, YYYY",
    timeDate: " HH:mm DD/MMM",
  },
  full_date: "dddd, DD MMM YYYY  HH:mm",
  paramCase: {
    dateTime: "DD-MM-YYYY h:mm A", // 17-04-2022 12:00 AM
    date: "DD-MM-YYYY", // 17-04-2022
  },
  payload: "YYYY-MM-DD",
};

/**
 * Formats a given date according to the specified format or a default format from `formatStr.dateTime`.
 *
 * This function uses the `dayjs` library to validate and format the provided date.
 *
 * @param {DatePickerFormat} date - The date to be formatted. This can be a string, Date object, or other date-related type.
 * @param {string} [format] - An optional custom format string. If not provided, the default format (`formatStr.dateTime`) is used.
 * @returns {string | null} - The formatted date as a string, or "Invalid time value" if the date is invalid. Returns `null` if no date is provided.
 *
 * @example
 * fDateTime('2022-04-17 12:00 AM') // returns '17 Apr 2022 12:00 AM'
 * fDateTime('invalid-date') // returns 'Invalid time value'
 * fDateTime('2022-04-17 12:00 AM', 'DD/MM/YYYY') // returns '17/04/2022'
 */
export function fDateTime(date: DatePickerFormat, format?: string) {
  if (!date) {
    return null;
  }

  const isValid = dayjs(date).isValid();

  return isValid
    ? dayjs(date).format(format ?? formatStr.dateTime)
    : "Invalid time value";
}
