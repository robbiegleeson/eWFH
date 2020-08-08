import React from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import { Avatar, Text, useTheme, Divider } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import moment from 'moment';

const SummaryCard = ({ label, rate, selectedDate, setSelectedDate }) => {
  const { colors, shadow } = useTheme();

  const toggleDateBack = () => setSelectedDate(moment(selectedDate).subtract(1, 'month'));

  const toggleDateForward = () => setSelectedDate(moment(selectedDate).add(1, 'month'));

  return (
    <>
      <TouchableOpacity onPress={() => toggleDateBack()} style={{ position: 'absolute', top: '50%', left: 5 }}>
        <Image source={require('../../../../../assets/caret-left.png')} />
      </TouchableOpacity>
      <View style={{ flex: 1, backgroundColor: colors.white, padding: 20, ...shadow, flexGrow: 1, borderRadius: 20 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
          <View style={{ flex: 1, flexDirection: 'row', padding: 10, paddingTop: 0, alignItems: 'center'}}>
            <Image source={require('../../../../../assets/calendar.png')} style={{ height: 15, width: 15 }} />
            <Text style={{ fontSize: 20, fontFamily: 'SourceSansPro', marginLeft: 10 }}>{selectedDate.format('MMMM YYYY')}</Text>
          </View>
        </View>
        <LinearGradient colors={['rgb(129, 200, 238)', 'rgb(22, 137, 252)']} style={{ flex: 1, alignItems: 'center', justifyContent: 'center', width: '100%', borderRadius: 20 }}>
            <Text style={{ paddingVertical: 5, fontSize: 27, fontFamily: 'SourceSansProBold', color: colors.white }}>{label}</Text>
            <Text style={{ fontSize: 12, fontFamily: 'SourceSansPro', color: colors.white }}>Tax Relief</Text>
            <Text style={{ fontSize: 12, fontFamily: 'SourceSansPro', color: colors.white }}>{rate}</Text>
        </LinearGradient>
      </View>
      <TouchableOpacity onPress={() => toggleDateForward()} style={{ position: 'absolute', top: '50%', right: 5 }}>
        <Image source={require('../../../../../assets/caret-right.png')} />
      </TouchableOpacity>
    </>
  );
}

export default SummaryCard;
