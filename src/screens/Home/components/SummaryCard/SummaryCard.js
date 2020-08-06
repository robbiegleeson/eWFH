import React from 'react';
import { View, Image } from 'react-native';
import { Avatar, Text, useTheme, Divider } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import moment from 'moment';

const SummaryCard = ({ label, rate }) => {
  const { colors, shadow } = useTheme();

  return (
    <View style={{ flex: 1, backgroundColor: colors.white, padding: 20, ...shadow, flexGrow: 1, borderRadius: 20 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
          <View style={{ flex: 1, flexDirection: 'row', padding: 10, paddingTop: 0, alignItems: 'center'}}>
            <Image source={require('../../../../../assets/calendar.png')} style={{ height: 15, width: 15 }} />
            <Text style={{ fontSize: 20, fontFamily: 'SourceSansPro', marginLeft: 10 }}>{moment().format('MMMM')}</Text>
          </View>
        </View>
        <LinearGradient colors={['rgb(129, 200, 238)', 'rgb(22, 137, 252)']} style={{ flex: 1, alignItems: 'center', justifyContent: 'center', width: '100%', borderRadius: 20 }}>
            <Text style={{ paddingVertical: 5, fontSize: 27, fontFamily: 'SourceSansProBold', color: colors.white }}>{label}</Text>
            <Text style={{ fontSize: 12, fontFamily: 'SourceSansPro', color: colors.white }}>Tax Relief</Text>
            <Text style={{ fontSize: 12, fontFamily: 'SourceSansPro', color: colors.white }}>{rate}</Text>
        </LinearGradient>
    </View>
  );
}

export default SummaryCard;
