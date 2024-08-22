import { useTranslation } from "react-i18next";
import { Form } from "antd";
import { PeriodField } from "@/components/form/PeriodField";
import type { DatesPeriodFormField, FormFieldProps } from "@/types/form";

export const PeriodFormFieldComponent = ({ field, onChange }: FormFieldProps<DatesPeriodFormField>) => {
  const { t } = useTranslation();

  return (
    <Form.Item label={t(`fields.${field.label}`)} name={field.id} rules={field.required ? [{ required: true, message: t("fields.errors.required") }] : undefined}>
      <PeriodField id={field.id} value={field.value} onChange={(value) => onChange({ id: field.id, type: field.type, value })} />
    </Form.Item>
  );
};
