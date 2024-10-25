import { Button } from "antd";
import { SideModal } from "@/components/modals/side-modal";
import { selectBudgetFields } from "../../selectors";
import { createBudgetItemThunk } from "../../store";
import { useTranslation } from "react-i18next";
import { showNotification } from "@/utils/show-notification";
import { memo, useRef, useState } from "react";
import SvgNewBudget from "@/assets/sprite/new-budget.svg";
import { useViewport } from "@/hooks/viewport";
import { isBudgetItemData } from "../../predicates";
import { showCommonError } from "@/utils/show-common-error";
import { useAppDispatch, useAppSelector } from "@/hooks/store";
import { FieldIds, FieldTypes } from "@/features/fields";
import { type CalculatorSaveHandler, CalculatorModal } from "@/features/calculator";
import { type DefaultFormRef, type DefaultFormSaveHandler, DefaultForm } from "@/features/default-form";

export const AddNew = memo(function AddNewBudget({ isAdaptive, onSave }: { isAdaptive?: boolean; onSave: () => Promise<void> }) {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { isMobile } = useViewport();

  const [isOpen, setIsOpen] = useState(false);
  const handleToggleVisibility = (): void => setIsOpen((prevState) => !prevState);

  const newBudgetFields = useAppSelector(selectBudgetFields);

  const onSaveNewBudget: DefaultFormSaveHandler = async (fieldsValues) => {
    try {
      if (!isBudgetItemData(fieldsValues)) return;
      await dispatch(createBudgetItemThunk(fieldsValues)).unwrap();
      await onSave();
      setIsOpen(false);
      showNotification({ title: t("notifications.budget.create") });
    } catch (error) {
      showCommonError({ error });
    }
  };

  const formRef = useRef<DefaultFormRef | null>(null);
  const handleSetCalculatedAmount: CalculatorSaveHandler = (value) => formRef.current?.handleChangeFieldValue({ id: FieldIds.AMOUNT, type: FieldTypes.NUMBER, value });

  return (
    <>
      <Button size="large" data-cy="add-budget-modal-btm" className="!flex items-center justify-center gap-3" onClick={handleToggleVisibility}>
        <SvgNewBudget className="h-[22px] w-[22px]" />
        {(!isAdaptive || !isMobile) && t("buttons.add_budget")}
      </Button>
      <SideModal
        title={t("titles.add_budget")}
        isOpen={isOpen}
        footer={<CalculatorModal title={t("common.amount_calculator")} buttonOpen={t("common.amount_calculator")} buttonSave={t("buttons.save_amount")} onSave={handleSetCalculatedAmount} />}
        onClose={handleToggleVisibility}
      >
        <DefaultForm ref={formRef} fields={newBudgetFields} isResetAfterSave data-cy="add-budget-form" onSaveForm={onSaveNewBudget} />
      </SideModal>
    </>
  );
});
