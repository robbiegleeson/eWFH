import React from 'react';
import { View } from 'react-native';
import { Avatar, Text } from 'react-native-paper';

import getStyles from './styles.js';

const DataCard = ({ provider, type, amount, calculatedTotal }) => {
  const styles = getStyles();

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <View style={{ flex: 1 }}>
          <Avatar.Icon size={30} icon="folder" color={styles.colors.white} />
        </View>
        <View style={{ flex: 5 }}>
          <Text style={styles.providerText}>{provider}</Text>
          <Text style={styles.amountText}>{`Invoice: €${amount}`}</Text>
        </View>
        <View style={{ flex: 3, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
          <Text style={styles.calculatedTotalText}>{`€${calculatedTotal}`}</Text>
          <Avatar.Icon size={30} icon="delete" color={styles.colors.white} />
          <Avatar.Icon size={30} icon="pen" color={styles.colors.white} />
        </View>
      </View>
    </View>
  );
}

export default DataCard;
