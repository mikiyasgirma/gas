import type { NextPage } from "next";
import { useEffect, useState } from "react";
import InputForm from "../components/InputForm";
import Layout from "../components/Layout";
import SideBar from "../components/SideBar";
import { collection, getDocs, onSnapshot, query } from "firebase/firestore";
import { db } from "../firebase";
import { Modal, Table } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import FormModal from "../components/FormModal";
import useModalStore from "../store/modalStore";
import useAgentsStore from "../store/agentsStore";
import useGasStationsStore from "../store/gasStationsStore";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { useRouter } from "next/router";
import useAuthStore from "../store/authStore";
import ConfirmModal from "../components/ConfirmModal";
import useEditModalStore from "../store/editModalStore";

const Agents: NextPage = () => {
  const isModalOpen = useModalStore((state) => state.isModalOpen);
  const isEditModalOpen = useEditModalStore((state) => state.isEditModalOpen);
  const openEditModal = useEditModalStore((state) => state.openEditModal);
  const openModal = useModalStore((state) => state.openModal);
  const agents = useAgentsStore((state) => state.agents);
  const getData = useAgentsStore((state) => state.syncUsers);
  const currentUser = useAuthStore((state) => state.currentUser);
  const syncGasStations = useGasStationsStore((state) => state.syncGasStations);
  const [deleteRecordId, setDeleteRecordId] = useState("");
  const [selectedEditRecordId, setSelectedEditRecordId] = useState("");
  const [isConfirmModalOpen, setConfirmModalOpen] = useState(false);
  const deleteUser = useAgentsStore((state) => state.removeUser);
  console.log("edit Modal", isEditModalOpen);

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
      key: "contact",
      title: "Contact",
      dataIndex: "contact",
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
                onClick={() => toggleEdit(record.id)}
              />
              <DeleteOutlined
                style={{ color: "red" }}
                onClick={() => toggleDeleteModal(record.id)}
              />
            </div>
          </>
        );
      },
    },
  ];

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
  const handleOk = () => {
    deleteUser(deleteRecordId);
    setConfirmModalOpen(false);
  };
  const toggleDeleteModal = (id: string) => {
    setConfirmModalOpen(!isConfirmModalOpen);
    setDeleteRecordId(id);
  };
  const handleCancel = () => {
    setConfirmModalOpen(!isConfirmModalOpen);
  };

  const toggleEdit = (id: string) => {
    openEditModal();
    setSelectedEditRecordId(id);
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
          userId=""
          isGasStation={false}
          isUserEdit={false}
          isGasStationEdit={false}
          gasStationId=""
        />
      )}
      {isEditModalOpen && (
        <FormModal
          // loading={loading}
          // setLoading={setLoading}
          open={isEditModalOpen}
          setOpen={openEditModal}
          isUser={false}
          isGasStation={false}
          isUserEdit={true}
          userId={selectedEditRecordId}
          isGasStationEdit={false}
          gasStationId=""
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
export default Agents;
