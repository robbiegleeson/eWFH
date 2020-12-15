import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-community/async-storage';

const useOnboarding = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isOnboarded, setIsOnboarded] = useState(false);

  useEffect(() => {
    const getOnboardingStatus = async () => {
      setIsLoading(true);
      const onboarded = await AsyncStorage.getItem(`@e-wfh-onboarded`);
      
      if (onboarded) {
        setIsOnboarded(true);
      }

      setIsLoading(false);
    }

    getOnboardingStatus();
  }, []);

  return { isLoading, isOnboarded, setIsOnboarded }
}

export default useOnboarding;
