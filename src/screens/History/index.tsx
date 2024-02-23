/* eslint-disable @typescript-eslint/await-thenable */
import {useEffect} from 'react';
import {useShallow} from 'zustand/react/shallow';

import {Container, Content, Header, Loading} from '../../components';
import {useStore} from '../../stores';
import {FlatList, RefreshControl, Text, View} from 'react-native';
import {format} from 'date-fns';

import {styles} from './styles';
import {currentTheme} from '../../styles/theme';

export function HistoryScreen() {
  const {historyList, isLoading, loadHistory, isRefreshing} = useStore(
    useShallow(state => ({
      historyList: state.histories,
      isLoading: state.isHistoryLoading,
      loadHistory: state.loadHistory,
      isRefreshing: state.isHistoryRefreshing,
    }))
  );

  useEffect(() => {
    loadHistory();
  }, [loadHistory]);
  return (
    <Container>
      <Header title="Histórico" />

      {isLoading ? (
        <Loading containerFull />
      ) : (
        <Content>
          <FlatList
            data={historyList}
            keyExtractor={item => item.id}
            showsVerticalScrollIndicator={false}
            renderItem={({item}) => (
              <View style={styles.container}>
                <Text style={{color: 'white'}}>{item.workout_name}</Text>
                <Text style={{color: 'white'}}>
                  {format(item.completed_at, 'dd/MM/yyyy - hh:mm')}
                </Text>
              </View>
            )}
            contentContainerStyle={styles.list}
            refreshControl={
              <RefreshControl
                refreshing={isRefreshing}
                enabled
                onRefresh={async () => {
                  await loadHistory('refresh');
                }}
                title={isRefreshing ? 'Refreshing' : 'Pull to Refresh'}
                tintColor={currentTheme.colors.primary}
                titleColor={currentTheme.colors.primary}
                colors={[currentTheme.colors.primary]}
              />
            }
          />
        </Content>
      )}
    </Container>
  );
}
