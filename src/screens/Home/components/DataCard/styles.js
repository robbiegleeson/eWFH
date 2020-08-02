import React from 'react';
import { useTheme } from 'react-native-paper';

const getStyles = () => {
  const { colors, shadow } = useTheme();

  const styles = {
    container: {
      backgroundColor: colors.primary,
      padding: 10,
      width: '100%',
      borderRadius: 10,
      marginVertical: 10,
      ...shadow,
    },
    providerText: {
      color: colors.white,
      fontSize: 16,
    },
    amountText: {
      color: colors.white,
      fontSize: 12,
      fontStyle: 'italic',
    },
    calculatedTotalText: {
      color: colors.white,
      fontSize: 18,
      marginRight: 10,
    },
    colors: {
      ...colors
    },
  }

  return styles;
}

export default getStyles;
