import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {createContext, useState, FC} from 'react';
import {ContextType, IContextData, IKeys, Movie} from './types';
import {Constants} from './utils/Constants';

const initData: IContextData = {
  favorites: [],
  hidden: [],
};
const intialValues: ContextType = {
  data: initData,
  loadItems: () => {},
  addItem: () => {},
  removeItem: () => {},
};

export const AppContext = createContext<ContextType>(intialValues);

const AppProvider: FC = ({children}) => {
  const [data, setData] = useState<IContextData>(initData);

  const persistData = async (pData: IContextData) => {
    try {
      setData(pData);
      await AsyncStorage.setItem(Constants.storage, JSON.stringify(pData));
    } catch (error) {
      console.log(error);
    }
  };

  const loadItems = (loadData: IContextData) => {
    setData(loadData);
  };

  const addItem = (movie: Movie, prop: IKeys) => {
    let index = data[prop].findIndex(f => f.id === movie.id);
    if (index === -1) {
      persistData({...data, [prop]: [...data[prop], movie]});
    }
  };

  const removeItem = (movie: Movie, prop: IKeys) => {
    let filtered = data[prop].filter(f => f.id !== movie.id);
    persistData({...data, [prop]: filtered});
  };

  return (
    <AppContext.Provider
      value={{
        data,
        loadItems,
        addItem,
        removeItem,
      }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
