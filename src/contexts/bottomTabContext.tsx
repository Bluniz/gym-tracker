import { createContext, PropsWithChildren, useCallback, useContext, useState } from 'react';

interface IBottomTabContext {
  isOpen: boolean;
  closeBottomTab: () => void;
  openBottomTab: () => void;
}

export const BottomTabContext = createContext<IBottomTabContext>({
  isOpen: false,
  closeBottomTab: () => null,
  openBottomTab: () => null,
} as IBottomTabContext);

export const BottomTabContextProvider = ({ children }: PropsWithChildren) => {
  const [isOpen, setIsOpen] = useState(true);

  const openBottomTab = useCallback(() => setIsOpen(true), []);
  const closeBottomTab = useCallback(() => setIsOpen(false), []);

  return (
    <BottomTabContext.Provider value={{ isOpen, closeBottomTab, openBottomTab }}>
      {children}
    </BottomTabContext.Provider>
  );
};

export const useBottomTab = () => useContext(BottomTabContext);
