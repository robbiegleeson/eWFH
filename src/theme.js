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
      height: 5,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3.84,

    elevation: 5,
  },
  root: {
    position: 'absolute',
    top: 0, 
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: 'transparent',
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center"
  }
};

export default theme;
