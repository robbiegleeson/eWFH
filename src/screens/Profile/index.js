import React, { useState, useEffect } from 'react';
import { View, Platform } from 'react-native';
import { Text, IconButton, ActivityIndicator, useTheme } from 'react-native-paper';

import Header from '../../components/Header';
import { MONTH_NAMES } from '../../utils/monthNamesEnum';
import NumberInputToggle from './NumberInputToggle';
import useGetUserSettings from '../../hooks/useGetUserSettings';

function ProfileScreen({ navigation }) {
  const { colors } = useTheme();
  const { root } = useTheme();
  const { isLoading, userSettings } = useGetUserSettings();
  const [hoursPerDay, setHoursPerDay] = useState();

  useEffect(() => {
    console.log(userSettings)
    setHoursPerDay(userSettings?.hoursPerDay);
  }, []);

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
        {/* {MONTH_NAMES.map((month, i) => <NumberInputToggle action={setDaysForMonth} month={month} value={daysPerMonthList[i]} />)} */}
      </View>
    </View>
  );
}

export default ProfileScreen;
