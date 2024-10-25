import { selectBudgetsFilterFields, selectBudgetsFilterValues } from "../../selectors";
import { setBudgetsFilterValues } from "../../store";
import { memo, useMemo } from "react";
import { isNumber } from "@/predicates/common";
import { isMultiSelectValue, isMultiSelectFormFieldId } from "@/features/fields";
import { useAppDispatch, useAppSelector } from "@/hooks/store";
import { type ActiveFilterItemValue, ActiveFiltersList, getActiveFilters } from "@/features/filter";

export const ActiveFilters = memo(function ActiveBudgetsFilters() {
  const dispatch = useAppDispatch();

  const budgetsFilterFields = useAppSelector(selectBudgetsFilterFields);
  const budgetsFilterValues = useAppSelector(selectBudgetsFilterValues);

  const activeFilters = useMemo(() => getActiveFilters(budgetsFilterFields, budgetsFilterValues), [budgetsFilterFields, budgetsFilterValues]);

  const handleClearFilter = ({ id, value }: ActiveFilterItemValue): void => {
    const filterStateItemValue = budgetsFilterValues?.[id];
    if (isMultiSelectFormFieldId(id) && isNumber(value) && isMultiSelectValue(filterStateItemValue))
      dispatch(setBudgetsFilterValues([{ id, value: filterStateItemValue.filter((val) => val !== value) }]));
  };

  return <ActiveFiltersList items={activeFilters} onClearFilter={handleClearFilter} />;
});
