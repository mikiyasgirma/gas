import React, { useState } from "react";
import { Button, Modal } from "antd";

type props = {
  open: boolean;
  handleOk: () => void;
  handleCancel: () => void;
};

const ConfirmModal: React.FC<props> = ({ open, handleOk, handleCancel }) => {
  return (
    <>
      <Modal
        open={open}
        title="Warning"
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button key="submit" onClick={handleOk}>
            Yes, delete it
          </Button>,
        ]}
      >
        Are you sure you want to delete the gas station information?
      </Modal>
    </>
  );
};

export default ConfirmModal;
