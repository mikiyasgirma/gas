import create from "zustand";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  query,
  QuerySnapshot,
  setDoc,
} from "firebase/firestore";
import { db } from "../firebase";

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  assignedTo: string;
  email: string;
  role: string;
  contact: number;
}

export interface Test {
  id: string;
}

export interface Agents {
  firstName: string;
  lastName: string;
  assignedTo: string;
  id: string;
  email: string;
  role: string;
  contact: number;
}

interface AgentsState {
  agents: Agents[];
  syncUsers: () => void;
  addUser: (user: User) => void;
  removeUser: (id: string) => void;
  updateUser: (agent: User, id: string) => void;
}

const useAgentsStore = create<AgentsState>((set) => ({
  agents: [],
  addUser: (agent: User) => {
    set((state) => ({
      agents: [
        ...state.agents,
        {
          id: agent.id,
          firstName: agent.firstName,
          lastName: agent.lastName,
          email: agent.email,
          role: agent.role,
          assignedTo: agent.assignedTo,
          contact: agent.contact,
        } as User,
      ],
    }));
  },
  syncUsers: async () => {
    try {
      const q = query(collection(db, "users"));
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
  removeUser: async (id: string) => {
    try {
      const res = await deleteDoc(doc(db, "users", id));
    } catch (error) {
      console.log(error);
    }
  },
  updateUser: async (agent: User, id: string) => {
    try {
      await setDoc(doc(db, "users", id), {
        firstName: agent.firstName,
        lastName: agent.lastName,
        role: agent.role,
        email: agent.email,
        contact: agent.contact,
        assignedTo: agent.assignedTo,
      });
    } catch (error) {
      console.log(error);
    }
  },
}));
export default useAgentsStore;
