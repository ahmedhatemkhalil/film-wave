import React from "react";
import { TailSpin } from "react-loader-spinner";

function Loading() {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <TailSpin
        visible={true}
        height="80"
        width="80"
        color="#0080ff"
        ariaLabel="tail-spin-loading"
      />
    </div>
  );
}

export default Loading;
