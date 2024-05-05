import useAuth, { UserType } from "@/hooks/useAuth";
import { PropsWithChildren, createContext, useContext } from "react";

type AuthContextType = {
  isLoggedIn: boolean;
  user: UserType;
  login: () => Promise<void>;
  logout: () => Promise<void>;
};
const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  user: null,
  login: async () => {},
  logout: async () => {},
});

export const useAuthContext = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const { isLoggedIn, login, logout, user } = useAuth();
  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        login,
        logout,
        user,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
