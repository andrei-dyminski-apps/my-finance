import { Suspense } from "react";
import { selectBudgetsByFilter, selectBudgetsList } from "@/store/selectors/budgets";
import { AddNewBudget } from "@/components/budgets/AddNewBudget";
import { BudgetsFilter } from "@/components/budgets/filter/BudgetsFilter";
import { ActiveBudgetsFilters } from "@/components/budgets/filter/ActiveBudgetsFilters";
import { LazyList } from "@/components/common/list/LazyList";
import { BudgetItem } from "@/components/budgets/list/BudgetItem";
import { BudgetDetail } from "@/components/budgets/BudgetDetail";
import { EmptyBudgets } from "@/components/budgets/list/EmptyBudgets";
import { FoundNothing } from "@/components/common/list/FoundNothing";
import { useAppSelector } from "@/hooks/store";
import type { PageContentProps } from "@/types/common";

export default function BudgetsPageContent({ onGetData }: PageContentProps) {
  const budgetsList = useAppSelector(selectBudgetsList);
  const filteredSortedBudgets = useAppSelector(selectBudgetsByFilter);

  let content = null;
  if (filteredSortedBudgets?.length)
    content = (
      <>
        <div className="container-edge container sticky top-16 z-20 -my-4 flex flex-col gap-4 bg-white py-4 dark:bg-dark">
          <div className="grid grid-cols-2 gap-4">
            <AddNewBudget isAdaptive onSave={onGetData} />
            <BudgetsFilter onSave={onGetData} />
          </div>
          <ActiveBudgetsFilters />
        </div>
        <LazyList items={filteredSortedBudgets} Item={BudgetItem} />
        <Suspense fallback={<div />}>
          <BudgetDetail onSave={onGetData} />
        </Suspense>
      </>
    );
  else if (!budgetsList?.length) content = <EmptyBudgets addNew={<AddNewBudget onSave={onGetData} />} />;
  else if (budgetsList?.length && !filteredSortedBudgets?.length)
    content = (
      <>
        <div className="container-edge container sticky top-16 z-20 -my-4 flex flex-col gap-4 bg-white py-4 dark:bg-dark">
          <div className="grid grid-cols-2 gap-4">
            <AddNewBudget isAdaptive onSave={onGetData} />
            <BudgetsFilter onSave={onGetData} />
          </div>
        </div>
        <ActiveBudgetsFilters />
        <FoundNothing />
      </>
    );

  return content && <div className="flex flex-col gap-4 lg:gap-8">{content}</div>;
}
