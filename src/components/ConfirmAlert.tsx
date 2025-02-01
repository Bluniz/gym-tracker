import {
  AlertDialog,
  AlertDialogBackdrop,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
} from '@/src/components/ui/alert-dialog';
import { Heading } from '@/src/components/ui/heading';
import { Text } from '@/src/components/ui/text';
import { CustomButton } from './CustomButton';

interface ConfirmAlertProps {
  isOpen: boolean;
  onConfirm: () => void;
  onClose: () => void;
  title: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  isLoading?: boolean;
}

export function ConfirmAlert({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  confirmText = 'Sim',
  cancelText = 'Não',
  isLoading,
}: ConfirmAlertProps) {
  const handleClose = () => (isLoading ? null : onClose());
  return (
    <AlertDialog isOpen={isOpen} onClose={handleClose} size="lg">
      <AlertDialogBackdrop />
      <AlertDialogContent className="bg-gray-800">
        <AlertDialogHeader>
          <Heading className="font-semibold text-typography-950" size="md">
            {title}
          </Heading>
        </AlertDialogHeader>
        <AlertDialogBody className="mb-4 mt-3">
          <Text size="sm">{description}</Text>
        </AlertDialogBody>
        <AlertDialogFooter className="">
          <CustomButton
            text={cancelText}
            size="sm"
            disabled={isLoading}
            action="secondary"
            onPress={handleClose}
          />
          <CustomButton
            text={confirmText}
            size="sm"
            disabled={isLoading}
            isLoading={isLoading}
            action="primary"
            onPress={onConfirm}
          />
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
