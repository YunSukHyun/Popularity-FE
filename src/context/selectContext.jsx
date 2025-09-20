import { SelectContext } from ".";
import { useState } from "react";

export const SelectProvider = ({ children }) => {
  const [selection, setSelection] = useState([]);

  return (
    <SelectContext.Provider value={{ selection, setSelection }}>
      {children}
    </SelectContext.Provider>
  );
};
