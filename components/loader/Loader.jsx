import React from "react";

import { Box } from "@mui/material";

function Loader() {
  return (
    <Box
      width="10%"
      height="10%"
      sx={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)"
      }}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
        <rect fill="#FFFFFF" width="100%" height="100%" />
        <circle fill="#1462D5" stroke="#1462D5" strokeWidth="2" r="15" cx="40" cy="65">
          <animate
            attributeName="cy"
            calcMode="spline"
            dur="1.1"
            values="65;135;65;"
            keySplines=".5 0 .5 1;.5 0 .5 1"
            repeatCount="indefinite"
            begin="-.4"></animate>
        </circle>
        <circle fill="#1462D5" stroke="#1462D5" strokeWidth="2" r="15" cx="100" cy="65">
          <animate
            attributeName="cy"
            calcMode="spline"
            dur="1.1"
            values="65;135;65;"
            keySplines=".5 0 .5 1;.5 0 .5 1"
            repeatCount="indefinite"
            begin="-.2"></animate>
        </circle>
        <circle fill="#1462D5" stroke="#1462D5" strokeWidth="2" r="15" cx="160" cy="65">
          <animate
            attributeName="cy"
            calcMode="spline"
            dur="1.1"
            values="65;135;65;"
            keySplines=".5 0 .5 1;.5 0 .5 1"
            repeatCount="indefinite"
            begin="0"></animate>
        </circle>
      </svg>
    </Box>
  );
}

export default Loader;
