import type { DatesStrings } from "@/features/fields";

export const checkPeriodCondition = (dates: DatesStrings | undefined, date: string): boolean => dates !== undefined && date >= dates[0] && date <= dates[1];
