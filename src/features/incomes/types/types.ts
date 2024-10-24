import { type DateFormField, type NumberFormField, type SingleSelectFormField, type TextFormField, FieldIds, FieldTypes } from "@/features/fields";
import type { FilterState } from "@/features/filter";

export interface IncomeItem {
  id: number;
  created_at: string;
  [FieldIds.AMOUNT]: number;
  [FieldIds.DATE]: string;
  [FieldIds.ACCOUNT]: number;
  [FieldIds.CATEGORY]: number;
  [FieldIds.NAME]: string;
}

export interface IncomeItemData {
  [FieldIds.AMOUNT]: number;
  [FieldIds.DATE]: string;
  [FieldIds.ACCOUNT]: number;
  [FieldIds.CATEGORY]: number;
  [FieldIds.NAME]: string;
}

export type IncomeItemField =
  | TextFormField<FieldIds.NAME, FieldTypes.TEXTAREA>
  | NumberFormField<FieldIds.AMOUNT>
  | DateFormField<FieldIds.DATE>
  | SingleSelectFormField<FieldIds.ACCOUNT | FieldIds.CATEGORY>;

export interface IncomesSliceState {
  incomesFilterValues: FilterState | null;
  incomesList: IncomeItem[] | null;
  incomeItem: IncomeItem | null;
}
