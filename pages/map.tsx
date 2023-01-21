import { NextPage } from "next";
import MapC from "../components/Map";
import dynamic from "next/dynamic";

const MyMap = dynamic(() => import("../components/Map"), { ssr: false });

const Map: NextPage = () => {
  return <MyMap />;
};
export default Map;
