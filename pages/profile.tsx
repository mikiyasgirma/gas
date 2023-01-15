import type { NextPage } from "next";
import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import SideBar from "../components/SideBar";
import { useRouter } from "next/router";
import useAuthStore from "../store/authStore";
import useAgentsStore from "../store/agentsStore";
import { getAuth, updatePassword } from "firebase/auth";
import { Button, Form, Input } from "antd";

const Profile: NextPage = () => {
  const [toggleNewPasswordInput, setToggleNewPasswordInput] = useState(false);
  const currentUser = useAuthStore((state) => state.currentUser);
  const agents = useAgentsStore((state) => state.agents);
  const [form] = Form.useForm();
  const auth = getAuth();
  const router = useRouter();
  const role = agents.find((agent) => agent.email === currentUser?.user.email);
  const user = auth.currentUser;

  useEffect(() => {
    currentUser ? router.push("/profile") : router.push("login");
  }, []);

  const onFinish = (values: any) => {
    // @ts-ignore
    updatePassword(user, values.newPassword)
      .then(() => {
        // Update successful.
        console.log("password updated successfully");
        setToggleNewPasswordInput(false);
      })
      .catch((error) => {
        // An error ocurred
        // ...
        console.log(error);
      });
  };

  return (
    <Layout>
      <div className="flex">
        <div className="basis-1/4 z-10">
          <SideBar />
        </div>
        <div className="basis-3/4 flex flex-col justify-center px-96">
          <div className="bg-white shadow-lg px-4 w-full rounded-lg py-12 space-y-6">
            <div className="flex justify-between">
              <div>First Name</div>
              <div>{role?.firstName}</div>
            </div>
            <div className="flex justify-between">
              <div>Last Name</div>
              <div>{role?.lastName}</div>
            </div>
            <div className="flex justify-between">
              <div>Email</div>
              <div>{role?.email}</div>
            </div>
            <div className="flex justify-between">
              <div>Assigned To</div>
              <div>{`${
                role?.assignedTo ? role?.assignedTo : "Not Assigned"
              }`}</div>
            </div>
            <div className="flex justify-between">
              <div>Password</div>
              <div>********</div>
            </div>
            <button
              onClick={() => setToggleNewPasswordInput(!toggleNewPasswordInput)}
              className="bg-primary text-white rounded-md px-2 py-1"
            >
              Change Password
            </button>
            {toggleNewPasswordInput && (
              <Form form={form} onFinish={onFinish}>
                <Form.Item
                  name="newPassword"
                  label="Enter new password"
                  required
                >
                  <Input type="password" />
                </Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="border-gray-200 border-2 text-gray-900"
                >
                  Edit
                </Button>
              </Form>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};
export default Profile;
