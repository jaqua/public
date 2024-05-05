import React from "react";
import Svg, { Path } from "react-native-svg";

const Triangle = () => {
  return (
    <Svg
      viewBox="0 0 150 80"
      width="50"
      height="27">
      <Path
        d="M0 0h150L75 80z"
        fill={"#fff"}
      />
    </Svg>
  );
};

export default Triangle;
