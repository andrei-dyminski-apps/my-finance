import { useTranslation } from "react-i18next";

export const EmptyIncomes = ({ addNew }) => {
  const { t } = useTranslation();

  return (
    <div className="my-20 flex flex-col items-center gap-6">
      <h2 className="text-center text-xl font-bold">{t("common.empty_incomes")}</h2>
      {addNew}
    </div>
  );
};
