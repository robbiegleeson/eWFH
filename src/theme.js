import { DefaultTheme } from 'react-native-paper';

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: '#1689fc',
    accent: '#f1c40f',
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.58,
    shadowRadius: 20.00,
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
