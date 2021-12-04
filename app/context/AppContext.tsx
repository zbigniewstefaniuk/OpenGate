import React, {useContext, useState} from 'react';

const AppContext = React.createContext({});

const AppProvider = ({children}: {children: React.ReactNode}) => {
  const [redirectPhoneNumber, setRedirectPhoneNumber] =
    useState<string>('602605604');

  return (
    <AppContext.Provider
      value={{
        redirectPhoneNumber,
        setRedirectPhoneNumber,
      }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;

export const useAppContext = () => useContext(AppContext);
