import type { NextPage } from "next";
import { useEffect, useState } from "react";
import InputForm from "../components/InputForm";
import Layout from "../components/Layout";
import SideBar from "../components/SideBar";
import { collection, getDocs, onSnapshot, query } from "firebase/firestore";
import { db } from "../firebase";
import { Table } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import FormModal from "../components/FormModal";
import useModalStore from "../store/modalStore";
import useAgentsStore from "../store/agentsStore";
import useGasStationsStore from "../store/gasStationsStore";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { useRouter } from "next/router";
import useAuthStore from "../store/authStore";

const toggleModal = () => {};

const columns = [
  {
    key: "firstName",
    title: "First Name",
    dataIndex: "firstName",
  },
  {
    key: "lastName",
    title: "Last Name",
    dataIndex: "lastName",
  },
  {
    key: "email",
    title: "Email",
    dataIndex: "email",
  },
  {
    key: "role",
    title: "Role",
    dataIndex: "role",
  },
  {
    key: "assignedTo",
    title: "Assigned To",
    dataIndex: "assignedTo",
  },
  {
    key: "action",
    title: "Actions",
    render: (record: any) => {
      return (
        <>
          <div className="flex space-x-3">
            <EditOutlined
              style={{ color: "black" }}
              onClick={() => toggleModal()}
            />
            <DeleteOutlined
              style={{ color: "red" }}
              onClick={() => toggleModal()}
            />
          </div>
        </>
      );
    },
  },
];

const Agents: NextPage = () => {
  // const [loading, setLoading] = useState(false);
  const isModalOpen = useModalStore((state) => state.isModalOpen);
  const openModal = useModalStore((state) => state.openModal);
  const agents = useAgentsStore((state) => state.agents);
  const getData = useAgentsStore((state) => state.syncUsers);
  const currentUser = useAuthStore((state) => state.currentUser);
  const syncGasStations = useGasStationsStore((state) => state.syncGasStations);

  const router = useRouter();
  useEffect(() => {
    currentUser ? router.push("/agents") : router.push("login");
  }, []);

  useEffect(() => {
    getData();
    syncGasStations();
  }, []);

  const showModal = () => {
    openModal();
  };

  return (
    <Layout>
      <div className="flex">
        <div className="basis-1/4 z-10">
          <SideBar />
        </div>
        <div className="basis-3/4">
          <div className="flex flex-col h-full space-y-8 items-center justify-center">
            <button
              onClick={() => showModal()}
              className="bg-primary p-2 text-white rounded-lg"
            >
              Add Agent
            </button>
            <Table columns={columns} dataSource={agents} />
          </div>
        </div>
      </div>
      {isModalOpen && (
        <FormModal
          // loading={loading}
          // setLoading={setLoading}
          open={isModalOpen}
          setOpen={showModal}
          isUser={true}
          isGasStation={false}
        />
      )}
    </Layout>
  );
};
export default Agents;
