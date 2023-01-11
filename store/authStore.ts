import { Auth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import create from "zustand";
import { auth } from "../firebase";

interface AuthInterface {
  currentUser: any;
  login: (email: string, password: string) => void;
  logout: () => void;
  loading: boolean;
  error: string;
}

const useAuthStore = create<AuthInterface>((set) => ({
  currentUser: undefined,
  loading: false,
  error: "",
  login: (email: string, password: string) => {
    set({ loading: true });
    signInWithEmailAndPassword(auth, email, password)
      .then((user) => {
        set((state) => ({
          ...state,
          currentUser: user,
          loading: false,
        }));
      })
      .catch((error) => {
        set({ error: error });
      });
  },

  logout: () =>
    signOut(auth)
      .then(() => {
        set({ currentUser: undefined });
      })
      .catch((error) => {
        console.log(error);
      }),
}));

export default useAuthStore;
