import firebase from 'firebase/app';
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { useFirebase } from './firebase';

type User = firebase.User | null;

const UserContext = createContext<User>(null);

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const { auth } = useFirebase();
  const [user, setUser] = useState<User>(
    typeof window !== 'undefined' ? auth?.currentUser ?? null : null
  );
  useEffect(() => {
    const unsubscribe = auth?.onAuthStateChanged((user) => {
      setUser(user);
    });
    return unsubscribe;
  }, [auth]);
  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};

export const useUser = (): User => useContext(UserContext);
