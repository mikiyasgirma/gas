import { getDocs, collection, doc } from "firebase/firestore";
import { db } from "../../firebase";

const createGasStationSlice = (set: any, get: any) => ({
  gasStations: [],
  fetchGasStations: async () => {
    const res = await getDocs(collection(db, "gasstations"));
    set({
      gasStations: res.docs.map((doc) => ({ ...doc.data(), id: doc.id })),
    });
    // res.forEach((doc) => {
    //   console.log(doc.id, " => ", doc.data());
    //   set({ gasStations: doc.data() });
    // });
  },
});
export default createGasStationSlice;
