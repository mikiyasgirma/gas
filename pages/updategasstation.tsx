import type { NextPage } from "next";
import InputForm from "../components/InputForm";
import Layout from "../components/Layout";
import SideBar from "../components/SideBar";

const Home: NextPage = () => {
  return (
    <Layout>
      <div className="flex">
        <div className="basis-1/4 z-10">
          <SideBar />
        </div>
        <div className="basis-3/4">
          <div className="flex flex-col h-full items-center justify-center">
            <div className="bg-[#f5f5f5] px-24 flex flex-col items-center justify-center shadow-2xl text-gray-600 rounded-xl w-[600px] h-96">
              <InputForm />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
