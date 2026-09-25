// import { StrictMode } from "react";
// import { createRoot } from "react-dom/client";
// import "./index.css";
// import App from "./App.jsx";
// import store from "./store.store.js";
// import { Provider } from "react-redux";
// import "./css/responsive.css";

// createRoot(document.getElementById("root")).render(
//   <StrictMode>
//     <Provider>
//       <App />
//     </Provider>
//   </StrictMode>,
// );

import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";

const Main = () => {
  return (
    <div>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Main;
