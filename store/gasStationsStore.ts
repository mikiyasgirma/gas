import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  setDoc,
} from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";
import create from "zustand";
import { db } from "../firebase";

interface gasStation {
  id: string;
  name: string;
  image: string;
  address: string;
  geoPoint: {
    latitude: number;
    longitude: number;
  };
  numberOfHoses: number;
  updatedat: {
    nanoseconds: number;
    seconds: number;
  };
  benzilCapacity: number;
  benzilAvailable: number;
  naftaCapacity: number;
  naftaAvailable: number;
  queue: string;
}

interface gasStationStore {
  gasStations: gasStation[];
  syncGasStations: () => void;
  addGasStation: (gasStation: gasStation) => void;
  removeGasStation: (id: string) => void;
  editGasStation: (gasStation: gasStation, id: string) => void;
}

const useGasStationsStore = create<gasStationStore>((set) => ({
  gasStations: [],
  syncGasStations: () => {
    try {
      const q = query(collection(db, "gasstations"));
      const unsub = onSnapshot(q, (querySnapshot) => {
        let gasStationsArr: any = [];
        querySnapshot.forEach((doc) => {
          gasStationsArr.push({ ...doc.data(), id: doc.id });
        });
        set({ gasStations: gasStationsArr });
      });
    } catch (error) {
      console.log(error);
    }
  },
  addGasStation: (gasStation: gasStation) => {
    set((state) => ({
      gasStations: [
        ...state.gasStations,
        {
          id: gasStation.id,
          name: gasStation.name,
          image: gasStation.image,
          address: gasStation.address,
          geoPoint: gasStation.geoPoint,
          numberOfHoses: gasStation.numberOfHoses,
          naftaAvailable: gasStation.naftaAvailable,
          naftaCapacity: gasStation.naftaCapacity,
          benzilCapacity: gasStation.benzilCapacity,
          benzilAvailable: gasStation.benzilAvailable,
          updatedat: gasStation.updatedat,
          queue: gasStation.queue,
        },
      ],
    }));
  },
  removeGasStation: async (id: string) => {
    try {
      const res = await deleteDoc(doc(db, "gasstations", id));
    } catch (error) {
      console.log(error);
    }
  },
  editGasStation: async (gasStation: gasStation, id: string) => {
    console.log("edit Gas Station store", gasStation);
    try {
      await setDoc(doc(db, "gasstations", id), {
        name: gasStation.name,
        image: gasStation.image,
        address: gasStation.address,
        geoPoint: gasStation.geoPoint,
        numberOfHoses: gasStation.numberOfHoses,
        naftaAvailable: gasStation.naftaAvailable,
        naftaCapacity: gasStation.naftaCapacity,
        benzilCapacity: gasStation.benzilCapacity,
        benzilAvailable: gasStation.benzilAvailable,
        updatedat: gasStation.updatedat,
        queue: gasStation.queue,
      });
    } catch (error) {
      console.log(error);
    }
  },
}));
export default useGasStationsStore;
