import { useTranslation } from "react-i18next";
import { ReactNode } from "react";

export const EmptyIncomes = ({ addNew }: { addNew: ReactNode }) => {
  const { t } = useTranslation();

  return (
    <div data-cy="empty-incomes" className="my-20 flex flex-col items-center gap-6">
      <h2 className="text-center text-xl font-bold">{t("common.empty_incomes")}</h2>
      {addNew}
    </div>
  );
};