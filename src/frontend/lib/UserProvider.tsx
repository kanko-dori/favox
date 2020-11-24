import firebase from 'firebase/app';
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { auth } from './firebase';

type User = firebase.User | null;

const UserContext = createContext<User>(null);

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC = ({ children }: UserProviderProps) => {
  const [user, setUser] = useState(typeof window !== 'undefined' ? auth.currentUser : null);
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setUser(user);
    });
  }, []);
  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};

export const useUser = (): User => useContext(UserContext);
