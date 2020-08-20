import AsyncStorage from '@react-native-community/async-storage';
import { calculateTaxRelief } from '../utils/calculateTaxRelief';

const useFetchUserData = (selectedDate) => {
  const [userSettings, setUserSettings] = useState();
  const [userItems, setUserItems] = useState();
  const [calculatedTotal, setCalculatedTotal] = useState(0);
  const [calculatedExpenseTotal, setCalculatedExpenseTotal] = useState(0);
  const [isFetching, setIsFetching] = useState(true);

  setIsFetching(true);

  const settings = await AsyncStorage.getItem('@userSettings');
  const settingsParsed = JSON.parse(settings);
  setUserSettings(settingsParsed)

  const valueString = await AsyncStorage.getItem(`@${selectedDate.format('MM-YYYY')}`);
  const value = JSON.parse(valueString);

  if (value) {
    const parsedWithTotals = (value || []).map(item => {
      return {
        ...item,
        calculatedTotal: item.itemType === 'Utility' ? calculateTaxRelief(selectedDate.month(), settingsParsed, item.amount) : (Number(item.amount) * 12.5 / 100).toFixed(2),
      }
    })

    setUserItems(parsedWithTotals);
    const calculatedUtilityTotals = (parsedWithTotals || []).filter(item => item.itemType === 'Utility' || item.itemType === 'utility').map(item => item.calculatedTotal ?? 0);
    const calculatedExpenseTotals = (parsedWithTotals || []).filter(item => item.itemType === 'Expense' || item.itemType === 'expense').map(item => item.calculatedTotal ?? 0);
    setCalculatedTotal(calculatedUtilityTotals.reduce((a, b) => a + b, 0));
    setCalculatedExpenseTotal(calculatedExpenseTotals.reduce((a, b) => a + b, 0));
  } else {
    setUserItems([]);
    setCalculatedTotal(0);
    setCalculatedExpenseTotal(0);
  }

  setIsFetching(false);

  return { isFetching, userItems, calculatedTotal, calculatedExpenseTotal, userSettings }
}

export default useFetchUserData;
