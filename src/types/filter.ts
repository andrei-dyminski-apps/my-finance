import { FieldIds, MultiSelectOptionValue } from "@/types/field";
import { DatesStrings } from "@/types/date";
import { MultiSelectValue } from "@/types/field";
import { DatesPeriodFormField, MultiSelectFormField, SingleSelectFormField } from "@/types/form";
import { OptionsObject } from "@/types/selectors";

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

export type FilterField =
  | DatesPeriodFormField
  | (SingleSelectFormField & {
      id: FieldIds.SORT;
    })
  | MultiSelectFormField;

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
