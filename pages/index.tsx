import { collection, getDocs } from "firebase/firestore";
import type { NextPage } from "next";
import { useEffect } from "react";
import DashBoardCards from "../components/DashBoardCards";
import Layout from "../components/Layout";
import SideBar from "../components/SideBar";
import { db } from "../firebase";

const Home: NextPage = () => {
  return (
    <Layout>
      <div className="flex">
        <div className="basis-1/4 z-10">
          <SideBar />
        </div>
        <div className="basis-3/4">
          <DashBoardCards />
        </div>
      </div>
    </Layout>
  );
};

export default Home;
