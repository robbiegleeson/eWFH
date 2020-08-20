import React, { useState, useEffect } from 'react';
import { View, Platform, ScrollView, ImageBackground } from 'react-native';
import { Text, FAB, ActivityIndicator, useTheme, Dialog, Portal, Switch, Button, Appbar, List, Snackbar } from 'react-native-paper';
import moment from 'moment';

import Header from '../../components/Header';
import { MONTH_NAMES } from '../../utils/monthNamesEnum';
import AsyncStorage from '@react-native-community/async-storage';
import NumberInputToggle from './NumberInputToggle';
import DateToggle from '../../components/DateToggle';

function ProfileScreen({ navigation }) {
  const { colors, root, image, shadow } = useTheme();
  const [hoursPerDay, setHoursPerDay] = useState();
  const [daysPerMonthList, setDaysPerMonthList] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(moment());
  const [key, setKey] = useState(`@${moment().year()}-settings`)

  const img = require('../../../assets/app-background.png');

  useEffect(() => {
    const getUserSettings = async () => {
      setIsLoading(true);
      const valueString = await AsyncStorage.getItem(key);
      const settings = JSON.parse(valueString);

      if (settings) {
        setHoursPerDay(settings?.hoursPerDay);
        setDaysPerMonthList(settings?.daysPerMonthList)
        setIsLoading(false);
      } else {
        setHoursPerDay(0);
        setDaysPerMonthList([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
        setIsLoading(false);
      }
    };
    
    getUserSettings();
  }, [key]);

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

    AsyncStorage.setItem(key, JSON.stringify(settings))
      .then(() => {
        setIsModalOpen(true);
        navigation.navigate('Home');
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
      <ImageBackground resizeMode="stretch" source={img} style={image}>
        <Portal>
          <Snackbar
            theme={{ colors: { accent: '#FFF' }}}
            style={{ backgroundColor: '#1689FC'}}
            visible={isModalOpen}
            onDismiss={() => setIsModalOpen(false)}
            action={{
              label: 'Ok!',
              onPress: () => {
                setIsModalOpen(false);
              },
            }}>
            Profile Updated!
          </Snackbar>
        </Portal>
        <Header
          leftAction={<Appbar.Action color={colors.white} icon="arrow-left" onPress={() => navigation.goBack()} />}
        />
        <View style={{  flex: 4, backgroundColor: '#FFF', borderRadius: 20 }}>
          <DateToggle selectedDate={selectedDate} setSelectedDate={(date) => {
            setKey(`@${date.year()}-settings`)
            setSelectedDate(date);
          }} />
          <NumberInputToggle month="Hours Per Day" action={(val) => {
            saveHoursPerDay(val)
          }} value={hoursPerDay} />
          <ScrollView>
            <Text style={{ alignSelf: 'flex-start', padding: 10, paddingLeft: 5, marginHorizontal: 20 }}>Days WFH By Month</Text>
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
        <Button onPress={() => saveProfile()}>Save</Button>
      </ImageBackground>
    </View>
  );
}

export default ProfileScreen;
