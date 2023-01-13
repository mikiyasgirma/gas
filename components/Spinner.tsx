import React from "react";
import ReactLoading, { LoadingType } from "react-loading";

type props = {
  type: LoadingType;
  color: string;
};

const Spinner = ({ type, color }: props) => (
  <ReactLoading type={type} color={color} height={40} width={70} />
);

export default Spinner;
