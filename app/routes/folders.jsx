import { Outlet } from "@remix-run/react";

export default function Folders() {
  return (
    <div className="wrapper">
      <div className="wrapper-inner">
        <Outlet />
      </div>
    </div>
  );
}
