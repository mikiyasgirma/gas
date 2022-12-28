import create from "zustand";
import {
  collection,
  getDocs,
  onSnapshot,
  query,
  QuerySnapshot,
} from "firebase/firestore";
import { async } from "@firebase/util";
import { db } from "../firebase";
import { useEffect } from "react";

export interface User {
  id: string;
  firstName: string;
  fatherName: string;
  username: string;
  assignedTo: string;
}

export interface Test {
  id: string;
}

interface UserState {
  agents: Test[];
  syncUsers: () => void;
  addUser: (user: User) => void;
  removeUser: (id: string) => void;
  updateUser: (id: string, user: User) => void;
}

const useUserStore = create<UserState>((set) => ({
  agents: [],
  addUser: (agent: User) => {
    set((state) => ({
      agents: [
        ...state.agents,
        {
          id: agent.id,
          firstName: agent.firstName,
          fatherName: agent.fatherName,
          username: agent.username,
          assignedTo: agent.assignedTo,
        } as User,
      ],
    }));
  },
  syncUsers: async () => {
    try {
      const q = query(collection(db, "agents"));
      const unsub = onSnapshot(q, (querySnapshot) => {
        let agentsArr: any = [];
        querySnapshot.forEach((doc) => {
          agentsArr.push({ ...doc.data(), id: doc.id });
        });
        set({ agents: agentsArr });
      });
    } catch (error) {
      console.log(error);
    }
  },
  removeUser: (id) => {},
  updateUser: (id) => {},
}));
export default useUserStore;
