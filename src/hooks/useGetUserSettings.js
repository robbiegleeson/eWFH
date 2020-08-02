import react, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-community/async-storage';

const useGetUserSettings = () => {
  try {
    const [userSettings, setUserSettings] = useState();
    const [isLoading, setIsLoading] = useState(false);
  
    useEffect(() => {
      const getUserSettings = async () => {
        setIsLoading(true);
        const valueString = await AsyncStorage.getItem('@userSettings');
        const settings = JSON.parse(valueString);

        console.log(settings)
  
        setUserSettings(settings);
        setIsLoading(false);
      };
      
      getUserSettings();
    }, []);
  
    return { userSettings, isLoading }
  } catch (e) {
    console.log(e.message)
  }
}

export default useGetUserSettings;
