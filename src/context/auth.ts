import { createContext, useContext } from 'react';
import type { User } from 'firebase/auth';
import { isFirebaseConfigured } from '../lib/firebase';

export interface MemberProfile {
  fullName: string;
  username: string;
  dateOfBirth: string;
  phone: string;
  gender: string;
  isStudent: boolean;
  collegeName: string;
  major: string;
  currentYear: string;
  graduationYear: string;
}

export interface AuthContextValue {
  user: User | null;
  profile: MemberProfile | null;
  loading: boolean;
  configured: boolean;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
  saveProfile: (profile: MemberProfile) => Promise<void>;
}

export const AuthContext = createContext<AuthContextValue | null>(null);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used inside AuthProvider.');
  }
  return context;
}

export const initialAuthLoading = isFirebaseConfigured;
