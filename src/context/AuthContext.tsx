import { useEffect, useMemo, useState, type PropsWithChildren } from 'react';
import type { User } from 'firebase/auth';
import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut as firebaseSignOut } from 'firebase/auth';
import { doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore';
import { firebaseAuth, firestore, isFirebaseConfigured } from '../lib/firebase';
import { AuthContext, initialAuthLoading, type AuthContextValue, type MemberProfile } from './auth';

const profileFromDocument = (data: Record<string, unknown>): MemberProfile => ({
  fullName: String(data.fullName ?? ''),
  username: String(data.username ?? ''),
  dateOfBirth: String(data.dateOfBirth ?? ''),
  phone: String(data.phone ?? ''),
  gender: String(data.gender ?? ''),
  isStudent: Boolean(data.isStudent),
  collegeName: String(data.collegeName ?? ''),
  major: String(data.major ?? ''),
  currentYear: String(data.currentYear ?? ''),
  graduationYear: String(data.graduationYear ?? ''),
});

export function AuthProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<MemberProfile | null>(null);
  const [loading, setLoading] = useState(initialAuthLoading);

  useEffect(() => {
    const activeAuth = firebaseAuth;
    const activeFirestore = firestore;
    if (!activeAuth || !activeFirestore) return;

    return onAuthStateChanged(activeAuth, async (nextUser) => {
      setUser(nextUser);
      setProfile(null);

      if (!nextUser) {
        setLoading(false);
        return;
      }

      try {
        const [profileSnapshot, token] = await Promise.all([
          getDoc(doc(activeFirestore, 'users', nextUser.uid)),
          nextUser.getIdTokenResult(),
        ]);

        if (profileSnapshot.exists()) {
          setProfile(profileFromDocument(profileSnapshot.data()));
        }

        if (token.claims.role === 'admin' && !import.meta.env.DEV) {
          window.location.assign('https://admin.zcoerecell.in/dashboard');
        }
      } finally {
        setLoading(false);
      }
    });
  }, []);

  const value = useMemo<AuthContextValue>(() => ({
    user,
    profile,
    loading,
    configured: isFirebaseConfigured,
    async signInWithGoogle() {
      if (!firebaseAuth) {
        throw new Error('Firebase is not configured. Add the VITE_FIREBASE values before signing in.');
      }
      await signInWithPopup(firebaseAuth, new GoogleAuthProvider());
    },
    async signOut() {
      if (firebaseAuth) {
        await firebaseSignOut(firebaseAuth);
      }
    },
    async saveProfile(nextProfile) {
      const activeFirestore = firestore;
      if (!user || !activeFirestore) {
        throw new Error('Sign in before saving your profile.');
      }

      await setDoc(doc(activeFirestore, 'users', user.uid), {
        uid: user.uid,
        email: user.email ?? '',
        photoURL: user.photoURL ?? '',
        ...nextProfile,
        updatedAt: serverTimestamp(),
        createdAt: serverTimestamp(),
      }, { merge: true });
      setProfile(nextProfile);
    },
  }), [loading, profile, user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
