import { Heading } from '@/src/components/ui/heading';
import { Text } from '@/src/components/ui/text';

import {
  Modal,
  ModalBackdrop,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from '@/src/components/ui/modal';
import { CustomButton } from '@/src/components/CustomButton';

interface CompleteModalProps {
  isOpen: boolean;
  isCompleted: boolean;
  isCompleting: boolean;
  onClose: () => void;
  onFinish: () => void;
  onComplete: () => void;
}

export const CompleteModal = ({
  isCompleted,
  isCompleting,
  isOpen,
  onClose,
  onComplete,
  onFinish,
}: CompleteModalProps) => {
  return (
    <Modal isOpen={isOpen} size="lg">
      <ModalBackdrop />
      <ModalContent>
        <ModalHeader>
          <Heading>
            {isCompleted ? 'Treino concluido com sucesso!' : 'Parabéns, você completou o treino!'}
          </Heading>
        </ModalHeader>
        <ModalBody>
          {!isCompleting && !isCompleted && <Text>Deseja concluir o treino?</Text>}
        </ModalBody>
        <ModalFooter>
          {isCompleted ? (
            <CustomButton action="primary" text="Fechar" onPress={onFinish} />
          ) : (
            <>
              <CustomButton
                text="Fechar"
                action="secondary"
                size="lg"
                onPress={onClose}
                disabled={isCompleting}
              />
              <CustomButton
                disabled={isCompleting}
                isLoading={isCompleting}
                text="Completar"
                action="primary"
                size="lg"
                onPress={onComplete}
              />
            </>
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
