// context/PageContext.jsx

import { createContext, useContext, useState } from "react";

const PageContext = createContext();

export const PageProvider = ({ children }) => {
  const [dynamicTitle, setDynamicTitle] = useState("");

  return (
    <PageContext.Provider
      value={{
        dynamicTitle,
        setDynamicTitle,
      }}
    >
      {children}
    </PageContext.Provider>
  );
};

export const usePage = () => useContext(PageContext);