import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);   // stores user object
  const [role, setRole] = useState(null);   // stores user_type (admin/staff)

  // Load initial values ONE TIME when app opens
  useEffect(() => {
    const loadAuth = async () => {
      const storedUser = await AsyncStorage.getItem("user");
      const storedRole = await AsyncStorage.getItem("role");

      if (storedUser) setUser(JSON.parse(storedUser));
      if (storedRole) setRole(storedRole);
    };

    loadAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, role, setRole }}>
      {children}
    </AuthContext.Provider>
  );
};
