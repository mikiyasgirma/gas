import { collection, getDocs } from "firebase/firestore";
import type { NextPage } from "next";
import { useEffect } from "react";
import Layout from "../components/Layout";
import SideBar from "../components/SideBar";
import { db } from "../firebase";

const Home: NextPage = () => {
  // useEffect(() => {
  //   const fetchUsers = async () => {
  //     try {
  //       const tempData = [];
  //       const querySnapshot = await getDocs(collection(db, "agents"));
  //       querySnapshot.forEach((doc) => {
  //         tempData.push({ id: doc.id, ...doc.data() });
  //       });
  //       console.log(tempData);
  //       return tempData;
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };
  //   fetchUsers();
  // }, []);

  return (
    <Layout>
      <div className="flex">
        <div className="basis-1/4 z-10">
          <SideBar />
        </div>
        <div className="basis-3/4">Hello</div>
      </div>
    </Layout>
  );
};

export default Home;
