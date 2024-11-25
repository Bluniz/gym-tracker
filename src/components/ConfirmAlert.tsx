import {
  AlertDialog,
  AlertDialogBackdrop,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
} from '@/src/components/ui/alert-dialog';
import { Button, ButtonText } from '@/src/components/ui/button';
import { Heading } from '@/src/components/ui/heading';
import { Text } from '@/src/components/ui/text';

interface ConfirmAlertProps {
  isOpen: boolean;
  onConfirm: () => void;
  onClose: () => void;
  title: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
}

export function ConfirmAlert({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  confirmText = 'Sim',
  cancelText = 'Não',
}: ConfirmAlertProps) {
  return (
    <AlertDialog isOpen={isOpen} onClose={onClose} size="lg">
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
          <Button variant="outline" action="secondary" onPress={onClose} size="sm">
            <ButtonText>{cancelText}</ButtonText>
          </Button>
          <Button size="sm" onPress={onConfirm} className="bg-red-700">
            <ButtonText className="text-white">{confirmText}</ButtonText>
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
