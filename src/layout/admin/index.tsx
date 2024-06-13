import React from "react";
import { Outlet } from "react-router-dom";

export default function LayoutAdmin() {
  return (
    <React.Fragment>
      <Outlet />
    </React.Fragment>
  );
}
