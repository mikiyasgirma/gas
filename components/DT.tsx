import React, { useState } from "react";
import { Modal, Space, Table, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

let toggleModal = () => {
  Modal.confirm({
    title: "are you sure?",
    onOk: () => console.log("oked"),
    onCancel: () => console.log("canceld"),
  });
};

type dataPro = {
  id: number;
  name: string;
  email: string;
  address: string;
  phone: number;
  website: string;
};

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

const DataTable = ({ gasStationsData }: any): JSX.Element => {
  return (
    <>
      <Table columns={columns} dataSource={gasStationsData} />
    </>
  );
};

export default DataTable;
