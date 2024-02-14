import {useEffect} from 'react';

import {Container, Header} from '../../components';
import {listHistories} from '../../services/history';

export function HistoryScreen() {
  useEffect(() => {
    (async () => {
      await listHistories();
    })();
  }, []);
  return (
    <Container>
      <Header title="Histórico" />
    </Container>
  );
}
