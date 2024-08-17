import { TotalStatistics } from "@/components/statistics/page/TotalStatistics";
import { CostsBudgetsStatistics } from "@/components/statistics/costsBudgets/CostsBudgetsStatistics";
import { CostsIncomesStatistics } from "@/components/statistics/costsIncomes/CostsIncomesStatistics";
import { CostsCategoriesStatistics } from "@/components/statistics/costsCategories/CostsCategoriesStatistics";
import { IncomesCategoriesStatistics } from "@/components/statistics/incomesCategories/IncomesCategoriesStatistics";
import { EmptyCosts } from "@/components/costs/list/EmptyCosts";
import { StatisticsFilter } from "@/components/statistics/filter/StatisticsFilter";
import { ActiveStatisticsFilters } from "@/components/statistics/filter/ActiveStatisticsFilters";
import { FoundNothing } from "@/components/common/list/FoundNothing";
import { useSelector } from "react-redux";
import { selectCostCategories, selectIncomeCategories } from "@/store/selectors/references";
import { selectBudgetsListForChartsByFilter, selectCostsListForChartsByFilter, selectIncomesListForChartsByFilter, selectIsStatisticsFilterValuesChanged } from "@/store/selectors/statistics";
import type { PageContentProps } from "@/types/common";

export const StatisticsPageContent = ({ isFilterValuesFilled, onGetData }: PageContentProps & { isFilterValuesFilled: boolean }) => {
  const costCategories = useSelector(selectCostCategories);
  const incomeCategories = useSelector(selectIncomeCategories);
  const costsListForCharts = useSelector(selectCostsListForChartsByFilter);
  const budgetsListForCharts = useSelector(selectBudgetsListForChartsByFilter);
  const incomesListForCharts = useSelector(selectIncomesListForChartsByFilter);
  const isFilterValuesChanged = useSelector(selectIsStatisticsFilterValuesChanged);

  const charts = (
    <>
      <TotalStatistics />
      <CostsBudgetsStatistics />
      <CostsIncomesStatistics />
      <CostsCategoriesStatistics />
      <IncomesCategoriesStatistics />
    </>
  );

  let content = <EmptyCosts />;
  if (costCategories && incomeCategories) {
    content = (
      <>
        {isFilterValuesFilled && (
          <div className="container-edge container sticky top-16 z-20 -my-4 flex flex-col gap-4 bg-white py-4 dark:bg-dark">
            <div className="grid grid-cols-2 gap-4">
              <StatisticsFilter onSave={onGetData} />
            </div>
            <ActiveStatisticsFilters />
          </div>
        )}
        {costsListForCharts?.length || incomesListForCharts?.length || budgetsListForCharts?.length ? charts : isFilterValuesChanged && <FoundNothing />}
      </>
    );
  }
  return content;
};