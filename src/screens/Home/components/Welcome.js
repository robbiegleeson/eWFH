import React from 'react';
import { Image, Text, View, StyleSheet } from 'react-native';

import image from '../../../../assets/cal-lg.png';

const Welcome = ({ subtitle }) => {
  return (
    <View style={styles.container}>
      <View>
        <Image source={image} style={styles.image} />
      </View>
      <View style={{ padding: 20}}>
        <Text style={styles.subTitleText}>{subtitle}</Text>
      </View>
    </View>
  )
};

Welcome.defaultProps = {
  subtitle: 'Here\'s your e-Work from home summary',
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    height: 45,
    width: 45,
    borderRadius: 22.5,
    marginLeft: 10
  },
  titleText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#484349',
  },
  subTitleText: {
    fontSize: 14,
    color: '#484349',
  }
});

export default Welcome;
