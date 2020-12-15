// import { FileSystem } from 'react-native';
// import { saveAs } from 'file-saver';
// import JSZip from 'jszip'

import XLSX from 'xlsx';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import AsyncStorage from '@react-native-community/async-storage';

const generateDownloadFile = async () => {
  const canShare = await Sharing.isAvailableAsync();

  const invoices = await AsyncStorage.getItem(`@userInvoices`);
  const userInvoicesParsed = JSON.parse(invoices);

  var ws = XLSX.utils.json_to_sheet(userInvoicesParsed.map((item) => ({
    provider: item.title,
    category: item.category,
    amount: item.amount,
    'relief amount': (item.amount * 10) / 100,
  })));
  var wb = XLSX.utils.book_new();
  
  XLSX.utils.book_append_sheet(wb, ws, "Invoices");
  
  const wbout = XLSX.write(wb, {
    type: 'base64',
    bookType: "xlsx"
  });

  const uri = FileSystem.cacheDirectory + 'e-wfh-invoices.xlsx';

  await FileSystem.writeAsStringAsync(uri, wbout, {
    encoding: FileSystem.EncodingType.Base64
  });

  await Sharing.shareAsync(uri, {
    mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    dialogTitle: 'Invoice Data',
    UTI: 'com.microsoft.excel.xlsx'
  });
}

export default generateDownloadFile;
