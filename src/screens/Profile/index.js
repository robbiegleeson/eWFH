import React, { useState, useEffect } from 'react';
import { View, Platform, ScrollView } from 'react-native';
import { Text, FAB, ActivityIndicator, useTheme, Dialog, Portal, Paragraph, Button, Appbar } from 'react-native-paper';

import Header from '../../components/Header';
import { MONTH_NAMES } from '../../utils/monthNamesEnum';
import AsyncStorage from '@react-native-community/async-storage';
import NumberInputToggle from './NumberInputToggle';

function ProfileScreen({ navigation }) {
  const { colors, root, shadow } = useTheme();
  const [hoursPerDay, setHoursPerDay] = useState();
  const [daysPerMonthList, setDaysPerMonthList] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const saveProfile = () => {
    const settings = {
      hoursPerDay,
      daysPerMonthList,
    }

    AsyncStorage.setItem('@userSettings', JSON.stringify(settings))
      .then(() => {
        console.log(settings)
        setIsModalOpen(true);
      })
  }

  const setDaysForMonth = (number, month) => {
    const monthToUpdateIndex = MONTH_NAMES.findIndex(item => item === month);
    const listCopy = [...daysPerMonthList];
    listCopy[monthToUpdateIndex] = number;
    setDaysPerMonthList(listCopy);
  }

  const saveHoursPerDay = (val) => {
    setHoursPerDay(val)
  }

  return (
    <View style={root}>
      <Portal>
        <Dialog visible={isModalOpen} onDismiss={() => setIsModalOpen(false)}>
          <Dialog.Title>Success</Dialog.Title>
          <Dialog.Actions>
            <Button onPress={() => setIsModalOpen(false)}>Ok!</Button>
          </Dialog.Actions>
        </Dialog>
        </Portal>
        <Header leftAction={<Appbar.Action color="#FFF" icon="arrow-left" onPress={() => navigation.goBack()} />} title="My Profile" />
        <View style={{ flex: 1, alignItems: 'center', padding: 10 }}>
          <NumberInputToggle month="Hours Per Day" action={(val) => {
              saveHoursPerDay(val)
            }} value={hoursPerDay} />
          <Text style={{ alignSelf: 'flex-start', padding: 10, paddingLeft: 5 }}>Days WFH By Month</Text>
          <ScrollView showsVerticalScrollIndicator={false} style={{ width: '100%' }}>
            {MONTH_NAMES.map((month, i) => {
              const val = daysPerMonthList[i];
              return (
                <NumberInputToggle action={(val) => {
                  setDaysForMonth(val, month)
                }} month={month} value={val} />
              );
            })}
          </ScrollView>
        </View>
        <FAB
          color={colors.white}
          style={{
            position: 'absolute',
            margin: 16,
            right: 0,
            bottom: 0,
            backgroundColor: colors.primary
          }}
          small
          icon="content-save"
          onPress={() => saveProfile()}
        />
    </View>
  );
}

export default ProfileScreen;
