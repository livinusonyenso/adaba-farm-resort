"use client"; // if you're using Next.js App Router (app/ directory)

import React, { createContext, useContext, useState, ReactNode } from "react";

type User = {
  id: string;
  name: string;
  email: string;
  role?: string;
};

type UserContextType = {
  user: User | null;
  setUser: (user: User | null) => void;
  tempUser: boolean;
  setTempUser: (value: boolean) => void; // ✅ accept boolean
  logout: () => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [tempUser, setTempUser] = useState<boolean>(true);

  const logout = () => {
    setUser(null);
    setTempUser(false); // optional: reset temp state on logout
  };

  return (
    <UserContext.Provider
      value={{ user, setUser, tempUser, setTempUser, logout }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
