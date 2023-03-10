import { Button, Form, Input, message, Select, Upload } from "antd";
import { useState } from "react";
import { useGeolocated } from "../src";
import useAgentsStore from "../store/agentsStore";
import { addDoc, collection } from "firebase/firestore";
import useGasStationsStore from "../store/gasStationsStore";
import { db } from "../firebase";
import useEditModalStore from "../store/editModalStore";
import useAuthStore from "../store/authStore";

type props = {
  gasStationId: string;
};

const GasStationEditForm = ({ gasStationId }: props): JSX.Element => {
  const [form] = Form.useForm();
  const closeEditModal = useEditModalStore((state) => state.closeEditModal);
  const [locationPicked, setLocationPicked] = useState(false);
  const agents = useAgentsStore((state) => state.agents);
  const updateGasStation = useGasStationsStore((state) => state.editGasStation);
  const gasStations = useGasStationsStore((state) => state.gasStations);
  const currentUser = useAuthStore((state) => state.currentUser);
  console.log("agents from form", agents);

  const role = agents.find((agent) => agent.email === currentUser?.user.email);

  const { coords, isGeolocationAvailable, isGeolocationEnabled, getPosition } =
    useGeolocated({
      positionOptions: {
        enableHighAccuracy: false,
      },
      suppressLocationOnMount: true,
      userDecisionTimeout: 5000,
    });
  console.log("coord", coords);

  const editGasStation = gasStations.find(
    (gasStations) => gasStations.id == gasStationId
  );
  console.log("initial values", editGasStation);

  const onFinish = async (values: any) => {
    console.log(values);
    const formValuesWithDefaultValues: any = {
      name: role && role.role === "agent" ? editGasStation?.name : values.name,
      image: editGasStation?.image,
      address:
        role && role.role === "agent"
          ? editGasStation?.address
          : values.address,
      geoPoint: editGasStation?.geoPoint,
      numberOfHoses:
        role && role.role === "agent"
          ? editGasStation?.address
          : values.address,
      benzilCapacity:
        role && role.role === "agent"
          ? editGasStation?.benzilCapacity
          : values.benzilCapacity,
      benzilAvailable: values.benzilAvailable,
      naftaCapacity:
        role && role.role === "agent" ? editGasStation?.name : values.name,
      naftaAvailable: values.naftaAvailable,
      updatedat: editGasStation?.updatedat,
      queue: editGasStation?.queue,
    };
    updateGasStation(formValuesWithDefaultValues, gasStationId);
    closeEditModal();
  };

  const locationHandler = () => {
    getPosition();
    setLocationPicked(true);
  };

  return (
    <Form
      layout="horizontal"
      form={form}
      onFinish={onFinish}
      initialValues={{
        name: editGasStation?.name,
        image: editGasStation?.image,
        address: editGasStation?.address,
        geoPoint: editGasStation?.geoPoint,
        numberOfHoses: editGasStation?.numberOfHoses,
        benzilCapacity: editGasStation?.benzilCapacity,
        benzilAvailable: editGasStation?.benzilAvailable,
        naftaCapacity: editGasStation?.naftaCapacity,
        naftaAvailable: editGasStation?.naftaAvailable,
        updatedat: editGasStation?.updatedat,
        queue: editGasStation?.queue,
      }}
    >
      <div className="grid grid-cols-2 gap-12">
        <div>
          <p className="font-semibold text-base py-4">Upload photo</p>
          <Form.Item name="name" label="Gas Station Name">
            <Input disabled={role && role.role === "agent" ? true : false} />
          </Form.Item>
          <Form.Item name="address" label="Gas Station Address">
            <Input disabled={role && role.role === "agent" ? true : false} />
          </Form.Item>
          <Form.Item name="numberOfHoses" label="Number of Hoses">
            <Input disabled={role && role.role === "agent" ? true : false} />
          </Form.Item>

          {locationPicked ? (
            <div className="flex items-center space-x-2">
              <button
                className="text-white bg-primary py-2 px-4 border border-1 rounded-md"
                onClick={locationHandler}
                type="button"
                disabled={role && role.role === "agent" ? true : false}
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
                disabled={role && role.role === "agent" ? true : false}
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
              <Input disabled={role && role.role === "agent" ? true : false} />
            </Form.Item>
            <Form.Item name="benzilAvailable" label="Available in Liter">
              <Input />
            </Form.Item>
          </div>
          <div>
            <div className="font-semibold text-lg">Nafta</div>
            <Form.Item name="naftaCapacity" label="Capacity in Liter">
              <Input disabled={role && role.role === "agent" ? true : false} />
            </Form.Item>
            <Form.Item name="naftaAvailable" label="Available in Liter">
              <Input />
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
            <Button htmlType="button" onClick={() => closeEditModal()}>
              Cancel
            </Button>
            <Button
              type="primary"
              htmlType="submit"
              className="text-black border-1 border-gray-300"
            >
              Edit
            </Button>
          </div>
        </div>
      </div>
    </Form>
  );
};
export default GasStationEditForm;
