import {useShallow} from 'zustand/react/shallow';
import {useStore} from '../stores';
import {useLayoutEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {auth} from '../configs/firebase';
import {getCurrentUser} from '../services';

export const useAuth = () => {
  const {setUser, finishLoading} = useStore(
    useShallow(state => ({
      setUser: state.setUser,
      startLoading: state.startAuthLoading,
      finishLoading: state.finishAuthLoading,
    }))
  );

  const navigation = useNavigation();

  useLayoutEffect(() => {
    auth.onAuthStateChanged(user => {
      if (user) {
        const currentUser = getCurrentUser();

        if (currentUser) {
          setUser({
            name: currentUser.displayName,
            email: currentUser.email,
          });
          navigation.navigate('app' as never);
        }
      } else {
        finishLoading();
      }
    });

    return () => {
      finishLoading();
    };
  }, [navigation, finishLoading, setUser]);

  return {};
};
