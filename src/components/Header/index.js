import React from 'react';
import { Appbar, useTheme } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

const Header = ({ title, subtitle = '' }) => {
  const navigation = useNavigation();
  const { colors } = useTheme();

  const _goBack = () => console.log('Went back');

  const _handleMore = () => console.log('Shown more');

  return (
    <Appbar.Header>
      <Appbar.Action color={colors.white} icon="menu" onPress={() => navigation.openDrawer()} />
      <Appbar.Content color={colors.white} title={title} subtitle={subtitle} />
      <Appbar.Action color={colors.white} icon="dots-vertical" onPress={_handleMore} />
    </Appbar.Header>
  );
};

export default Header;