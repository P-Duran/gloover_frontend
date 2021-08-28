import { createContext, Dispatch, SetStateAction, useState } from "react";
interface Context {
  productsProgress: Record<string, string>;
  setProductsProgress: Dispatch<SetStateAction<Record<string, string>>>;
}

interface Props {
  children: any;
}

export const ProgressContext = createContext<Context>({
  productsProgress: {},
  setProductsProgress: (e: any) => {},
});

export const ProgressContextProvider = ({ children }: Props) => {
  const [products, setProducts] = useState<Record<string, string>>({});

  return (
    <ProgressContext.Provider
      value={{ productsProgress: products, setProductsProgress: setProducts }}
    >
      {children}
    </ProgressContext.Provider>
  );
};
