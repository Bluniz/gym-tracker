import {useCallback, useState} from 'react';


export const useLoading = (initialState: boolean = false) => {
  const [isLoading, setIsLoading] = useState(initialState);

  const handleStartLoading = useCallback(() => setIsLoading(true), []);
  const handleFinishLoading = useCallback(() => setIsLoading(false), []);
  const handleToggleLoading = () => setIsLoading((prev) => !prev);

  return {
    isLoading,
    handleStartLoading,
    handleFinishLoading,
    handleToggleLoading
  };
};