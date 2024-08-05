"use client";

import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { selectIncomesByFilter, selectIncomesFilterValues, selectIncomesList } from "@/store/selectors/incomes";
import { useFilterSearchParams } from "@/hooks/filterSearchParams";
import { getIncomesListThunk, setIncomesFilterValues } from "@/store/incomesSlice";
import { useLoading } from "@/hooks/loading";
import { Suspense, useCallback, useEffect } from "react";
import { INITIAL_INCOMES_FILTER_FIELDS } from "@/constants/incomes";
import { getUserId } from "@/helpers/localStorage";
import { selectCurrency } from "@/store/selectors/profile";
import formatPrice from "@/helpers/formatPrice";
import { AddNewIncome } from "@/components/Incomes/New/AddNewIncome";
import { IncomesFilter } from "@/components/Incomes/Filter/IncomesFilter";
import { ActiveIncomesFilters } from "@/components/Incomes/Filter/ActiveIncomesFilters";
import { LazyList } from "@/components/Common/LazyList";
import { IncomeListItem } from "@/components/Incomes/List/IncomeListItem";
import { IncomeDetail } from "@/components/Incomes/Detail/IncomeDetail";
import { EmptyIncomes } from "@/components/Incomes/List/EmptyIncomes";
import { FoundNothing } from "@/components/Common/FoundNothing";
import { Preloader } from "@/components/Layout/Preloader";
import { InnerHeaderActionsPortal } from "@/components/Layout/Inner/InnerHeaderActionsPortal";
import { useAppDispatch } from "@/hooks/redux";
import { getFilterItemsFromFields } from "@/helpers/filters";

export default function IncomesContent() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const incomesFilterValues = useSelector(selectIncomesFilterValues);
  const [isNotEqualParamsToFilters] = useFilterSearchParams(incomesFilterValues, setIncomesFilterValues);

  const [isLoading, setIsLoading] = useLoading(false);
  const incomesList = useSelector(selectIncomesList);
  const filteredSortedIncomes = useSelector(selectIncomesByFilter);
  const handleGetData = useCallback(async () => {
    if (!incomesFilterValues?.period || isNotEqualParamsToFilters) return;
    setIsLoading(true);
    await dispatch(getIncomesListThunk(incomesFilterValues));
    setIsLoading(false);
  }, [incomesFilterValues?.period, isNotEqualParamsToFilters]);

  useEffect(() => {
    const injectAndLoadData = async () => {
      if (!incomesFilterValues) {
        await import("@/store/incomesSlice");
        await dispatch(setIncomesFilterValues(getFilterItemsFromFields(INITIAL_INCOMES_FILTER_FIELDS)));
      }
      if (!incomesList) await handleGetData();
    };

    if (getUserId()) injectAndLoadData();
  }, [handleGetData]);

  const totalAmount = filteredSortedIncomes?.reduce((acc, { amount }) => acc + amount, 0);
  const currency = useSelector(selectCurrency);
  const headerActions = Array.isArray(filteredSortedIncomes) && (
    <>
      <div className="mr-auto flex gap-1">
        <span data-cy="incomes-items-count">{filteredSortedIncomes?.length}</span>
        {t("common.items")}
      </div>
      <div className="font-black lg:text-lg">
        <span className="mr-1">{t("common.total")}: </span>
        {formatPrice(totalAmount)}
        {currency}
      </div>
    </>
  );

  let content;
  if (filteredSortedIncomes?.length)
    content = (
      <>
        <div className="container-edge container sticky top-16 z-20 -my-4 flex flex-col gap-4 bg-white py-4 dark:bg-dark">
          <div className="grid grid-cols-2 gap-4">
            <AddNewIncome isAdaptive onSave={handleGetData} />
            <IncomesFilter onSave={handleGetData} />
          </div>
          <ActiveIncomesFilters />
        </div>
        <LazyList items={filteredSortedIncomes} Item={IncomeListItem} />
        <Suspense fallback={<div />}>
          <IncomeDetail onSave={handleGetData} />
        </Suspense>
      </>
    );
  else if (!incomesList?.length) content = <EmptyIncomes addNew={<AddNewIncome onSave={handleGetData} />} />;
  else if (incomesList?.length && !filteredSortedIncomes?.length)
    content = content = (
      <>
        <div className="container-edge container sticky top-16 z-20 -my-4 flex flex-col gap-4 bg-white py-4 dark:bg-dark">
          <div className="grid grid-cols-2 gap-4">
            <AddNewIncome isAdaptive onSave={handleGetData} />
            <IncomesFilter onSave={handleGetData} />
          </div>
          <ActiveIncomesFilters />
        </div>
        <FoundNothing />
      </>
    );

  return (
    <Preloader isLoading={isLoading}>
      <InnerHeaderActionsPortal>{headerActions}</InnerHeaderActionsPortal>
      {content && <div className="flex flex-col gap-4 lg:gap-8">{content}</div>}
    </Preloader>
  );
}