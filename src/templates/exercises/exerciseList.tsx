import { Tables } from '@/database.types';
import { Heading } from '@/src/components/ui/heading';
import { VStack } from '@/src/components/ui/vstack';
import { Center } from '@/src/components/ui/center';
import { ScrollView } from 'react-native';
import { ExerciseItem } from './exerciseItem';
import { useState } from 'react';
import { ConfirmAlert } from '@/src/components/ConfirmAlert';
import { deleteExercise } from '@/src/services/exercises';
import { useCustomToast } from '@/src/hooks/toast';

interface ExerciseListProps {
  data: Tables<'exercises'>[];
  refetchList: () => void;
}

export const ExerciseList = ({ data, refetchList }: ExerciseListProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [deleteConfirmModalData, setDeleteConfirmModalData] = useState({
    isOpen: false,
    id: '',
    name: '',
  });

  const { showNewToast } = useCustomToast();

  if (data.length === 0) {
    return (
      <Center className="h-full">
        <Heading>Você não possui treinos criados no momento.</Heading>
      </Center>
    );
  }

  const onOpenDeleteConfirmModal = (exerciseId: string, name: string) => {
    setDeleteConfirmModalData({ isOpen: true, id: exerciseId, name });
  };

  const onCloseDeleteConfirmModal = () => {
    setDeleteConfirmModalData({ isOpen: false, id: '', name: '' });
  };

  const onDelete = async () => {
    try {
      setIsLoading(true);
      await deleteExercise(deleteConfirmModalData.id);
      showNewToast('Exercício deletado com sucesso');
      refetchList();
    } catch (error) {
      console.log(error);
      showNewToast('Erro ao deletar exercício');
    } finally {
      setIsLoading(false);
      onCloseDeleteConfirmModal();
    }
  };

  return (
    <ScrollView>
      <VStack className="px-4 py-6" space="md">
        {data.map((exercise) => {
          return (
            <ExerciseItem
              exercise={exercise}
              key={exercise.id}
              onDelete={() => onOpenDeleteConfirmModal(String(exercise.id), exercise.name)}
            />
          );
        })}
      </VStack>

      <ConfirmAlert
        isOpen={deleteConfirmModalData.isOpen}
        title={`Tem certeza que deseja apagar ${deleteConfirmModalData.name}?`}
        onConfirm={onDelete}
        onClose={onCloseDeleteConfirmModal}
        isLoading={isLoading}
      />
    </ScrollView>
  );
};
