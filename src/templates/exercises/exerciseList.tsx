import { Tables } from '@/database.types';
import { Heading } from '@/src/components/ui/heading';
import { Center } from '@/src/components/ui/center';
import { FlatList, RefreshControl } from 'react-native';
import { ExerciseItem } from './exerciseItem';
import { useState } from 'react';
import { ConfirmAlert } from '@/src/components/ConfirmAlert';
import { deleteExercise } from '@/src/services/exercises';
import { useCustomToast } from '@/src/hooks/toast';
import colors from 'tailwindcss/colors';

interface ExerciseListProps {
  data: Tables<'exercises'>[];
  refetchList: () => Promise<void>;
}

export const ExerciseList = ({ data, refetchList }: ExerciseListProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
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

  const onRefresh = async () => {
    try {
      setIsRefreshing(true);
      await refetchList();
    } catch (error) {
      console.log(error);
      showNewToast('Erro ao atualizar lista');
    } finally {
      setIsRefreshing(false);
    }
  };

  return (
    <>
      <FlatList
        data={data}
        contentContainerClassName="px-4 py-6 gap-4"
        keyExtractor={(item) => `${item.id}`}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={onRefresh}
            colors={[colors.red['700']]}
            tintColor={colors.red['700']}
            title="Carregando..."
          />
        }
        renderItem={({ item }) => {
          return (
            <ExerciseItem
              exercise={item}
              key={item.id}
              onDelete={() => onOpenDeleteConfirmModal(String(item.id), item.name)}
            />
          );
        }}
      />

      <ConfirmAlert
        isOpen={deleteConfirmModalData.isOpen}
        title={`Tem certeza que deseja apagar ${deleteConfirmModalData.name}?`}
        onConfirm={onDelete}
        onClose={onCloseDeleteConfirmModal}
        isLoading={isLoading}
      />
    </>
  );
};
