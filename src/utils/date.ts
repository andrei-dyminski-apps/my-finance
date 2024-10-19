import { PERIODS } from "@/constants/date";
import quarterOfYear from "dayjs/plugin/quarterOfYear";
import dayjs, { type Dayjs } from "dayjs";
import { type Locale, Locales } from "@/types/locales";
import { type DatesPeriod, DatesStrings } from "@/types/date";
dayjs.extend(quarterOfYear);

export const toggleDayjsLocale = async (locale: Locale): Promise<void> => {
  if (locale === Locales.EN || dayjs.locale() === locale) return;
  try {
    await import(`dayjs/locale/${locale}.js`);
    dayjs.locale(locale);
  } catch (error) {
    console.error(`Failed to load locale: ${locale}`, error);
  }
};

export const isStringValidDate = (str: string): boolean => {
  if (str.length < 10) return false;
  const date = Date.parse(str);
  return !isNaN(date);
};

export const findMatchingPeriod = (datesArray: DatesStrings): null | DatesPeriod => {
  if (datesArray.length !== 2) return null;
  const date = dayjs(datesArray[0]);
  for (const period of PERIODS) {
    const startOfPeriod = date.startOf(period).format("YYYY-MM-DD");
    const endOfPeriod = date.endOf(period).format("YYYY-MM-DD");
    if (startOfPeriod === datesArray[0] && endOfPeriod === datesArray[1]) return period;
  }
  return null;
};

export const getPeriodDates = (dates: string): DatesStrings => JSON.parse(dates).map((date: string) => date.substring(0, 10));

export const getFromPeriodDatesForApi = ([from, to]: string[]): string => `[${from + " 00:00:00"},${to + " 00:00:00"})`;
export const getToPeriodDatesForApi = ([from, to]: string[]): string => `[${from + " 00:00:00"},${to + " 00:00:01"})`;

export const convertDatesToDayjs = (dates: DatesStrings): [Dayjs, Dayjs] => {
  const [from, to] = dates;
  return [dayjs(from), dayjs(to)];
};
