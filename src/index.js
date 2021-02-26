import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

// 使用React.StrictMode会在使用useState等的时候渲染两次，仅在开发模式下会这样
ReactDOM.render(
  // <React.StrictMode>
  <App />,
  // </React.StrictMode>,
  document.getElementById("root")
);
