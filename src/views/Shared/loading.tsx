import React from "react";
import { Loader } from "rsuite";

import Logo from "../../images/renault-logo.png";

const Loading = () => {
  return (
    <>
      <div className="loading">
        <div className="loading-content">
          <Loader size="lg" content={""} />
          <img
            alt=""
            src={Logo}
            style={{
              width: "100%",
              maxWidth: 150,
              marginLeft: 40,
            }}
          ></img>
        </div>
      </div>
    </>
  );
};

export default Loading;
