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
import ConfirmModal from "../components/ConfirmModal";
import useEditModalStore from "../store/editModalStore";
import useAgentsStore from "../store/agentsStore";

const RegisterGasStations: NextPage = () => {
  const [isConfirmModalOpen, setConfirmModalOpen] = useState(false);
  const isModalOpen = useModalStore((state) => state.isModalOpen);
  const openModal = useModalStore((state) => state.openModal);
  const gasStations = useGasStationsStore((state) => state.gasStations);
  const syncGasStations = useGasStationsStore((state) => state.syncGasStations);
  const currentUser = useAuthStore((state) => state.currentUser);
  const [deleteRecordId, setDeleteRecordId] = useState("");
  const isEditModalOpen = useEditModalStore((state) => state.isEditModalOpen);
  const openEditModal = useEditModalStore((state) => state.openEditModal);
  const [selectedEditRecordId, setSelectedEditRecordId] = useState("");
  const agents = useAgentsStore((state) => state.agents);

  const role = agents.find((agent) => agent.email === currentUser?.user.email);

  const filteredStationsBasedOnAgentRole = [
    gasStations.find((gasStation) => gasStation.name === role?.assignedTo),
  ];
  console.log(
    "filteredStationsBasedOnAgentRole",
    filteredStationsBasedOnAgentRole
  );

  const deleteGasStation = useGasStationsStore(
    (state) => state.removeGasStation
  );
  const router = useRouter();
  console.log("edit Modal", isEditModalOpen);

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
                onClick={() => toggleEdit(record.id)}
              />
              {role?.role === "admin" && (
                <DeleteOutlined
                  style={{ color: "red" }}
                  onClick={() => toggleDeleteModal(record.id)}
                />
              )}
            </div>
          </>
        );
      },
    },
  ];

  const toggleEdit = (id: string) => {
    openEditModal();
    setSelectedEditRecordId(id);
  };

  useEffect(() => {
    syncGasStations();
  }, []);

  const showModal = () => {
    openModal();
  };

  useEffect(() => {
    currentUser ? router.push("/gasstations") : router.push("login");
  }, []);

  const handleOk = () => {
    deleteGasStation(deleteRecordId);
    setConfirmModalOpen(false);
  };
  const toggleDeleteModal = (id: string) => {
    setConfirmModalOpen(!isConfirmModalOpen);
    setDeleteRecordId(id);
  };
  const handleCancel = () => {
    setConfirmModalOpen(!isConfirmModalOpen);
  };

  return (
    <Layout>
      <div className="flex">
        <div className="basis-1/4 z-10">
          <SideBar />
        </div>
        <div className="basis-3/4 px-16">
          <div className="flex flex-col h-full space-y-8 items-center pt-4 justify-center">
            {role?.role === "admin" && (
              <button
                onClick={() => showModal()}
                className="bg-primary p-2 text-white rounded-lg"
              >
                Add Gas Station
              </button>
            )}

            <Table
              columns={columns}
              // @ts-ignore
              dataSource={filteredStationsBasedOnAgentRole}
            />
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
          isUserEdit={false}
          userId=""
          isGasStationEdit={false}
          gasStationId=""
        />
      )}
      {isEditModalOpen && (
        <FormModal
          // loading={loading}
          // setLoading={}
          open={isEditModalOpen}
          setOpen={openEditModal}
          isUser={false}
          isGasStation={false}
          isUserEdit={false}
          userId=""
          gasStationId={selectedEditRecordId}
          isGasStationEdit={true}
        />
      )}
      {isConfirmModalOpen && (
        <ConfirmModal
          open={isConfirmModalOpen}
          handleCancel={handleCancel}
          handleOk={handleOk}
        />
      )}
    </Layout>
  );
};
export default RegisterGasStations;
