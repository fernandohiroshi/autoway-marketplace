"use client";

import React from "react";
import Lottie from "lottie-react";

const Loader = () => (
  <div
    style={{
      position: "fixed",
      top: 0,
      left: 0,
      width: "100vw",
      height: "100vh",
      background: "transparent",
      zIndex: 9999,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    <Lottie
      animationData={require("../public/loading.json")}
      loop
      style={{ width: 200, height: 200 }}
    />
  </div>
);

export default Loader;
