import React, { useState } from "react";
// import "./index.css";
import { Button, Modal } from "antd";
import InputForm from "./InputForm";
import GasStationRegistrationForm from "./GasStationRegistrationForm";
import UserRegistrationForm from "./UserRegistrationForm";

type props = {
  loading: boolean;
  open: boolean;
  isUser: boolean;
  isGasStation: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const FormModal = ({
  loading,
  setLoading,
  open,
  setOpen,
  isUser,
  isGasStation,
}: props): JSX.Element => {
  const handleOk = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOpen(false);
    }, 3000);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <Modal
      open={open}
      title={`${isUser ? "Agent Registration" : "Gas Station Registration"}`}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={
        [
          // <Button key="back" onClick={handleCancel}>
          //   cancel
          // </Button>,
          // <Button
          //   style={{ color: "#111111" }}
          //   key="submit"
          //   type="primary"
          //   loading={loading}
          //   onClick={handleOk}
          // >
          //   Submit
          // </Button>,
        ]
      }
    >
      {isGasStation && <GasStationRegistrationForm />}
      {isUser && <UserRegistrationForm />}
    </Modal>
  );
};

export default FormModal;
