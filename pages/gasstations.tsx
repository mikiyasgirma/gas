import type { NextPage } from "next";
import { useEffect, useState } from "react";
import InputForm from "../components/InputForm";
import Layout from "../components/Layout";
import SideBar from "../components/SideBar";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { data } from "../data";
import FormModal from "../components/FormModal";
import { Modal, Table } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

const columns = [
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
    key: "phone",
    title: "Capacity",
    dataIndex: "capacity",
  },
  {
    key: "Available",
    title: "Available",
    dataIndex: "available",
  },
  {
    key: "contact",
    title: "Contact",
    dataIndex: "contact",
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

const RegisterGasStations: NextPage = () => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const showModal = () => {
    setOpen(true);
  };

  // const [gasStations, setGasStations] = useState<GasStation[]>([]);
  // const [error, setError] = useState<String | null>(null);
  // const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   const fetchGasStations = async () => {
  //     try {
  //       const qs = await getDocs(collection(db, "gasstations"));
  //       qs.forEach((doc) => {
  //         // console.log(doc.data());
  //         const document = doc.data();
  //         setGasStations((prevGasStations) => [
  //           ...prevGasStations,
  //           {
  //             key: "o23urskdf",
  //             name: "miko",
  //             capacity: 3000,
  //             available: 1000,
  //           },
  //         ]);
  //       });
  //     } catch (err) {
  //       setError("failed to load todos");
  //       console.log(err);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   fetchGasStations();
  // }, []);

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
              Add Gas Station
            </button>
            <Table columns={columns} dataSource={data} />
          </div>
        </div>
      </div>
      {open && (
        <FormModal
          loading={loading}
          setLoading={setLoading}
          open={open}
          setOpen={setOpen}
          isUser={false}
          isGasStation={true}
        />
      )}
    </Layout>
  );
};
export default RegisterGasStations;
