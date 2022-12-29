import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Form, Input, message, Select, Upload } from "antd";
import type { RcFile, UploadFile, UploadProps } from "antd/es/upload/interface";
import type { UploadChangeParam } from "antd/es/upload";
import { useState } from "react";
import useModalStore from "../store/modalStore";
import Location from "./Location";
import { useGeolocated } from "../src";

type props = {};

const initialState = {
  name: "",
  image: "",
  NumberOfHoses: "",
  BenzilCapacity: "",
  NaftaCapacity: "",
  agent: "",
  location: "",
};

const getBase64 = (img: RcFile, callback: (url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result as string));
  reader.readAsDataURL(img);
};

const beforeUpload = (file: RcFile) => {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG file!");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("Image must smaller than 2MB!");
  }
  return isJpgOrPng && isLt2M;
};

const GasStationRegistrationForm = (): JSX.Element => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>();
  const closeModal = useModalStore((state) => state.closeModal);

  const { coords, isGeolocationAvailable, isGeolocationEnabled, getPosition } =
    useGeolocated({
      positionOptions: {
        enableHighAccuracy: false,
      },
      suppressLocationOnMount: true,
      userDecisionTimeout: 5000,
    });
  console.log("coord", coords);

  const handleChange: UploadProps["onChange"] = (
    info: UploadChangeParam<UploadFile>
  ) => {
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
    if (info.file.status === "done") {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj as RcFile, (url) => {
        setLoading(false);
        setImageUrl(url);
      });
    }
  };

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  const onReset = () => {
    form.resetFields();
  };

  const onFinish = (values: any) => {
    console.log(values);
    closeModal();
  };

  return (
    <div className="grid grid-cols-2 gap-24">
      <Form layout="horizontal" form={form} onFinish={onFinish}>
        <p className="font-semibold text-lg py-4">Gas Station Informaiton</p>
        <Upload
          name="avatar"
          listType="picture-card"
          className="avatar-uploader"
          showUploadList={false}
          //   action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
          beforeUpload={beforeUpload}
          onChange={handleChange}
        >
          {imageUrl ? (
            <img src={imageUrl} alt="avatar" style={{ width: "100%" }} />
          ) : (
            uploadButton
          )}
        </Upload>
        <Form.Item label="Gas Station Name">
          <Input placeholder="input gas station name" />
        </Form.Item>
        <Form.Item label="Gas Station Address">
          <Input placeholder="input gas station address" />
        </Form.Item>
        <Form.Item label="Number of Hoses">
          <Input placeholder="input number of hoses" />
        </Form.Item>
        <Form.Item label="Queue">
          <Select>
            <Select.Option value="demo">High</Select.Option>
            <Select.Option value="demo">Medium</Select.Option>
            <Select.Option value="demo">Low</Select.Option>
          </Select>
        </Form.Item>
        <div className="flex items-center space-x-2">
          <button
            className="text-black hover:bg-sky-800 hover:text-white py-2 px-4 border border-1 rounded-md"
            onClick={() => getPosition()}
            type="button"
          >
            Pick current location
          </button>
        </div>
        <div className="flex space-x-2 py-4">
          <Button htmlType="button" onClick={onReset}>
            Reset
          </Button>
          <Button type="primary" htmlType="submit" className="text-black">
            Submit
          </Button>
        </div>
      </Form>
      <Form layout="horizontal" form={form} onFinish={onFinish}>
        <p className="font-semibold text-lg py-4">Tanker</p>
        <div>
          <div className="font-semibold text-base">Benzil</div>
          <Form.Item label="Capacity">
            <Input placeholder="input gas station capacity" />
          </Form.Item>
          <Form.Item label="Available">
            <Input placeholder="input gas station available" />
          </Form.Item>
        </div>
        <div>
          <div className="font-semibold text-lg">Nafta</div>
          <Form.Item label="Capacity">
            <Input placeholder="input gas station capacity" />
          </Form.Item>
          <Form.Item label="Available">
            <Input placeholder="input gas station available" />
          </Form.Item>
        </div>
        <div className="flex space-x-2">
          <Button htmlType="button" onClick={onReset}>
            Reset
          </Button>
          <Button type="primary" htmlType="submit" className="text-black">
            Submit
          </Button>
        </div>
      </Form>
    </div>
  );
};
export default GasStationRegistrationForm;
