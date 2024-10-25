import SvgLoadingBtn from "@/assets/sprite/loading-btn.svg";
import type { ReactNode } from "react";

interface Props {
  size?: "large";
  type?: "primary";
  loading?: boolean;
  children: ReactNode;
  onClick: () => void;
}

export const SimpleButton = ({ size, type, loading, children, onClick, ...props }: Props) => {
  let className = `rounded-md border`;

  if (size === "large") className += " h-10 text-base";
  else className += " h-8 text-sm";

  if (loading) className += " opacity-70 pointer-events-none brightness-90";

  if (type === "primary") className += " bg-primary-blue text-white border-none hover:brightness-125";

  return (
    <button type="button" className={`flex items-center justify-center gap-2 px-4 duration-300 ${className}`} onClick={onClick} {...props}>
      {loading && <SvgLoadingBtn className="spiner h-4 w-4 animate-spin" />}
      {children}
    </button>
  );
};
