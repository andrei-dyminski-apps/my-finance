import { useTranslation } from "react-i18next";
import { memo, useEffect, useRef, useState } from "react";
import { selectIncomeFields, selectIncomeItem } from "../../selectors";
import { deleteIncomeItemThunk, getIncomeItemThunk, setIncomeItem, updateIncomeItemThunk } from "../../store";
import { showNotification } from "@/utils/show-notification";
import { SideModal } from "@/components/modals/side-modal";
import { useLoading } from "@/hooks/loading";
import SvgDelete from "@/assets/sprite/delete.svg";
import { Button } from "antd";
import { useSearchParams, useRouter } from "next/navigation";
import { showCommonError } from "@/utils/show-common-error";
import { isIncomeItemData } from "../../predicates";
import { useAppDispatch, useAppSelector } from "@/hooks/store";
import { FieldIds, FieldTypes } from "@/features/fields";
import { type CalculatorSaveHandler, CalculatorModal } from "@/features/calculator";
import { type DefaultFormRef, type DefaultFormSaveHandler, DefaultForm } from "@/features/default-form";
import type { ComponentOnSaveProps } from "@/types/common";

export const Detail = memo(function IncomeDetail({ onSave }: ComponentOnSaveProps) {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();
  const router = useRouter();
  const incomeId = searchParams.get("incomeId");

  const [isLoading, setIsLoading] = useLoading(false);
  const [isBtnLoading, setIsBtnLoading] = useLoading(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleCloseModal = (): void => {
    setIsOpen(false);
    router.push("/incomes");
    dispatch(setIncomeItem(null));
  };

  useEffect((): void => {
    if (incomeId) {
      setIsOpen(true);
      setIsLoading(true);
      dispatch(getIncomeItemThunk(incomeId)).finally(() => setIsLoading(false));
    }
  }, [incomeId]);

  const incomeItem = useAppSelector(selectIncomeItem);
  const incomeFields = useAppSelector(selectIncomeFields);

  const handleUpdateIncome: DefaultFormSaveHandler = async (fieldsValues) => {
    try {
      if (!(incomeItem && isIncomeItemData(fieldsValues))) return;
      await dispatch(updateIncomeItemThunk({ incomeId: incomeItem.id, incomeData: fieldsValues })).unwrap();
      await onSave();
      handleCloseModal();
      showNotification({ title: t("notifications.income.update") });
    } catch (error) {
      showCommonError({ error });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteIncome = async (): Promise<void> => {
    try {
      if (!incomeItem) return;
      setIsBtnLoading(true);
      await dispatch(deleteIncomeItemThunk(incomeItem.id)).unwrap();
      await onSave();
      handleCloseModal();
      showNotification({ title: t("notifications.income.delete") });
    } catch (error) {
      showCommonError({ error });
    } finally {
      setIsBtnLoading(false);
    }
  };

  const formRef = useRef<DefaultFormRef | null>(null);
  const handleSetCalculatedAmount: CalculatorSaveHandler = (value) => formRef.current?.handleChangeFieldValue({ id: FieldIds.AMOUNT, type: FieldTypes.NUMBER, value });

  const footer = (
    <div className="flex flex-col gap-4">
      <CalculatorModal title={t("common.amount_calculator")} buttonOpen={t("common.amount_calculator")} buttonSave={t("buttons.save_amount")} onSave={handleSetCalculatedAmount} />
      <Button size="large" data-cy="delete-income-btn" className="!flex w-full items-center justify-center gap-3" loading={isBtnLoading} onClick={handleDeleteIncome}>
        <SvgDelete className="h-5 w-5 cursor-pointer duration-300 hover:text-blue-600" />
        {t("buttons.delete_income")}
      </Button>
    </div>
  );

  return (
    <SideModal title={t("titles.detail_income")} isOpen={isOpen} isLoading={isLoading} footer={footer} onClose={handleCloseModal}>
      <DefaultForm ref={formRef} fields={incomeFields} data-cy="edit-income-form" onSaveForm={handleUpdateIncome} />
    </SideModal>
  );
});
