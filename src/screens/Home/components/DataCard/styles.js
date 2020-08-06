import React from 'react';
import { useTheme } from 'react-native-paper';

const getStyles = () => {
  const { colors, shadow } = useTheme();

  const styles = {
    container: {
      backgroundColor: colors.white,
      padding: 10,
      width: '100%',
      borderRadius: 20,
      marginTop: 15,
      ...shadow,
      // minHeight: 50
    },
    providerText: {
      color: '#000',
      fontSize: 23,
      fontFamily: 'SourceSansPro',
      lineHeight: 33,
      fontWeight: '200'
    },
    amountText: {
      fontSize: 15,
      fontFamily: 'SourceSansPro',
    },
    calculatedTotalText: {
      fontSize: 23,
      fontFamily: 'SourceSansProBold',
      // marginRight: 10,
      color: '#1689FC'
    },
    colors: {
      ...colors
    },
  }

  return styles;
}

export default getStyles;
