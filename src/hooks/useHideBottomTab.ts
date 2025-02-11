import { useFocusEffect } from 'expo-router';
import { useBottomTab } from '../contexts/bottomTabContext';
import { useCallback } from 'react';

export const useHideBottomTab = () => {
  const { isOpen, closeBottomTab } = useBottomTab();

  useFocusEffect(
    useCallback(() => {
      if (isOpen) {
        closeBottomTab();
      }

      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []),
  );
};
