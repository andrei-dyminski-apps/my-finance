import dictionary from "../fixtures/locales/en/default.json";
import type { RequireExactlyOne } from "type-fest";

export type Dictionary = typeof dictionary;

export enum SortProp {
  NAME = "name",
  DATE = "date",
  AMOUNT = "amount",
}

export enum SortOrder {
  ASC = "asc",
  DESC = "desc",
}

interface RequiredSortItem {
  created: string;
}

type AnySortItem = {
  [key in SortProp]?: string;
};

export type SortItem = RequiredSortItem & RequireExactlyOne<AnySortItem, SortProp>;

export interface SelectedOptionData {
  label: string;
  value: number | string;
}

export type SelectedOptionsData = SelectedOptionData[];

export type FilterPropValues = string[];

export type FilteredSinglePropItems = string[];

export type FilteredMultiPropsItems = string[][];
