import { handleRejectedReducerAction } from "@/helpers/errors";
import { getBudgetsListForChartsApi, getCostsListForChartsApi, getIncomesListForChartsApi } from "../api";
import { setFilterValue } from "@/helpers/filters";
import { getPeriodDates } from "@/helpers/date";
import { rootReducer } from "@/store";
import { isFilterPeriodStateItem } from "@/predicates/filter";
import { asyncThunkCreator, buildCreateSlice, type WithSlice } from "@reduxjs/toolkit";
import type { FilterItem, FilterState } from "@/types/filter";
import type { StatisticsBudgetItem, StatisticsCostItem, StatisticsIncomeItem, StatisticsSliceState } from "../types";

const createAppSlice = buildCreateSlice({
  creators: { asyncThunk: asyncThunkCreator },
});

const initialState: StatisticsSliceState = {
  statisticsFilterValues: null,
  costsListForCharts: null,
  incomesListForCharts: null,
  budgetsListForCharts: null,
};

export const statisticsSlice = createAppSlice({
  name: "statistics",
  initialState,
  reducers: (create) => ({
    getCostsListForChartsThunk: create.asyncThunk<StatisticsCostItem[], FilterState, { rejectValue: string }>(
      async (params, { rejectWithValue }) => {
        if (!isFilterPeriodStateItem(params)) throw rejectWithValue("Period is required");
        const { data, error } = await getCostsListForChartsApi(params);
        if (error) return rejectWithValue(error.message);
        return data;
      },
      {
        rejected: handleRejectedReducerAction,
        fulfilled: (state, { payload }) => {
          state.costsListForCharts = payload;
        },
      },
    ),
    getIncomesListForChartsThunk: create.asyncThunk<StatisticsIncomeItem[], FilterState, { rejectValue: string }>(
      async (params, { rejectWithValue }) => {
        if (!isFilterPeriodStateItem(params)) throw rejectWithValue("Period is required");
        const { data, error } = await getIncomesListForChartsApi(params);
        if (error) return rejectWithValue(error.message);
        return data;
      },
      {
        rejected: handleRejectedReducerAction,
        fulfilled: (state, { payload }) => {
          state.incomesListForCharts = payload;
        },
      },
    ),
    getBudgetsListForChartsThunk: create.asyncThunk<StatisticsBudgetItem[], FilterState, { rejectValue: string }>(
      async (params, { rejectWithValue }) => {
        if (!isFilterPeriodStateItem(params)) throw rejectWithValue("Period is required");
        const { data, error } = await getBudgetsListForChartsApi(params);
        if (error) return rejectWithValue(error.message);
        return data;
      },
      {
        rejected: handleRejectedReducerAction,
        fulfilled: (state, { payload }) => {
          state.budgetsListForCharts = payload.map((budget) => ({ ...budget, period: getPeriodDates(budget.period) }));
        },
      },
    ),
    setStatisticsFilterValues: create.reducer<FilterItem[]>((state, { payload }) => {
      state.statisticsFilterValues = payload.reduce((acc, field) => setFilterValue(acc, field), state.statisticsFilterValues);
    }),
  }),
});

declare module "@/types/store" {
  export interface LazyLoadedSlices extends WithSlice<typeof statisticsSlice> {}
}

rootReducer.inject(statisticsSlice);

export const { setStatisticsFilterValues, getCostsListForChartsThunk, getIncomesListForChartsThunk, getBudgetsListForChartsThunk } = statisticsSlice.actions;