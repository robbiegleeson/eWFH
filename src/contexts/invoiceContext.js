import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-community/async-storage';

export const InvoiceContext = createContext(null);

export const InvoiceProvider = ({ children }) => {
  const [invoiceContext, setInvoiceContext] = useState([]);

  useEffect(() => {
    const fetchInvoices = async () => {
      const invoices = await AsyncStorage.getItem(`@userInvoices`);
      const userInvoicesParsed = JSON.parse(invoices);

      if (userInvoicesParsed) {
        setInvoiceContext(userInvoicesParsed);
      }
    }

    fetchInvoices();
  }, []);

  const addInvoiceContext = (newInvoice) => {
    const updatedList = [...invoiceContext, {
      id: Math.random(),
      ...newInvoice
    }];

    AsyncStorage.setItem('@userInvoices', JSON.stringify(updatedList))
      .then(() => setInvoiceContext(updatedList));
  };

  const deleteInvoiceContext = (id) => {
    const filteredData = invoiceContext.filter((item) => item.id !== id);
  
    AsyncStorage.setItem('@userInvoices', JSON.stringify(filteredData))
      .then(() => setInvoiceContext(filteredData));
  }

  return (
    <InvoiceContext.Provider value={{ invoiceContext, addInvoiceContext, deleteInvoiceContext }}>
      {children}
    </InvoiceContext.Provider>
  );
};
