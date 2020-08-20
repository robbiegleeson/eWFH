import React from 'react';
import { Appbar, useTheme } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { View, Image, Platform, Text } from 'react-native';

const Header = ({ leftAction = <Appbar.Action />, rightAction = <Appbar.Action /> }) => {
  const navigation = useNavigation();
  const { colors } = useTheme();

  const _goBack = () => console.log('Went back');

  const _handleMore = () => console.log('Shown more');

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
      <View style={{ position: 'absolute', left: 10, top: Platform.OS === 'android' ? 30 : 40 }}>
        {leftAction}
      </View>
      <View style={{ position: 'absolute', right: 10, top: Platform.OS === 'android' ? 30 : 40 }}>
        {rightAction}
      </View>
      <View style={{ flex: 1 }} />
      <View style={{ flex: 1, alignItems: 'center' }}>
        <Image source={require('../../../assets/cal-lg.png')} style={{ height: 45, width: 45 }} />
        <Text style={{ fontFamily: 'SourceSansPro', fontSize: 24, color: colors.white }}>eWFH</Text>
      </View>
      <View style={{ flex: 1 }} />
    </View>
  );
};

export default Header;