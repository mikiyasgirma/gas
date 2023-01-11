import React from "react";
import ReactLoading, { LoadingType } from "react-loading";

type props = {
  type: LoadingType;
  color: string;
};

const Spinner = ({ type, color }: props) => (
  <ReactLoading type={type} color={color} height={667} width={375} />
);

export default Spinner;
