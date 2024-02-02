import {useShallow} from 'zustand/react/shallow';
import {useStore} from '../../stores';
import {useNavigation} from '@react-navigation/native';
import {PropsWithChildren, useEffect, useLayoutEffect} from 'react';
import {auth} from '../../configs/firebase';
import {getCurrentUser} from '../../services';

export const AuthContainer = ({children}: PropsWithChildren) => {
  const {setUser, finishLoading, userState} = useStore(
    useShallow(state => ({
      setUser: state.setUser,
      startLoading: state.startAuthLoading,
      finishLoading: state.finishAuthLoading,
      userState: state.user,
    }))
  );

  const navigation = useNavigation();

  useLayoutEffect(() => {
    auth.onAuthStateChanged(user => {
      console.log("user", user)
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
        console.log("no user")
        finishLoading();
      }
    });

    return () => {
      finishLoading();
    };
  }, [navigation, finishLoading, setUser]);

  useEffect(() => {
    if (!userState) navigation.navigate('signIn' as never);
  }, [userState, navigation]);

  return <>{children}</>;
};
