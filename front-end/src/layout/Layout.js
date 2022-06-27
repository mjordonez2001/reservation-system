import React from "react";
import Menu from "./Menu";
import Routes from "./Routes";

import "./Layout.css";

/**
 * Defines the main layout of the application.
 *
 * You will not need to make changes to this file.
 *
 * @returns {JSX.Element}
 */
function Layout() {
  return (
    <div className="container-fluid">
      <div className="row h-100">
        <div className="col-xl-2 side-bar py-xl-4">
          <Menu />
        </div>
        <div className="col py-xl-4 py-2">
          <Routes />
        </div>
      </div>
    </div>
  );
}

export default Layout;
