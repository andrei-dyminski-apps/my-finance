import { useEffect, useMemo } from "react";
import { getIntegerFromString } from "@/helpers/numbers";
import { isStringValidDate } from "@/helpers/date";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import queryString from "query-string";
import { FilterState, FilterStateValue, setFilterStateValues } from "@/types/filter";
import { useAppDispatch } from "@/hooks/redux";
import { isFilterStateKey } from "@/predicates/filter";
import { isMultiSelectValue, isSelectAllValue } from "@/predicates/field";
import { prepareObjectValuesForFilterStateValues } from "@/helpers/filters";

export const useFilterSearchParams = (filterValues: FilterState | null, setFilterValues: setFilterStateValues) => {
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const searchParamsArray = Array.from(searchParams.entries());
  const sortedFilterValues = useMemo(
    (): FilterState =>
      filterValues
        ? Object.assign(
            {},
            ...Object.entries(filterValues)
              .sort((a, b) => a[0].localeCompare(b[0]))
              .map(([id, value]) => {
                const item = { [id]: value };
                return item;
              }),
          )
        : null,
    [filterValues],
  );

  const isFilterValuesFilled = useMemo((): boolean => !!filterValues && !!Object.keys(filterValues).length, [filterValues]);

  const paramsObject = useMemo(
    () =>
      searchParamsArray.length && filterValues
        ? searchParamsArray.reduce(
            (acc, [key, value]) => {
              let newValue: FilterStateValue;
              if (isFilterStateKey(key) && Array.isArray(filterValues[key]) && !acc[key]) {
                if (isStringValidDate(value)) newValue = [value, value];
                else newValue = [isSelectAllValue(value) ? value : getIntegerFromString(value)];
              } else if (Array.isArray(acc[key])) {
                const accValue = acc[key];
                if (isMultiSelectValue(accValue)) newValue = accValue.concat(isSelectAllValue(value) ? value : getIntegerFromString(value));
                else newValue = [accValue[0], value];
              } else {
                newValue = value;
              }
              return { ...acc, [key]: newValue };
            },
            {} as Record<string, FilterStateValue>,
          )
        : null,
    [searchParamsArray, filterValues],
  );

  const isNotEqualParamsToFilters = useMemo(
    (): boolean => (!searchParamsArray.length && !filterValues) || JSON.stringify(paramsObject) !== JSON.stringify(sortedFilterValues),
    [paramsObject, sortedFilterValues],
  );

  useEffect(() => {
    if (paramsObject && isFilterValuesFilled && searchParamsArray.length && isNotEqualParamsToFilters) {
      dispatch(setFilterValues(prepareObjectValuesForFilterStateValues(paramsObject)));
    }
  }, [isFilterValuesFilled]);

  useEffect(() => {
    if (filterValues && isFilterValuesFilled && isNotEqualParamsToFilters) router.push(`${pathname}?${queryString.stringify(filterValues)}`);
  }, [isFilterValuesFilled, filterValues, isNotEqualParamsToFilters]);

  return [isNotEqualParamsToFilters, isFilterValuesFilled];
};