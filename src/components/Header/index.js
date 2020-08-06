import React from 'react';
import { Appbar, useTheme } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { View, Image } from 'react-native';

const Header = ({ title, subtitle = '', leftAction = <Appbar.Action />, rightAction = <Appbar.Action /> }) => {
  const navigation = useNavigation();
  const { colors } = useTheme();

  const _goBack = () => console.log('Went back');

  const _handleMore = () => console.log('Shown more');

  return (
    <Appbar.Header style={{ backgroundColor: 'transparent' }}>
      {leftAction}{/* <Appbar.Action color={colors.white} icon="menu" onPress={() => navigation.openDrawer()} /> */}
      <Appbar.Content color={colors.white} subtitle={subtitle} />
      {rightAction}{/* <Appbar.Action color={colors.white} icon="plus" onPress={() => navigation.navigate('AddItem')} /> */}
    </Appbar.Header>
  );
};

export default Header;