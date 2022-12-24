import { Button, Form, Input } from "antd";
import { useForm } from "antd/es/form/Form";
import React from "react";
import useModalStore from "../store/modalStore";

const UserRegistrationForm = () => {
  const closeModal = useModalStore((state) => state.closeModal);
  const [form] = Form.useForm();

  const onReset = () => {
    form.resetFields();
  };

  const onFinish = (values: any) => {
    console.log(values);
    closeModal();
  };

  return (
    <Form form={form} name="control-hooks" onFinish={onFinish}>
      <Form.Item name="firstName" label="First name">
        <Input placeholder="Place agent first name" />
      </Form.Item>
      <Form.Item name="lastName" label="Last name">
        <Input placeholder="Place agent last name" />
      </Form.Item>
      <Form.Item name="username" label="username">
        <Input placeholder="Place agent last name" />
      </Form.Item>
      <Form.Item name="placeholder" label="password">
        <Input placeholder="Place password for agent" />
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
