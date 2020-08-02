import react, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-community/async-storage';

const useGetUserSettings = () => {
  const [hoursPerDay, setHoursPerDay] = useState(0);
  const [daysPerMonthList, setDaysPerMonthList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState();

  useEffect(() => {
    const getUserSettings = async () => {
      setIsLoading(true);
      const valueString = await AsyncStorage.getItem('@userSettings');
      const settings = JSON.parse(valueString);

      if (settings) {
        setHoursPerDay(settings?.hoursPerDay);
        setDaysPerMonthList(settings?.daysPerMonthList)
        setIsLoading(false);
      } else {
        setErrorMessage('No settings saved. Please update your profile.')
      }
    };
    
    getUserSettings();
  }, []);

  return { isLoading, daysPerMonthList, hoursPerDay, errorMessage };
}

export default useGetUserSettings;
