import { collection, getDocs } from "firebase/firestore";
import type { NextPage } from "next";
import { useEffect } from "react";
import { Pie } from "react-chartjs-2";
import BarChart from "../components/BarChart";
import DashBoardCards from "../components/DashBoardCards";
import Layout from "../components/Layout";
import PieChart from "../components/PieChart";
import SideBar from "../components/SideBar";
import useAuthStore from "../store/authStore";
import { useRouter } from "next/router";

const Home: NextPage = () => {
  const currentUser = useAuthStore((state) => state.currentUser);
  const router = useRouter();

  useEffect(() => {
    currentUser ? router.push("/") : router.push("login");
  }, []);
  console.log("hello");

  return (
    <Layout>
      <div className="flex">
        <div className="basis-1/4 z-10">
          <SideBar />
        </div>
        <div className="basis-3/4">
          <DashBoardCards />
          <div className="grid grid-cols-2 gap-8 px-12">
            <div className="h-72">
              <PieChart />
              <p className="pt-6 text-sm font-poppins font-light">
                Latest Queus in Gas Stations
              </p>
            </div>
            <div className="h-72 text-lg font-poppins font-light">
              <BarChart />
              <p className="pt-6 text-sm font-poppins font-light">
                Latest Available Benzil and Nafta within five sample gas
                stations
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* <Footer /> */}
    </Layout>
  );
};

export default Home;
