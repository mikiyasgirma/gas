import type { NextPage } from "next";
import { useEffect, useState } from "react";
import InputForm from "../components/InputForm";
import Layout from "../components/Layout";
import RegisteringForm from "../components/RegisteringForm";
import SideBar from "../components/SideBar";
import DataTable from "../components/DT";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

const RegisterGasStations: NextPage = () => {
  const [gasStations, setGasStations] = useState(null);
  const [error, setError] = useState<String | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGasStations = async () => {
      try {
        const qs = await getDocs(collection(db, "gasstations"));
        qs.forEach((doc) => {
          console.log(doc.data());
        });
      } catch (err) {
        setError("failed to load todos");
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    fetchGasStations();
  }, []);

  return (
    <Layout>
      <div className="flex">
        <div className="basis-1/4 z-10">
          <SideBar />
        </div>
        <div className="basis-3/4">
          <div className="flex flex-col h-full items-center justify-center">
            {/* <DataTable /> */}
          </div>
        </div>
      </div>
    </Layout>
  );
};
export default RegisterGasStations;
