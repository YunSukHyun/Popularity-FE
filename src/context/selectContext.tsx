import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";
import type { SelectedCandidate } from "../types/vote";

interface SelectContextValue {
  selection: SelectedCandidate[];
  setSelection: Dispatch<SetStateAction<SelectedCandidate[]>>;
}

const SelectContext = createContext<SelectContextValue | undefined>(undefined);

export const SelectProvider = ({ children }: { children: ReactNode }) => {
  const [selection, setSelection] = useState<SelectedCandidate[]>([]);

  return (
    <SelectContext.Provider value={{ selection, setSelection }}>
      {children}
    </SelectContext.Provider>
  );
};

export const useSelect = (): SelectContextValue => {
  const context = useContext(SelectContext);

  if (!context) {
    throw new Error("useSelect must be used within SelectProvider");
  }

  return context;
};
