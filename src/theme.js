import { Platform } from 'react-native';
import { DefaultTheme } from 'react-native-paper';

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: '#3498db',
    accent: '#f1c40f',
    white: '#FFF',
    grey: '#E5E7E9',
    // text: '#FFF'
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowRadius: 2,
    shadowOpacity: 0.5,
  },
  root: {
    position: 'absolute',
    top: 0, 
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: '#E5E7E9',
  },
};

export default theme;
