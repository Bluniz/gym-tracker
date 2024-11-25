import { useState } from 'react';
import { Toast, ToastDescription, ToastTitle, useToast } from '../components/ui/toast';

export const useCustomToast = () => {
  const toast = useToast();
  const [toastId, setToastId] = useState(0);

  const handleToast = (title: string, description?: string) => {
    if (!toast.isActive(`${toastId}`)) {
      showNewToast(title, description);
    }
  };
  const showNewToast = (title: string, description?: string) => {
    const newId = Math.random();
    setToastId(newId);
    toast.show({
      id: `${newId}`,
      placement: 'top',
      duration: 3000,
      render: ({ id }) => {
        const uniqueToastId = 'toast-' + id;
        return (
          <Toast nativeID={uniqueToastId} action="muted" variant="solid">
            <ToastTitle>{title}</ToastTitle>
            {description && <ToastDescription>{description}</ToastDescription>}
          </Toast>
        );
      },
    });
  };

  return {
    handleToast,
    showNewToast,
  };
};
