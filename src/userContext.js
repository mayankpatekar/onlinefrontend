import { createContext, useState, useContext } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userType, setUserType] = useState('');
  const [token, setToken] = useState('');
  const [isAuthenticate, setIsAuthenticate]= useState(false);

  return (
    <UserContext.Provider value={{ userType, setUserType, token, setToken,isAuthenticate,setIsAuthenticate }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  return useContext(UserContext);
};
