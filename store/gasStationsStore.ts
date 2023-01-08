import { collection, onSnapshot, query } from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";
import create from "zustand";
import { db } from "../firebase";

interface gasStation {
  id: string;
  name: string;
  image: string;
  address: string;
  location: {
    lat: number;
    log: number;
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
}

interface gasStationStore {
  gasStations: gasStation[];
  syncGasStations: () => void;
  addGasStation: (gasStation: gasStation) => void;
  removeGasStation: (gasStation: gasStation[], id: string) => void;
  editGasStation: (gasStation: gasStation[], id: string) => void;
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
          location: gasStation.location,
          numberOfHoses: gasStation.numberOfHoses,
          naftaAvailable: gasStation.naftaAvailable,
          naftaCapacity: gasStation.naftaCapacity,
          benzilCapacity: gasStation.benzilCapacity,
          benzilAvailable: gasStation.benzilAvailable,
          updatedat: gasStation.updatedat,
        },
      ],
    }));
  },
  removeGasStation: (gasStation: gasStation[], id: string) => {
    const gasStations = gasStation.filter((station) => {
      return station.id !== id;
    });
    set((state) => ({
      gasStations: gasStations,
    }));
  },
  editGasStation: (gasStation: gasStation[], id: string) => {
    const gasStations = gasStation.filter((station) => {
      return station.id !== id;
    });
    set((state) => ({
      gasStations: gasStations,
    }));
  },
}));
export default useGasStationsStore;
