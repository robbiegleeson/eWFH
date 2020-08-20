import AsyncStorage from '@react-native-community/async-storage';
import moment from 'moment';

function saveItems(month, data) {
  return AsyncStorage.setItem(month, JSON.stringify(data));
}

export default saveItems;
