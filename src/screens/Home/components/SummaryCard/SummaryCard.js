import React from 'react';
import { View } from 'react-native';
import { Avatar, Text, useTheme } from 'react-native-paper';

const SummaryCard = ({ label, rate }) => {
  const { colors, shadow } = useTheme();

  return (
    <View style={{ flex: 1, padding: 10, paddingBottom: 0, ...shadow }}>
      <View style={{ alignItems: 'center', justifyContent: 'center', backgroundColor: colors.primary, width: '100%', flexGrow: 1, borderRadius: 10 }}>
        <Text style={{ paddingVertical: 5, fontSize: 24, color: colors.white }}>{label}</Text>
        <Text style={{ fontSize: 12, fontStyle: 'italic', color: colors.white }}>{rate}</Text>
      </View>
    </View>
  );
}

export default SummaryCard;
