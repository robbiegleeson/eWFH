import React from 'react';
import { View } from 'react-native';
import { Text, IconButton, useTheme } from 'react-native-paper';

const NumberInputToggle = ({ month, value, action }) => {
  const { colors } = useTheme();

  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFF', padding: 10, borderRadius: 10, marginBottom: 10 }}>
      <View style={{ flex: 3, alignItems: 'flex-start' }}>
        <Text>{month}</Text>
      </View>
      <View style={{ flex: 1, alignItems: 'center' }}>
        <IconButton size={20} icon="minus" color={colors.white} style={{ backgroundColor: colors.primary}} onPress={() => action(value + 0.5, month)} />
      </View>
      <View style={{ flex: 2, alignItems: 'center' }}>
        <Text>{value}</Text>
      </View>
      <View style={{ flex: 1, alignItems: 'center' }}>
        <IconButton size={20} icon="plus" color={colors.white} style={{ backgroundColor: colors.primary}} onPress={() => action(value - 0.5, month)} />
      </View>
    </View>
  )
}

export default NumberInputToggle;
