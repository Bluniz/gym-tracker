import { CustomButton } from '@/src/components/CustomButton';
import { Heading } from '@/src/components/ui/heading';
import {
  Modal,
  ModalBackdrop,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from '@/src/components/ui/modal';

interface DeleteModalProps {
  isOpen: boolean;
  isLoading: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export const DeleteModal = ({ isOpen, onCancel, onConfirm, isLoading }: DeleteModalProps) => {
  return (
    <Modal size="lg" isOpen={isOpen}>
      <ModalBackdrop />
      <ModalContent>
        <ModalHeader>
          <Heading className="text-center">Tem certeza que deseja deletar o seu treino?</Heading>
        </ModalHeader>

        <ModalFooter className="items-center justify-center pt-10">
          <CustomButton
            text="Fechar"
            action="secondary"
            size="lg"
            onPress={onCancel}
            disabled={isLoading}
          />
          <CustomButton
            disabled={isLoading}
            isLoading={isLoading}
            text="Apagar"
            action="primary"
            size="lg"
            onPress={onConfirm}
          />
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
