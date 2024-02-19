import {useEffect, useState} from 'react';

import {Container, Content, Header, Loading} from '../../components';
import {listHistories} from '../../services/history';
import {IHistory} from '../../types/history';
import {FlatList, Text, View} from 'react-native';

import {styles} from './styles';

export function HistoryScreen() {
  const [historyData, setHistoryData] = useState<IHistory[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  //! Adicionar Store dos históricos
  //! Terminar listagem
  //! Refresh Controll

  const loadHistories = async () => {
    try {
      const data = await listHistories();
      setHistoryData(data || []);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadHistories();
  }, []);
  return (
    <Container>
      <Header title="Histórico" />
      <Content>
        {isLoading ? (
          <View style={styles.loadingContainer}>
            <Loading />
          </View>
        ) : (
          <FlatList
            data={historyData}
            keyExtractor={item => item.id}
            showsVerticalScrollIndicator={false}
            renderItem={({item}) => (
              <View style={styles.historyItemContainer}>
                <Text>{item.workout_name}</Text>
              </View>
            )}
          />
        )}
      </Content>
    </Container>
  );
}
