import react, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-community/async-storage';

const useInitUser = () => {
  try {
    const [userSettings, setUserSettings] = useState();
    const [isLoading, setIsLoading] = useState(false);
  
    useEffect(() => {
      const getUserSettings = async () => {
        setIsLoading(true);
        const valueString = await AsyncStorage.getItem('@userSettings');
        const settings = JSON.parse(valueString);
  
        if (!settings) {
          const userSettings = JSON.stringify({
            hoursPerDay: 8,
            daysPerMonthList: [22, 20, 21, 21, 20, 21, 23, 20, 22, 21, 21, 21],
          });
  
          await AsyncStorage.setItem('@userSettings', userSettings);
          setUserSettings(userSettings);
          setTimeout(() => setIsLoading(false), 500)
        }

        setTimeout(() => setIsLoading(false), 500)
      };
      
      getUserSettings();
    }, []);
  
    return { userSettings, isLoading }
  } catch (e) {
    console.log(e.message)
  }
}

export default useInitUser;
