import { DatesStrings } from "@/types/date";
import dayjs, { type Dayjs } from "dayjs";
import { type Locale, Locales } from "@/types/locales";

export const toggleDayjsLocale = async (locale: Locale): Promise<void> => {
  if (locale === Locales.EN || dayjs.locale() === locale) return;
  try {
    await import(`dayjs/locale/${locale}.js`);
    dayjs.locale(locale);
  } catch (error) {
    console.error(`Failed to load locale: ${locale}`, error);
  }
};

export const getPeriodDates = (dates: string): DatesStrings => JSON.parse(dates).map((date: string) => date.substring(0, 10));

export const getFromPeriodDatesForApi = ([from, to]: string[]): string => `[${from + " 00:00:00"},${to + " 00:00:00"})`;
export const getToPeriodDatesForApi = ([from, to]: string[]): string => `[${from + " 00:00:00"},${to + " 00:00:01"})`;

export const convertDatesToDayjs = (dates: DatesStrings): [Dayjs, Dayjs] => {
  const [from, to] = dates;
  return [dayjs(from), dayjs(to)];
};
