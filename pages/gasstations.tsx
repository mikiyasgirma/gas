import type { NextPage } from "next";
import { useEffect, useState } from "react";
import InputForm from "../components/InputForm";
import Layout from "../components/Layout";
import SideBar from "../components/SideBar";
import { collection, getDocs, onSnapshot, query } from "firebase/firestore";
import { db } from "../firebase";
import { data } from "../data";
import FormModal from "../components/FormModal";
import { Modal, Table } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import useModalStore from "../store/modalStore";
import { useCollectionData } from "react-firebase-hooks/firestore";
import useGasStationsStore from "../store/gasStationsStore";
import useAuthStore from "../store/authStore";
import { useRouter } from "next/router";

const columns = [
  {
    title: "Image",
    dataIndex: "image",
    render: (image: string) => (
      <img
        alt={image}
        src={image}
        className="w-20 h-20 object-cover rounded-md"
      />
    ),
  },
  {
    key: "name",
    title: "Name",
    dataIndex: "name",
  },
  {
    key: "address",
    title: "Address",
    dataIndex: "address",
  },
  {
    key: "numberOfHoses",
    title: "Number of Hoses",
    dataIndex: "numberOfHoses",
  },
  {
    key: "benzilCapacity",
    title: "Benzil Capacity in Liter",
    dataIndex: "benzilCapacity",
  },
  {
    key: "benzilAvailable",
    title: "Benzil Available in Liter",
    dataIndex: "benzilAvailable",
  },
  {
    key: "naftaCapacity",
    title: "Nafta Capacity in Liter",
    dataIndex: "naftaCapacity",
  },
  {
    key: "naftaAvailable",
    title: "Nafta Available in Liter",
    dataIndex: "naftaAvailable",
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

let toggleModal = () => {
  Modal.confirm({
    title: "are you sure?",
    onOk: () => console.log("oked"),
    onCancel: () => console.log("canceld"),
  });
};

interface gasStation {
  id: string;
  name: string;
  image: string;
  address: string;
  location: {
    lat: number;
    log: number;
  };
  numberOfHoses: number;
  queue: string;
  updatedat: {
    nanoseconds: number;
    seconds: number;
  };
}

const RegisterGasStations: NextPage = () => {
  // const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const isModalOpen = useModalStore((state) => state.isModalOpen);
  const openModal = useModalStore((state) => state.openModal);
  // const [gasStations, setGasStations] = useState([]);
  // console.log("gasStations", gasStations);
  const gasStations = useGasStationsStore((state) => state.gasStations);
  const syncGasStations = useGasStationsStore((state) => state.syncGasStations);
  const currentUser = useAuthStore((state) => state.currentUser);
  const router = useRouter();
  // console.log("gas Stations from the store", gasStations);

  const queryGasStationsData = collection(db, "gasstations");
  const [docs, loading, error] = useCollectionData<any>(queryGasStationsData);

  useEffect(() => {
    if (docs) {
      syncGasStations(docs);
    }
  }, []);

  const showModal = () => {
    openModal();
  };

  useEffect(() => {
    currentUser ? router.push("/gasstations") : router.push("login");
  }, []);

  return (
    <Layout>
      <div className="flex">
        <div className="basis-1/4 z-10">
          <SideBar />
        </div>
        <div className="basis-3/4 px-16">
          <div className="flex flex-col h-full space-y-8 items-center justify-center">
            <button
              onClick={() => showModal()}
              className="bg-primary p-2 text-white rounded-lg"
            >
              Add Gas Station
            </button>
            <Table columns={columns} dataSource={docs} />
          </div>
        </div>
      </div>
      {isModalOpen && (
        <FormModal
          // loading={loading}
          // setLoading={}
          open={isModalOpen}
          setOpen={showModal}
          isUser={false}
          isGasStation={true}
        />
      )}
    </Layout>
  );
};
export default RegisterGasStations;
