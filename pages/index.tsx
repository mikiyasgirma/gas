import type { NextPage } from "next";
import Layout from "../components/Layout";
import SideBar from "../components/SideBar";

const Home: NextPage = () => {
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
