import { SelectContext } from ".";
import { useState } from "react";

export const SelectProvider = ({ children }) => {
  const [selected, setSelected] = useState([]);

  return (
    <SelectContext.Provider value={{ selected, setSelected }}>
      {children}
    </SelectContext.Provider>
  );
};
