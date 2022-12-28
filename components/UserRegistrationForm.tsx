import { Button, Form, Input } from "antd";
import { useForm } from "antd/es/form/Form";
import React from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase";
import useModalStore from "../store/modalStore";
import useUserStore from "../store/userStore";

const UserRegistrationForm = () => {
  const closeModal = useModalStore((state) => state.closeModal);
  const addUser = useUserStore((state) => state.addUser);
  const [form] = Form.useForm();

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
        <Input placeholder="Place agent first name" />
      </Form.Item>
      <Form.Item name="fatherName" label="Last name">
        <Input placeholder="Place agent last name" />
      </Form.Item>
      <Form.Item name="username" label="username">
        <Input placeholder="Place agent last name" />
      </Form.Item>
      <Form.Item name="assignedTo" label="assignedTo">
        <Input placeholder="This agent is assigned to" />
      </Form.Item>
      <Button htmlType="button" onClick={onReset}>
        Reset
      </Button>
      <Button type="primary" htmlType="submit">
        Submit
      </Button>
    </Form>
  );
};

export default UserRegistrationForm;
