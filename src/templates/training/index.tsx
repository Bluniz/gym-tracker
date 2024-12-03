import { Tables } from '@/database.types';
import { Container } from '@/src/components/Container';
import { ScreenHeader } from '@/src/components/ScreenHeader';
import { Card } from '@/src/components/ui/card';
import { Center } from '@/src/components/ui/center';
import { Heading } from '@/src/components/ui/heading';
import { Spinner } from '@/src/components/ui/spinner';
import { Text } from '@/src/components/ui/text';
import { useAuth } from '@/src/contexts/authContext';
import { getTrainings } from '@/src/services/training';
import { Link, router, useFocusEffect } from 'expo-router';
import { useCallback, useState } from 'react';
import { FlatList, RefreshControl, TouchableWithoutFeedback } from 'react-native';
import colors from 'tailwindcss/colors';

type ListState = 'loading' | 'loaded' | 'refreshing' | 'error';

export default function TrainingTemplate() {
  const [listState, setListState] = useState<ListState>('loading');
  const [data, setData] = useState<Tables<'training'>[]>([]);
  const { session } = useAuth();

  const fetchWorkouts = useCallback(
    async (state: 'loading' | 'refreshing' = 'loading') => {
      try {
        setListState(state);
        const response = await getTrainings(session?.user?.id!);
        setData(response.data || []);
        setListState('loaded');
      } catch (error) {
        console.log(error);
        setListState('error');
      }
    },
    [session?.user?.id],
  );

  useFocusEffect(
    useCallback(() => {
      fetchWorkouts();
    }, [fetchWorkouts]),
  );

  return (
    <Container animate className="h-full">
      {listState === 'loading' && (
        <Center className="h-full w-full">
          <Spinner size="large" color={colors.red[700]} />
        </Center>
      )}
      {listState === 'error' && (
        <Center className="h-full w-full">
          <Text className="px-10 text-center">
            Ocorreu um erro inesperado ao recuperar os dados. Por favor, tente novamente
          </Text>
        </Center>
      )}
      {(listState === 'loaded' || listState === 'refreshing') && (
        <FlatList
          data={data}
          keyExtractor={(item) => item.id.toString()}
          contentContainerClassName="px-4 gap-4"
          refreshControl={
            <RefreshControl
              refreshing={listState === 'refreshing'}
              onRefresh={() => fetchWorkouts('refreshing')}
              colors={[colors.red['700']]}
              tintColor={colors.red['700']}
              title="Carregando..."
            />
          }
          ListHeaderComponent={
            <ScreenHeader
              title="Treinos"
              description="O que vamos treinar hoje?"
              canGoBack={false}
              containerClassname="pt-2"
            />
          }
          renderItem={({ item }) => {
            return (
              <TouchableWithoutFeedback
                className="border"
                onPress={() => router.navigate(`/(app)/training/${item.id}` as never)}
              >
                <Card className="bg-slate-700">
                  <Heading>{item.name}</Heading>
                </Card>
              </TouchableWithoutFeedback>
            );
          }}
        />
      )}
    </Container>
  );
}
