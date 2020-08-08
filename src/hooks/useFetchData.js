import React, { useState, useEffect } from 'react';
import moment from 'moment';
import AsyncStorage from '@react-native-community/async-storage';
import { Alert } from 'react-native';
import { calculateTaxRelief, getPercentageRate, calculateDailyRate } from '../utils/calculateTaxRelief';

const useFetchData = (selectedMonth, items) => {
  const [isFetchingItems, setIsFetchingItems] = useState(false);
  const [userSettings, setUserSettings] = useState();
  const [userItems, setUserItems] = useState([]);

  useEffect(() => {
    const retrieveData = async () => {
      const valueString = await AsyncStorage.getItem('@user_settings');
      const settings = JSON.parse(valueString);
      setUserSettings(settings);
    };

    const retrieveUserItems = async () => {
      try {
        setIsFetchingItems(true)
        const valueString = await AsyncStorage.getItem(`@${moment().month(selectedMonth).format('MM-YYYY')}`);
        const items = JSON.parse(valueString);
        const parsedWithTotals = (items || []).map(item => {
          return {
            ...item,
            calculatedTotal: item.itemType === 1 ? calculateTaxRelief(selectedMonth, userSettings, item.amount) : (Number(item.amount) * 12.5 / 100).toFixed(2),
            // taxRate: getPercentageRate(userSettings, selectedMonth),
          }
        })

        setUserItems(parsedWithTotals);

        setIsFetchingItems(false);
      } catch (error) {
        Alert.alert('Error!', error.message);
        setIsFetchingItems(false);
      }
    };
    
    retrieveData().then(() => {
      retrieveUserItems();
    })
  }, [selectedMonth, JSON.stringify(items)]);

  return { isFetchingItems, userItems, userSettings, dailyRate: calculateDailyRate(selectedMonth, userSettings), taxRate: getPercentageRate(userSettings, selectedMonth) };
}

export default useFetchData;