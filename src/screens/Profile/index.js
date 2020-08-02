import React, { useState, useEffect } from 'react';
import { View, Platform, ScrollView } from 'react-native';
import { Text, IconButton, ActivityIndicator, useTheme } from 'react-native-paper';

import Header from '../../components/Header';
import { MONTH_NAMES } from '../../utils/monthNamesEnum';
import AsyncStorage from '@react-native-community/async-storage';
import NumberInputToggle from './NumberInputToggle';

function ProfileScreen({ navigation }) {
  const { colors, root } = useTheme();
  const [hoursPerDay, setHoursPerDay] = useState();
  const [daysPerMonthList, setDaysPerMonthList] = useState();
  const [isLoading, setIsLoading] = useState(true);

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
        alert('made it')
      }
    };
    
    getUserSettings();
  }, []);

  if (isLoading) {
    return (
      <View style={{
        position: 'absolute',
        top: 0, 
        left: 0,
        bottom: 0,
        right: 0,
        backgroundColor: '#E5E7E9',
        display: 'flex'
      }}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator animating={true} color="#3498db" />
        </View>
      </View>
    )
  }

  const setDaysForMonth = (number, month) => {
    const monthToUpdateIndex = MONTH_NAMES.findIndex(item => item === month);
    const listCopy = [...daysPerMonthList];
    listCopy[monthToUpdateIndex] = number;
    setDaysPerMonthList(listCopy)
  }

  return (
    <View style={root}>
      <Header title="My Profile" />
      <View style={{ flex: 1, alignItems: 'center', padding: 10 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFF', padding: 10, borderRadius: 10, marginBottom: 10 }}>
          <View style={{ flex: 3, alignItems: 'flex-start' }}>
            <Text>Hours Per Day</Text>
          </View>
          <View style={{ flex: 1, alignItems: 'center' }}>
            <IconButton size={20} icon="minus" color={colors.white} style={{ backgroundColor: colors.primary}} onPress={() => setHoursPerDay(hoursPerDay - 0.5)} />
          </View>
          <View style={{ flex: 2, alignItems: 'center' }}>
            <Text>{isLoading ? 0 : hoursPerDay}</Text>
          </View>
          <View style={{ flex: 1, alignItems: 'center' }}>
            <IconButton size={20} icon="plus" color={colors.white} style={{ backgroundColor: colors.primary}} onPress={() => setHoursPerDay(hoursPerDay + 0.5)} />
          </View>
        </View>
        <Text style={{ alignSelf: 'flex-start', padding: 10, paddingLeft: 5 }}>Days WFH By Month</Text>
        <ScrollView style={{ width: '100%' }}>
          {MONTH_NAMES.map((month, i) => {
            console.log(isLoading)
            console.log(daysPerMonthList)
            const val = daysPerMonthList[i];
            return (
              <NumberInputToggle action={(val) => {
                setDaysForMonth(val, month)
              }} month={month} value={val} />
            );
          })}
        </ScrollView>
      </View>
    </View>
  );
}

export default ProfileScreen;
