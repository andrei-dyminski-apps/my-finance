import { type DatesPeriodFormField, type DatesStrings, type MultiSelectFormField, type SingleSelectFormField, type MultiSelectValue, FieldIds, MultiSelectOptionValue } from "@/features/fields";
import type { ActionCreatorWithPayload } from "@reduxjs/toolkit";

export interface FilterPeriodItem {
  id: FieldIds.PERIOD;
  value: DatesStrings;
}

export interface FilterSortItem {
  id: FieldIds.SORT;
  value: string;
}

export interface FilterMultiItem {
  id: FieldIds.CATEGORIES | FieldIds.ACCOUNTS;
  value: MultiSelectValue;
}

export type FilterItem = FilterMultiItem | FilterPeriodItem | FilterSortItem;

export type FilterPeriodStateItem = {
  [FieldIds.PERIOD]: DatesStrings;
};

export type FilterState = Partial<FilterPeriodStateItem> & {
  [FieldIds.SORT]?: string;
  [FieldIds.CATEGORIES]?: MultiSelectValue;
  [FieldIds.ACCOUNTS]?: MultiSelectValue;
};

export type FilterStateKey = keyof FilterState;

export type FilterStateValue = Exclude<FilterState[FilterStateKey], undefined>;

export type FilterField = DatesPeriodFormField | SingleSelectFormField<FieldIds.SORT, string> | MultiSelectFormField;

type ActiveMultiSelectFilterItem = {
  id: FieldIds.ACCOUNTS | FieldIds.CATEGORIES;
  value: MultiSelectOptionValue;
  label?: string;
  textValue?: string;
};

type ActiveSortSelectFilterItem = {
  id: FieldIds.SORT;
  value?: string;
  label?: string;
  textValue?: string;
};

type ActiveDatesPeriodFilterItem = {
  id: FieldIds.PERIOD;
  value?: string;
  label?: string;
};

export type ActiveFilterItem = ActiveMultiSelectFilterItem | ActiveSortSelectFilterItem | ActiveDatesPeriodFilterItem;

export type ActiveFilterItemValue = Pick<ActiveFilterItem, "value" | "id">;

export type SetFilterStateValuesHandler = ActionCreatorWithPayload<
  FilterItem[],
  "budgets/setBudgetsFilterValues" | "statistics/setStatisticsFilterValues" | "costs/setCostsFilterValues" | "incomes/setIncomesFilterValues"
>;

export interface ClearActiveFilterItemHandler {
  (data: ActiveFilterItemValue): void;
}

export interface ChangeFilterFieldValueHandler {
  (data: FilterItem): void;
}
