import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Form, Input, message, Select, Upload } from "antd";
import type { RcFile, UploadFile, UploadProps } from "antd/es/upload/interface";
import type { UploadChangeParam } from "antd/es/upload";
import { useState } from "react";
import useModalStore from "../store/modalStore";
import { useGeolocated } from "../src";
import useAgentsStore from "../store/agentsStore";
import { addDoc, collection } from "firebase/firestore";
import useGasStationsStore from "../store/gasStationsStore";
import { db } from "../firebase";
import { async } from "@firebase/util";
import date from "date-and-time";
import { storage } from "../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

type props = {};

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
  const [locationPicked, setLocationPicked] = useState(false);
  const agents = useAgentsStore((state) => state.agents);
  const addGasStations = useGasStationsStore((state) => state.addGasStation);
  console.log("agents from form", agents);
  console.log("image taken", imageUrl);

  const now = new Date();

  const { coords, isGeolocationAvailable, isGeolocationEnabled, getPosition } =
    useGeolocated({
      positionOptions: {
        enableHighAccuracy: false,
      },
      suppressLocationOnMount: true,
      userDecisionTimeout: 5000,
    });
  console.log("coord", coords);
  console.log("image", imageUrl);

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
        console.log("image Object", info.file.originFileObj);
        const imageRef = ref(storage, info.file.originFileObj?.name);
        // @ts-ignore
        uploadBytes(imageRef, info.file.originFileObj).then(() => {
          getDownloadURL(imageRef).then((url) => {
            setImageUrl(url);
          });
        });
        setLoading(false);
        // setImageUrl(url);
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

  const onFinish = async (values: any) => {
    console.log("values", values);
    closeModal();
    const gasStationsData = {
      ...values,
      geoPoint: {
        latitude: coords?.latitude,
        longitude: coords?.longitude,
      },
      image: imageUrl,
      updatedat: date.format(now, "YYYY/MM/DD HH:mm:ss"),
    };
    try {
      const docRef = await addDoc(
        collection(db, "gasstations"),
        gasStationsData
      );
      addGasStations(gasStationsData);
      console.log("document written with Id: ", docRef.id);
    } catch (error) {
      console.log(error);
    }
  };

  const locationHandler = () => {
    getPosition();
    setLocationPicked(true);
  };

  return (
    <Form layout="horizontal" form={form} onFinish={onFinish}>
      <div className="grid grid-cols-2 gap-12">
        <div>
          <p className="font-semibold text-base py-4">Upload photo</p>
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
          <Form.Item name="name" label="Gas Station Name">
            <Input placeholder="input gas station name" />
          </Form.Item>
          <Form.Item name="address" label="Gas Station Address">
            <Input placeholder="input gas station address" />
          </Form.Item>
          <Form.Item name="numberOfHoses" label="Number of Hoses">
            <Input placeholder="input number of hoses" />
          </Form.Item>
          {locationPicked ? (
            <div className="flex items-center space-x-2">
              <button
                className="text-white bg-primary py-2 px-4 border border-1 rounded-md"
                onClick={locationHandler}
                type="button"
              >
                Location Picked
              </button>
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <button
                className="text-black hover:bg-sky-800 hover:text-white py-2 px-4 border border-1 rounded-md"
                onClick={locationHandler}
                type="button"
              >
                Pick current location
              </button>
            </div>
          )}
        </div>

        <div>
          <div>
            <div className="font-semibold text-base">Benzil</div>
            <Form.Item name="benzilCapacity" label="Capacity in Liter">
              <Input placeholder="input gas station capacity" />
            </Form.Item>
            <Form.Item name="benzilAvailable" label="Available in Liter">
              <Input placeholder="input gas station available" />
            </Form.Item>
          </div>
          <div>
            <div className="font-semibold text-lg">Nafta</div>
            <Form.Item name="naftaCapacity" label="Capacity in Liter">
              <Input placeholder="input gas station capacity" />
            </Form.Item>
            <Form.Item name="naftaAvailable" label="Available in Liter">
              <Input placeholder="input gas station available" />
            </Form.Item>
          </div>
          <div>
            <Form.Item name="queue" label="Queue Length" required>
              <Select
                showSearch
                placeholder="Assign gas station if only the role is agent"
              >
                <Select.Option key="high" value="high">
                  High
                </Select.Option>
                <Select.Option key="medium" value="medium">
                  Medium
                </Select.Option>
                <Select.Option key="low" value="low">
                  Low
                </Select.Option>
              </Select>
            </Form.Item>
          </div>
          <div className="flex space-x-2">
            <Button htmlType="button" onClick={() => closeModal()}>
              Cancel
            </Button>
            <Button
              type="primary"
              htmlType="submit"
              className="text-black border-1 border-gray-300"
            >
              Submit
            </Button>
          </div>
        </div>
      </div>
    </Form>
  );
};
export default GasStationRegistrationForm;
