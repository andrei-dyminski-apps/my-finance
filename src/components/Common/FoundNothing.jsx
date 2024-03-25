import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";

export const FoundNothing = ({ clearFilter }) => {
  const { t } = useTranslation();

  return (
    <div className="my-20 flex flex-col items-center gap-6">
      <p className="text-center text-xl font-bold">{t("common.found_nothing")}</p>
      {clearFilter}
    </div>
  );
};

FoundNothing.propTypes = {
  clearFilter: PropTypes.node,
};
