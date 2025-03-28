// import { createContext, PropsWithChildren, useState } from "react";
// import { User } from "../models/User.model";

// interface AuthContextType {
//   user: User | null;
//   login: (userData: User) => void;
//   logout: () => void;
//   isProfileOwner: (profileId: string) => boolean;
// }

// // Define the shape of the authentication context
// const AuthContext = createContext<AuthContextType>({
//   user: null,
//   login: () => {},
//   logout: () => {},
//   isProfileOwner: () => false,
// });

// // Provider component to wrap around parts of your app that need access to auth
// export const AuthProvider = ({ children }: PropsWithChildren<User>) => {
//   const [user, setUser] = useState<User | null>(null);

//   const login = (userData: User) => setUser(userData);
//   const logout = () => setUser(null);

//   // Function to check if the logged-in user is viewing their own profile
//   const isProfileOwner = (user_id: string) => user?.user_id === user_id;

//   return (
//     <AuthContext.Provider value={{ user, login, logout, isProfileOwner }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// Custom hook to use the AuthContext
// export const useAuth = () => useContext(AuthContext);


// src/hooks/AuthContext.tsx
// import { ReactNode, useEffect, useState } from "react";
// import { useLocation } from "react-router-dom";
// import { AuthContext } from "../hooks/useAuthStatus";

// // Define the shape of the context value


// interface AuthProviderProps {
//   children: ReactNode;
// }

// // Export only the component
// export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
//   const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
//   const [loading, setLoading] = useState<boolean>(true);
//   const { pathname } = useLocation();

//   useEffect(() => {
//     const checkAuth = async () => {
//       try {
//         const response = await fetch("http://localhost:3001/auth/protected-route", {
//           credentials: "include",
//         });
//         const body = await response.json();
//         if (response.ok) {
//           console.log("Auth check:", body.authenticated);
//           setIsAuthenticated(body.authenticated);
//         } else {
//           setIsAuthenticated(false);
//         }
//       } catch (error) {
//         console.error("Fetch error:", error);
//         setIsAuthenticated(false);
//       } finally {
//         setLoading(false);
//       }
//     };

//     checkAuth();
//   }, [pathname]);

//   return (
//     <AuthContext.Provider value={{ isAuthenticated, loading }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };