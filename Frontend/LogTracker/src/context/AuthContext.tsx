import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import api from "../api/axios";

type AuthContextType = {
  isLoggedIn: boolean;
  loading: boolean;
  checkA: () => Promise<void>;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Shared authentication state for the app. This keeps the auth check centralized
// without changing the existing API or route behavior.
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  const checkA = useCallback(async () => {
    try {
      await api.get("/getme");
      setIsLoggedIn(true);
    } catch {
      setIsLoggedIn(false);
    }
  }, []);

  useEffect(() => {
    let isMounted = true;

    const initializeAuth = async () => {
      setLoading(true);
      await checkA();

      if (isMounted) {
        setLoading(false);
      }
    };

    void initializeAuth();

    return () => {
      isMounted = false;
    };
  }, [checkA]);

  const value = useMemo(
    () => ({
      isLoggedIn,
      loading,
      checkA,
      setIsLoggedIn,
    }),
    [checkA, isLoggedIn, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}
