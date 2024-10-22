"use client";

import { useLoading } from "@/hooks/loading";
import { useCallback, useEffect } from "react";
import { Preloader } from "@/components/loading/preloader";
import { selectBudgetsFilterValues, selectBudgetsList } from "../../selectors";
import { useFilterSearchParams } from "@/hooks/filter-search-params";
import { getBudgetsListThunk, setBudgetsFilterValues } from "../../store";
import { INITIAL_BUDGETS_FILTER_FIELDS } from "../../constants";
import { getUserId } from "@/utils/get-user-id";
import { useAppDispatch, useAppSelector } from "@/hooks/store";
import { getFilterItemsFromFields } from "@/utils/filters";
import { PageContent } from "../../components";
import { HeaderAside } from "../../components";

// todo check default import everywhere
export default function Page() {
  const dispatch = useAppDispatch();

  const budgetsFilterValues = useAppSelector(selectBudgetsFilterValues);
  const [isNotEqualParamsToFilters] = useFilterSearchParams(budgetsFilterValues, setBudgetsFilterValues);

  const [isLoading, setIsLoading] = useLoading(false);
  const budgetsList = useAppSelector(selectBudgetsList);

  const handleGetData = useCallback(async (): Promise<void> => {
    if (!budgetsFilterValues?.period || isNotEqualParamsToFilters) return;
    setIsLoading(true);
    await dispatch(getBudgetsListThunk(budgetsFilterValues));
    setIsLoading(false);
  }, [budgetsFilterValues?.period, isNotEqualParamsToFilters]);

  useEffect((): void => {
    const injectAndLoadData = async (): Promise<void> => {
      if (!budgetsFilterValues) {
        await import("../../store");
        dispatch(setBudgetsFilterValues(getFilterItemsFromFields(INITIAL_BUDGETS_FILTER_FIELDS)));
      }
      if (!budgetsList?.length) await handleGetData();
    };
    if (getUserId()) injectAndLoadData();
  }, [handleGetData]);

  return (
    <Preloader isLoading={isLoading}>
      <HeaderAside />
      <PageContent onGetData={handleGetData} />
    </Preloader>
  );
}
