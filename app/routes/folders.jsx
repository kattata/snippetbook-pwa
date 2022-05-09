import { Outlet } from "@remix-run/react";
import { useParams, useLocation } from "remix";

export default function Folders() {
  const params = useParams();
  const location = useLocation();
  return (
    <div
      className={
        params.snippetId || location.pathname == "/folders/new"
          ? "wrapper"
          : "wrapper hidden lg:block"
      }
    >
      <div className="wrapper-inner">
        <Outlet />
      </div>
    </div>
  );
}
