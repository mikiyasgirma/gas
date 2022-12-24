import create from "zustand";
import createGasStationSlice from "./slices/createGasStationSlice";

const useGasStations = create((set, get) => ({
  ...createGasStationSlice(set, get),
}));
export default useGasStations;
