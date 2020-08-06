import React from 'react';
import { View, TouchableHighlight, Image } from 'react-native';
import { Avatar, Text } from 'react-native-paper';

import Swipeable from 'react-native-swipeable';

import getStyles from './styles.js';

const DataCard = ({ provider, type, amount, calculatedTotal }) => {
  const styles = getStyles();

  const leftContent = <View style={{ backgroundColor: 'red', marginVertical: 5, flexGrow: 1, justifyContent: 'center' }}><Avatar.Icon style={{ alignSelf: 'flex-end', backgroundColor: 'red' }} size={30} icon="delete" color={styles.colors.white} /></View>;

  const rightButtons = [
    <View style={{ marginHorizontal: 20 }}><TouchableHighlight style={{ textAlign: 'center', position: 'absolute', left: 0, top: 40 }}><Avatar.Icon size={30} icon="folder" color={styles.colors.white} /></TouchableHighlight></View>,
    // <TouchableHighlight><Text>Button 2</Text></TouchableHighlight>
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
      case 'Other':
        return require('../../../../../assets/cal-lg.png');
      default:
        return require('../../../../../assets/cal-lg.png')
    }
  }

  return (
    <Swipeable style={{ marginHorizontal: 20 }} rightButtons={rightButtons}>
      <View style={styles.container}>
        <View style={{ flexDirection: 'row' }}>
          <View style={{ flex: 2, justifyContent: 'center', alignItems: 'center' }}>
            <Image source={getProviderLogo(provider)} style={{ width: 60, height: 60, borderRadius: 30 }} />
          </View>
          <View style={{ flex: 6, paddingHorizontal: 10 }}>
            <Text style={styles.providerText}>{provider}</Text>
            <Text style={styles.amountText}>{'Utility:'}<Text style={{ color: '#1689FC' }}>{`  €${amount}`}</Text></Text>
          </View>
          <View style={{ flex: 3, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
            <Text style={styles.calculatedTotalText}>{`€${calculatedTotal}`}</Text>
            {/* <Avatar.Icon size={30} icon="delete" color={styles.colors.white} />
            <Avatar.Icon size={30} icon="pen" color={styles.colors.white} /> */}
          </View>
        </View>
      </View>
    </Swipeable>
  );
}

export default DataCard;
