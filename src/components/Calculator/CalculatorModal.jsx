import { useRef, useState } from "react";
import { Button } from "antd";
import { SideModal } from "@/components/Modals/SideModal.jsx";
import { Calculator } from "@/components/Calculator/Calculator.jsx";
import SvgCalculator from "@/assets/sprite/calculator.svg";
import PropTypes from "prop-types";
import SvgPassPrice from "@/assets/sprite/pass-price.svg";

export const CalculatorModal = ({ title, buttonOpen, buttonSave, onSave }) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleToggleVisibility = () => setIsOpen((prevState) => !prevState);

  const calculatorRef = useRef();
  const [value, setValue] = useState();
  const handleSaveResult = () => {
    onSave(value);
    setIsOpen(false);
    calculatorRef.current.clear();
  };

  const saveBtn = (
    <Button type="primary" className="!flex items-center justify-center gap-3" disabled={!value} onClick={handleSaveResult}>
      <SvgPassPrice className="h-5 w-5" />
      {buttonSave}
    </Button>
  );

  return (
    <>
      <Button size="large" className="!flex w-full items-center justify-center gap-3" onClick={handleToggleVisibility}>
        <SvgCalculator className="h-5 w-5" />
        {buttonOpen}
      </Button>
      <SideModal title={title} isOpen={isOpen} footer={saveBtn} onClose={handleToggleVisibility}>
        <Calculator ref={calculatorRef} onCalculate={setValue} />
      </SideModal>
    </>
  );
};

CalculatorModal.propTypes = {
  title: PropTypes.string,
  buttonOpen: PropTypes.string,
  buttonSave: PropTypes.string,
  onSave: PropTypes.func,
};
