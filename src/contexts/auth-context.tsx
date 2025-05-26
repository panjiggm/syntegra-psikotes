"use client";

import React, { createContext, useContext, useState } from "react";

interface User {
  email: string;
  name: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
  admin: User | null;
  loginAdmin: (email: string, password: string) => Promise<boolean>;
  logoutAdmin: () => void;
  isAdminAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Demo credentials for admin and candidate
const DEMO_CREDENTIALS = [
  {
    email: "test@admin.com",
    password: "admin123",
    user: {
      email: "test@admin.com",
      name: "Admin Demo",
      role: "Super Admin",
    },
  },
  {
    email: "test@user.com",
    password: "user123",
    user: {
      email: "test@user.com",
      name: "Candidate Demo",
      role: "Candidate",
    },
  },
];

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [admin, setAdmin] = useState<User | null>(null);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Find matching credentials
    const matchedCredential = DEMO_CREDENTIALS.find(
      (cred) => cred.email === email && cred.password === password
    );

    if (matchedCredential) {
      setUser(matchedCredential.user);
      return true;
    }

    return false;
  };

  const loginAdmin = async (
    email: string,
    password: string
  ): Promise<boolean> => {
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Find matching credentials
    const matchedCredential = DEMO_CREDENTIALS.find(
      (cred) => cred.email === email && cred.password === password
    );

    if (matchedCredential) {
      setAdmin(matchedCredential.user);
      return true;
    }

    return false;
  };

  const logout = () => {
    setUser(null);
  };

  const logoutAdmin = () => {
    setAdmin(null);
  };

  const value = {
    user,
    admin,
    login,
    loginAdmin,
    logout,
    logoutAdmin,
    isAuthenticated: !!user,
    isAdminAuthenticated: !!admin,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
