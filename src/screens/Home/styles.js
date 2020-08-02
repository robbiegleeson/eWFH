import React from 'react';
import { useTheme } from 'react-native-paper';

const getStyles = () => {
  const { colors } = useTheme();

  const styles = {
    root: {
      position: 'absolute',
      top: 0, 
      left: 0,
      bottom: 0,
      right: 0,
      backgroundColor: colors.grey,
    },
  }

  return styles;
}

export default getStyles;
