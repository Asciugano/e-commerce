import type { User } from '../types/user.ts';
import { createContext, useContext, useState, ReactNode } from "react";

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
}
