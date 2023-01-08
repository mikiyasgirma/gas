import { Button, Form, Input, Select } from "antd";
import { useForm } from "antd/es/form/Form";
import React from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase";
import useModalStore from "../store/modalStore";
import useUserStore from "../store/agentsStore";
import useGasStationsStore from "../store/gasStationsStore";

const UserRegistrationForm = () => {
  const closeModal = useModalStore((state) => state.closeModal);
  const addUser = useUserStore((state) => state.addUser);
  const [form] = Form.useForm();
  const gasStations = useGasStationsStore((state) => state.gasStations);
  console.log("gas stations from", gasStations);

  const onReset = () => {
    form.resetFields();
  };

  const onFinish = async (values: any) => {
    try {
      const docRef = await addDoc(collection(db, "agents"), values);
      console.log("Document written with ID: ", docRef.id);
      addUser(values);
    } catch (error) {
      console.log(console.error());
    }
    closeModal();
  };

  return (
    <Form form={form} name="control-hooks" onFinish={onFinish}>
      <Form.Item name="firstName" label="First name">
        <Input placeholder="Place user first name" />
      </Form.Item>
      <Form.Item name="fatherName" label="Last name">
        <Input placeholder="Place user last name" />
      </Form.Item>
      <Form.Item name="email" label="Email">
        <Input placeholder="Place user email address" />
      </Form.Item>
      <Form.Item label="Role">
        <Select showSearch placeholder="Select role for the user">
          <Select.Option value="admin">Admin</Select.Option>
          <Select.Option value="agent">Agent</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item label="Assigned To Gas Station">
        <Select
          showSearch
          placeholder="Assign gas station if only the role is agent"
        >
          {gasStations.map((data) => (
            <Select.Option value="demo">{data.name}</Select.Option>
          ))}
        </Select>
      </Form.Item>
      <div className="flex space-x-2">
        <Button htmlType="button" onClick={onReset}>
          cancel
        </Button>
        <Button
          type="primary"
          htmlType="submit"
          className="border-gray-200 border-2 text-gray-900"
        >
          Submit
        </Button>
      </div>
    </Form>
  );
};

export default UserRegistrationForm;
