import { Auth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import create from "zustand/react";
import { auth } from "../firebase";

interface AuthInterface {}

const useAuthStore = create<AuthInterface>((set) => ({
  currentUser: undefined,
  login: (email: string, password: string) => {
    signInWithEmailAndPassword(auth, email, password);
  },
  logout: () => auth.signOut(),
}));

export default useAuthStore;
