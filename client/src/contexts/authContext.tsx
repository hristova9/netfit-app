import { createContext, PropsWithChildren, useState } from "react";
import { User } from "../models/User.model";

interface AuthContextType {
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
  isProfileOwner: (profileId: string) => boolean;
}

// Define the shape of the authentication context
const AuthContext = createContext<AuthContextType>({
  user: null,
  login: () => {},
  logout: () => {},
  isProfileOwner: () => false,
});

// Provider component to wrap around parts of your app that need access to auth
export const AuthProvider = ({ children }: PropsWithChildren<User>) => {
  const [user, setUser] = useState<User | null>(null);

  const login = (userData: User) => setUser(userData);
  const logout = () => setUser(null);

  // Function to check if the logged-in user is viewing their own profile
  const isProfileOwner = (user_id: string) => user?.user_id === user_id;

  return (
    <AuthContext.Provider value={{ user, login, logout, isProfileOwner }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext
// export const useAuth = () => useContext(AuthContext);
