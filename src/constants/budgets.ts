import { AMOUNT_FIELD, NAME_FIELD, ACCOUNTS_FIELD, CATEGORIES_FIELD, DATES_PERIOD_FIELD, SORT_FIELD } from "@/constants/fields";
import type { FilterField } from "@/types/filter";
import type { BudgetItemField } from "@/types/budgets";

export const INITIAL_BUDGETS_FILTER_FIELDS: FilterField[] = [SORT_FIELD, ACCOUNTS_FIELD, CATEGORIES_FIELD, DATES_PERIOD_FIELD];

export const INITIAL_BUDGET_FIELDS: BudgetItemField[] = [NAME_FIELD, ACCOUNTS_FIELD, CATEGORIES_FIELD, AMOUNT_FIELD, { ...DATES_PERIOD_FIELD, required: true }];
