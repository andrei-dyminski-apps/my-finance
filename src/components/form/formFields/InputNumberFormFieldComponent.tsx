import { useTranslation } from "react-i18next";
import { cutDecimals, handleKeyDownDecimalsValidation, handleKeyUpCutDecimals } from "@/helpers/fields";
import { Form, InputNumber } from "antd";
import type { FormFieldProps, NumberFormField } from "@/types/form";

export const InputNumberFormFieldComponent = ({ field, onChange }: FormFieldProps<NumberFormField>) => {
  const { t } = useTranslation();

  return (
    <Form.Item
      label={`${t(`fields.${field.label}`)} ${field.label_suffix ? field.label_suffix : ""}`}
      name={field.id}
      rules={field.required ? [{ required: true, message: t("fields.errors.required") }] : undefined}
    >
      <InputNumber
        size="large"
        autoFocus={!!field.focus}
        disabled={field.disabled}
        onKeyDown={handleKeyDownDecimalsValidation}
        onKeyUp={handleKeyUpCutDecimals}
        min={0}
        max={Number.MAX_SAFE_INTEGER}
        style={{ width: "100%" }}
        onChange={(value) => onChange({ id: field.id, type: field.type, value: cutDecimals(value) })}
      />
    </Form.Item>
  );
};