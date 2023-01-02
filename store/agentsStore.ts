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

export interface Agents {
  firstName: string;
  fatherName: string;
  username: string;
  assignedTo: string;
  id: string;
}

interface AgentsState {
  agents: Agents[];
  syncUsers: () => void;
  addUser: (user: User) => void;
  removeUser: (agent: User[], id: string) => void;
  updateUser: (agent: User[], id: string) => void;
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
  removeUser: (agent: User[], id: string) => {
    const agents = agent.filter((agent) => {
      return agent.id !== id;
    });
    set({ agents: agents });
  },
  updateUser: (agent: User[], id: string) => {
    const agents = agent.filter((agent) => {
      return agent.id !== id;
    });
    set({ agents: agents });
  },
}));
export default useAgentsStore;
