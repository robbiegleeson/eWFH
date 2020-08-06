import React, { useState } from 'react';
import { View } from 'react-native';
import { Text, IconButton, useTheme, ActivityIndicator } from 'react-native-paper';

const NumberInputToggle = ({ month, value, action }) => {
  const [isUpdating, setIsUpdating] = useState(false);
  const { colors, shadow } = useTheme();

  const updateValue = (amount, month) => {
    setIsUpdating(true);
    action(amount, month);
    setIsUpdating(false);
  }

  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFF', padding: 10, borderRadius: 10, marginBottom: 10, ...shadow }}>
      <View style={{ flex: 3, alignItems: 'flex-start' }}>
        <Text>{month}</Text>
      </View>
      <View style={{ flex: 1, alignItems: 'center' }}>
        <IconButton disabled={value <= 0} size={20} icon="minus" color={colors.white} style={{ backgroundColor: colors.primary}} onPress={() => updateValue(value - 0.5, month)} />
      </View>
      <View style={{ flex: 2, alignItems: 'center' }}>
        {isUpdating ? <ActivityIndicator animating={true} color="#3498db"/> : <Text>{value}</Text>}
      </View>
      <View style={{ flex: 1, alignItems: 'center' }}>
        <IconButton size={20} icon="plus" color={colors.white} style={{ backgroundColor: colors.primary}} onPress={() => updateValue(value + 0.5, month)} />
      </View>
    </View>
  )
}

export default NumberInputToggle;
