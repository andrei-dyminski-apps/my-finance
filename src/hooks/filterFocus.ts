import { MutableRefObject, SetStateAction, useEffect, useRef, useState } from "react";
import { BaseSelectRef } from "rc-select";

export const useFilterFocus = <T extends BaseSelectRef | HTMLInputElement>(): [MutableRefObject<T | null>, (value: SetStateAction<boolean>) => void] => {
  const fieldRef = useRef<T | null>(null);
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    if (isMounted) {
      const timeout = setTimeout(() => fieldRef.current?.focus());
      return () => clearTimeout(timeout);
    }
  }, [isMounted]);
  return [fieldRef, setIsMounted];
};
