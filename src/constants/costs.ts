import { ACCOUNT_FIELD, ACCOUNTS_FIELD, AMOUNT_FIELD, CATEGORIES_FIELD, CATEGORY_FIELD, DATE_FIELD, DATES_PERIOD_FIELD, NAME_FIELD, SORT_FIELD } from "@/constants/fields";
import type { FormField } from "@/types/form";
import { FieldIds } from "@/types/field";

export const INITIAL_COSTS_FILTER_FIELDS: FormField[] = [SORT_FIELD, { ...ACCOUNTS_FIELD, id: FieldIds.ACCOUNT }, { ...CATEGORIES_FIELD, id: FieldIds.CATEGORY }, DATES_PERIOD_FIELD];

export const INITIAL_COST_FIELDS: FormField[] = [NAME_FIELD, ACCOUNT_FIELD, CATEGORY_FIELD, AMOUNT_FIELD, DATE_FIELD];
