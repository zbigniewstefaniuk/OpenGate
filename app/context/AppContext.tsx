import React, {useContext} from 'react';
import MMKVStorage, {useMMKVStorage} from 'react-native-mmkv-storage';

const AppContext = React.createContext({});
const MMKV = new MMKVStorage.Loader().initialize();

const AppProvider = ({children}: {children: React.ReactNode}) => {
  const [redirectPhoneNumber, setRedirectPhoneNumber] = useMMKVStorage(
    'phoneRecallNumber',
    MMKV,
    '',
  ); // empty string is default value

  const [isReCallAfterMissedCall, setIsReCallAfterMissedCall] = useMMKVStorage(
    'isReCallAfterMissedCall',
    MMKV,
    false,
  ); // empty string is default value

  const [isReCallAfterAnsweredCall, setIsReCallAfterAnsweredCall] =
    useMMKVStorage('isReCallAfterAnsweredCall', MMKV, false); // empty string is default value

  return (
    <AppContext.Provider
      value={{
        redirectPhoneNumber,
        setRedirectPhoneNumber,
        isReCallAfterMissedCall,
        setIsReCallAfterMissedCall,
        isReCallAfterAnsweredCall,
        setIsReCallAfterAnsweredCall,
      }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;

export const useAppContext = () => useContext(AppContext);
