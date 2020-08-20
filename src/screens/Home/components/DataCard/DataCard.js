import React from 'react';
import { View, TouchableHighlight, Image, TouchableOpacity } from 'react-native';
import { Avatar, Text, Appbar } from 'react-native-paper';

import Swipeable from 'react-native-swipeable';

import getStyles from './styles.js';
import AnimateNumber from 'react-native-animate-number';

const DataCard = ({ provider, type, amount, otherProvider, removeBill, id }) => {
  const styles = getStyles();

  const leftContent = <View style={{ backgroundColor: 'red', marginVertical: 5, flexGrow: 1, justifyContent: 'center' }}><Avatar.Icon style={{ alignSelf: 'flex-end', backgroundColor: 'red' }} size={30} icon="delete" color={styles.colors.white} /></View>;

  const rightButtons = [
    <View style={{ marginHorizontal: 20 }}><TouchableOpacity onPress={() => removeBill(id)} style={{ textAlign: 'center', position: 'absolute', left: 0, top: 30 }}><Image style={{ width: 44, height: 44 }} source={require('../../../../../assets/trash.png')} /></TouchableOpacity></View>,
  ];

  const getProviderLogo = (item) => {
    switch (item) {
      case 'Calor Gas':
        return require('../../../../../assets/calor-logo.png');
      case 'Eir':
        return require('../../../../../assets/eir-logo.jpg');
      case 'Electric Ireland':
        return require('../../../../../assets/electric-ireland-logo.png');
      case 'Bord Gáis Energy':
        return require('../../../../../assets/bord-gais-energy-logo.png');
      case 'Energia':
        return require('../../../../../assets/energia-logo.jpeg');
      case 'SSE Airtricity':
        return require('../../../../../assets/sse-airtricity-logo.png');
      case 'Pinergy':
        return require('../../../../../assets/pinergy-logo.png');
      case 'Three':
        return require('../../../../../assets/three-logo.jpg');
      case 'Virgin Media':
        return require('../../../../../assets/virgin-media-logo.jpg');
      case 'Sky':
          return require('../../../../../assets/sky-logo.jpg');
      case 'Vodafone':
        return require('../../../../../assets/vodafone-logo.jpg');
      case 'Imagine':
        return require('../../../../../assets/imagine-logo.png');
      case 'Revenue':
        return require('../../../../../assets/revenue.png')
      case 'Other':
        return require('../../../../../assets/cal-lg.png');
      default:
        return require('../../../../../assets/cal-lg.png')
    }
  }

  const formatAmount = (amount) => {
    const amountInt = Number(amount);
    return String(amountInt.toFixed(2))
  }

  return (
    <Swipeable style={{ paddingHorizontal: 20, marginBottom: 10 }} rightButtons={rightButtons}>
      <View style={styles.container}>
        <View style={{ flexDirection: 'row', alignItems: 'center'}}>
          <View style={{ flex: 2, justifyContent: 'center', alignItems: 'center' }}>
            <Image source={getProviderLogo(provider)} style={{ width: 40, height: 40, borderRadius: 20 }} />
          </View>
          <View style={{ flex: 6, paddingHorizontal: 10 }}>
            <Text style={styles.providerText}>{provider === 'Other' ? otherProvider : provider}</Text>
            {/* <Text style={styles.amountText}>{`${type}:`}<Text style={{ color: type === 'Expense' ? '#FE52A2' : '#1689FC' }}>{`  €${amount}`}</Text></Text> */}
          </View>
          <View style={{ flex: 4, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
            <Text style={[styles.calculatedTotalText, { color: type === 'Expense' ? '#FE52A2' : '#1689FC' }]}>{`€${formatAmount(amount)}`}</Text>
          </View>
        </View>
      </View>
    </Swipeable>
  );
}

export default DataCard;
