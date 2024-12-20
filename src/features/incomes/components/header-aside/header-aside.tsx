import { InnerHeaderAsidePortal } from "@/features/inner-layout";
import { selectCurrency } from "@/features/profile";
import { formatPrice } from "@/utils/format-price";
import { selectIncomesAmount, selectIncomesByFilter } from "../../selectors";
import { useTranslation } from "react-i18next";
import { useAppSelector } from "@/hooks/store";

export const HeaderAside = () => {
  const { t } = useTranslation();
  const currency = useAppSelector(selectCurrency);
  const filteredSortedIncomes = useAppSelector(selectIncomesByFilter);
  const totalAmount = useAppSelector(selectIncomesAmount);

  const headerActions = Array.isArray(filteredSortedIncomes) && (
    <>
      <div className="mr-auto flex gap-1">
        <span data-cy="incomes-items-count">{filteredSortedIncomes?.length}</span>
        {t("common.items")}
      </div>
      <div className="font-black xl:text-lg">
        <span className="mr-1">{t("common.total")}: </span>
        {formatPrice(totalAmount)}
        {currency}
      </div>
    </>
  );

  return <InnerHeaderAsidePortal>{headerActions}</InnerHeaderAsidePortal>;
};
