import { Button, Form, Input, Select } from "antd";
import { useForm } from "antd/es/form/Form";
import React from "react";
import { collection, addDoc } from "firebase/firestore";
import { auth, db } from "../firebase";
import useModalStore from "../store/modalStore";
import useUserStore from "../store/agentsStore";
import useGasStationsStore from "../store/gasStationsStore";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import useEditModalStore from "../store/editModalStore";
import useAgentsStore from "../store/agentsStore";

type props = {
  userId: string;
};

const UserRegistrationForm = ({ userId }: props) => {
  const closeModal = useEditModalStore((state) => state.closeEditModal);
  const [form] = Form.useForm();
  const gasStations = useGasStationsStore((state) => state.gasStations);
  const users = useAgentsStore((state) => state.agents);
  const updateUser = useAgentsStore((state) => state.updateUser);
  console.log("gas stations from", gasStations);

  const editUser = users.find((user) => user.id == userId);
  console.log(editUser);

  const onFinish = async (values: any) => {
    console.log(values);
    updateUser(values, userId);
    closeModal();
  };

  return (
    <Form
      form={form}
      name="control-hooks"
      onFinish={onFinish}
      initialValues={{
        firstName: editUser?.firstName,
        lastName: editUser?.lastName,
        email: editUser?.email,
        role: editUser?.role,
        assignedTo: editUser?.assignedTo,
      }}
    >
      <Form.Item name="firstName" label="First name" required>
        <Input />
      </Form.Item>
      <Form.Item name="lastName" label="Last name" required>
        <Input />
      </Form.Item>
      <Form.Item name="email" label="Email" required>
        <Input
          placeholder="you can not edit users registered email"
          disabled={true}
        />
      </Form.Item>
      <Form.Item name="password" label="Password" required>
        <Input
          placeholder="You can not edit users registered password"
          disabled={true}
        />
      </Form.Item>
      <Form.Item name="role" label="Role" required>
        <Select showSearch placeholder="Select role for the user">
          <Select.Option key="admin" value="admin">
            Admin
          </Select.Option>
          <Select.Option key="agent" value="agent">
            Agent
          </Select.Option>
        </Select>
      </Form.Item>
      <Form.Item name="assignedTo" label="Assigned To Gas Station" required>
        <Select
          showSearch
          placeholder="Assign gas station if only the role is agent"
        >
          {gasStations.map((data) => (
            <Select.Option key={data.id} value={data.name}>
              {data.name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
      <div className="flex space-x-2">
        <Button htmlType="button" onClick={() => closeModal()}>
          cancel
        </Button>
        <Button
          type="primary"
          htmlType="submit"
          className="border-gray-200 border-2 text-gray-900"
        >
          Edit
        </Button>
      </div>
    </Form>
  );
};

export default UserRegistrationForm;
