import React from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import DatePicker from 'react-native-date-ranges';

import Constants from 'expo-constants';

const statusBarHeight = Constants.statusBarHeight;

const DatteRangeFilter = () => {
  const navigation = useNavigation();

  return (
    <View style={{ flex: 1, paddingTop: statusBarHeight, padding: 20 }}>
      <DatePicker
        style={ { width: 350, height: 45 } }
        customStyles = {{
          placeholderText:{ fontSize:20 }
        }}
        centerAlign
        allowFontScaling={false}
        placeholder={'Apr 27, 2018 → Jul 10, 2018'}
        mode={'range'}
      />
      <TouchableOpacity onPress={() => navigation.navigate('HomePage')}>
        <Text>Go Back</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  searchStyle: {
    borderRadius: 10,
    elevation: 0,
    height: 34,
  },
});

export default DatteRangeFilter;
