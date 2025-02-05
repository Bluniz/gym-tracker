import { useState } from 'react';

export const useModal = (initialState: boolean = false) => {
  const [isOpen, setIsOpen] = useState(initialState);

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);
  const hangleToggle = () => setIsOpen((prev) => !prev);

  return {
    isOpen,
    handleOpen,
    handleClose,
    hangleToggle,
  };
};
