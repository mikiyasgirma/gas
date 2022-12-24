import { Button, Form, Input } from "antd";
import { useForm } from "antd/es/form/Form";
import React from "react";

const UserRegistrationForm = () => {
  const [form] = useForm();

  const onCancel = () => {
    form.resetFields();
  };

  return (
    <Form>
      <Form.Item label="First name">
        <Input placeholder="Place agent first name" />
      </Form.Item>
      <Form.Item label="Last name">
        <Input placeholder="Place agent last name" />
      </Form.Item>
      <Form.Item label="username">
        <Input placeholder="Place agent last name" />
      </Form.Item>
      <Form.Item label="password">
        <Input placeholder="Place password for agent" />
      </Form.Item>
      <Button htmlType="button" onClick={onCancel}>
        Reset
      </Button>
      <Button type="primary" htmlType="submit">
        Submit
      </Button>
    </Form>
  );
};

export default UserRegistrationForm;
