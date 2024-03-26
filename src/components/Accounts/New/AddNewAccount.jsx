import { Button } from "antd";
import { SideModal } from "@/components/Modals/SideModal.jsx";
import { DefaultForm } from "@/components/Form/DefaultForm.jsx";
import { useDispatch, useSelector } from "react-redux";
import { selectAccountFields } from "@/store/selectors/accounts.js";
import { createAccountItemThunk } from "@/store/accountsSlice.js";
import { useTranslation } from "react-i18next";
import { showNotification } from "@/helpers/modals.js";
import { memo, useRef, useState } from "react";
import SvgNewAccount from "@/assets/sprite/new-account.svg";
import { CalculatorModal } from "@/components/Calculator/CalculatorModal.jsx";
import { useViewport } from "@/hooks/viewport.js";

export const AddNewAccount = memo(function AddNewAccount({ onSave }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { viewport } = useViewport();

  const [isOpen, setIsOpen] = useState(false);
  const handleToggleVisibility = () => setIsOpen((prevState) => !prevState);

  const newAccountFields = useSelector(selectAccountFields).map((field) => ({ ...field, focus: field.id === "name" }));

  const handleSaveNewAccount = async (fieldsValues) => {
    const { error } = await dispatch(createAccountItemThunk(fieldsValues));
    if (error) return;
    onSave();
    setIsOpen(false);
    showNotification({ title: t("notifications.account.create") });
  };

  const formRef = useRef();
  const handleSetCalculatedAmount = (value) => formRef.current.handleChangeFieldValue({ id: "balance", value });

  return (
    <>
      <Button size="large" className="!flex items-center justify-center gap-2" onClick={handleToggleVisibility}>
        <SvgNewAccount className="h-7 w-7" />
        {!["xs", "xxs"].includes(viewport) && t("common.add_account")}
      </Button>
      <SideModal
        title={t("common.add_account")}
        isOpen={isOpen}
        footer={<CalculatorModal title={t("common.balance_calculator")} buttonOpen={t("common.balance_calculator")} buttonSave={t("buttons.save_balance")} onSave={handleSetCalculatedAmount} />}
        onClose={handleToggleVisibility}
      >
        <DefaultForm ref={formRef} fields={newAccountFields} isResetAfterSave onSaveForm={handleSaveNewAccount} />
      </SideModal>
    </>
  );
});
