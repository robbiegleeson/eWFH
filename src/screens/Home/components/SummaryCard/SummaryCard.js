import React, { useState, useEffect } from 'react';
import { View, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import {Avatar, Text, useTheme, Divider, Appbar, IconButton, Portal, Snackbar } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import moment from 'moment';
import AnimateNumber from 'react-native-animate-number'
import AsyncStorage from '@react-native-community/async-storage';
import { useNavigation } from '@react-navigation/native';

const SummaryCard = ({ value, selectedDate, setSelectedDate }) => {
  const [totalDaysInYear, setTotalDaysInYear] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    const getUserSettings = async () => {
      setIsLoading(true);
      const valueString = await AsyncStorage.getItem(`@${selectedDate.year()}-settings`);
      

      if (valueString) {
        const settings = JSON.parse(valueString);
        setTotalDaysInYear(settings?.daysPerMonthList.reduce((a, b) => Number(a) + Number(b), 0))
        setIsLoading(false);
      } else {
        setTotalDaysInYear(0)
        setIsLoading(false);
      }
    };
    
    getUserSettings();
  }, [setSelectedDate]);

  const { colors, shadow } = useTheme();

  const toggleDateBack = () => setSelectedDate(moment(selectedDate).subtract(1, 'year'));

  const toggleDateForward = () => setSelectedDate(moment(selectedDate).add(1, 'year'));

  const totalCalc = (10 * (value * totalDaysInYear) / 365) / 100;

  return (
    <>
      <Portal>
        <Snackbar
          theme={{ colors: { accent: '#FFF' }}}
          style={{ backgroundColor: '#1689FC'}}
          visible={isModalOpen}
          onDismiss={() => setIsModalOpen(false)}
          action={{
            label: 'Go to my Profile',
            onPress: () => {
              navigation.navigate('Profile');
              setIsModalOpen(false);
            },
          }}>
          {`You haven't setup your profile ${moment(selectedDate).format('YYYY')} for  yet. Do it now?`}
        </Snackbar>
      </Portal>
      <View style={{ flex: 1, backgroundColor: colors.white, padding: 20, ...shadow, flexGrow: 1, borderRadius: 20 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
          <View style={{ flex: 1, flexDirection: 'row', padding: 10, paddingTop: 0, alignItems: 'center', justifyContent: 'center'}}>
            <View style={{ flex: 1, alignItems: 'flex-start' }}>
              <TouchableOpacity style={{ padding: 10 }} onPress={() => toggleDateBack()}>
                <Image source={require('../../../../../assets/caret-left.png')} />
              </TouchableOpacity>
            </View>
            <View style={{ flex: 4, alignItems: 'center', justifyContent: 'center', flexDirection: 'row'}}>
              <Image source={require('../../../../../assets/calendar.png')} style={{ height: 15, width: 15 }} />
              <Text style={{ color: '#1689FC', fontSize: 20, fontFamily: 'SourceSansPro', marginLeft: 10 }}>{selectedDate.format('YYYY')}</Text>
            </View>
            <View style={{ flex: 1, alignItems: 'flex-end' }}>
              <TouchableOpacity style={{ padding: 10 }} onPress={() => toggleDateForward()}>
                <Image source={require('../../../../../assets/caret-right.png')} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={{ flexDirection: 'row', flex: 1 }}>
          <LinearGradient colors={['rgb(245, 132, 162)', 'rgb(254, 82, 162)']} style={{ flex: 1, alignItems: 'center', justifyContent: 'center', width: '100%', borderRadius: 20, marginRight: 5 }}>
            {totalDaysInYear <= 0 && (
              <View style={{ position: 'absolute', top: 0, left: 0 }}>
                <IconButton size={20} icon="alert" color={colors.white} style={{ backgroundColor: 'transparent' }} onPress={() => setIsModalOpen(true)} />
              </View>
            )}
            <AnimateNumber style={{ paddingVertical: 5, fontSize: 27, fontFamily: 'SourceSansProBold', color: colors.white }} value={totalCalc} formatter={(val) => {
              return '€' + parseFloat(val).toFixed(2)
            }}/>
              {/* <Text style={{ paddingVertical: 5, fontSize: 27, fontFamily: 'SourceSansProBold', color: colors.white }}>€<AnimateNumber value={Number(label)} /></Text> */}
              <Text style={{ fontSize: 12, fontFamily: 'SourceSansPro', color: colors.white }}>Available Tax Relief</Text>
          </LinearGradient>
          <LinearGradient colors={['rgb(129, 200, 238)', 'rgb(22, 137, 252)']} style={{ flex: 1, alignItems: 'center', justifyContent: 'center', width: '100%', borderRadius: 20, marginLeft: 5 }}>
            <AnimateNumber style={{ paddingVertical: 5, fontSize: 27, fontFamily: 'SourceSansProBold', color: colors.white }} value={value} formatter={(val) => {
              return '€' + parseFloat(val).toFixed(2)
            }}/>
            <Text style={{ fontSize: 12, fontFamily: 'SourceSansPro', color: colors.white }}>Total Year Expense</Text>
          </LinearGradient>
        </View>
      </View>
    </>
  );
}

export default SummaryCard;
