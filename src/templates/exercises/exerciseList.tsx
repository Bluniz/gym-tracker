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
import { QueryObserverResult, RefetchOptions, useMutation } from '@tanstack/react-query';
import { PostgrestSingleResponse } from '@supabase/supabase-js';
import { queryClient } from '@/src/configs/queryClient';

interface ExerciseListProps {
  data: Tables<'exercises'>[];
  isRefetching: boolean;
  refetchList: (
    options?: RefetchOptions,
  ) => Promise<QueryObserverResult<PostgrestSingleResponse<Tables<'exercises'>[]>, Error>>;
}

export const ExerciseList = ({ data, refetchList, isRefetching }: ExerciseListProps) => {
  const [refreshing] = useState(isRefetching);
  const [deleteConfirmModalData, setDeleteConfirmModalData] = useState({
    isOpen: false,
    id: '',
    name: '',
  });

  const { showNewToast } = useCustomToast();
  const mutation = useMutation({
    mutationFn: (id: string) => deleteExercise(id),
    onError: (error) => {
      showNewToast('Erro ao deletar exercício');
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['exercises'] });
      showNewToast('Exercício deletado com sucesso');
    },
    onSettled: () => {
      onCloseDeleteConfirmModal();
    },
  });

  const onOpenDeleteConfirmModal = (exerciseId: string, name: string) => {
    setDeleteConfirmModalData({ isOpen: true, id: exerciseId, name });
  };

  const onCloseDeleteConfirmModal = () => {
    setDeleteConfirmModalData({ isOpen: false, id: '', name: '' });
  };

  const onRefresh = async () => {
    try {
      await refetchList();
    } catch (error) {
      console.log(error);
      showNewToast('Erro ao atualizar lista');
    } finally {
    }
  };

  return (
    <>
      <FlatList
        data={data}
        contentContainerClassName="px-4 py-6 gap-4 h-[90%]"
        keyExtractor={(item) => `${item.id}`}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[colors.red['700']]}
            tintColor={colors.red['700']}
            title="Carregando..."
          />
        }
        ListEmptyComponent={
          <Center className="h-full px-4">
            <Heading className="text-center">
              Você não possui exercicios criados no momento.
            </Heading>
          </Center>
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
        onConfirm={() => mutation.mutate(deleteConfirmModalData.id)}
        onClose={onCloseDeleteConfirmModal}
        isLoading={mutation.isPending}
      />
    </>
  );
};
