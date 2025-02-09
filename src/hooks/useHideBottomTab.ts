import { useFocusEffect } from 'expo-router';
import { useBottomTab } from '../contexts/bottomTabContext';
import { useCallback } from 'react';

export const useHideBottomTab = () => {
  const { isOpen, openBottomTab, closeBottomTab } = useBottomTab();

  useFocusEffect(
    useCallback(() => {
      if (isOpen) {
        closeBottomTab();
      }

      return () => {
        openBottomTab();
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []),
  );
};
