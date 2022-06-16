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

export function ErrorBoundary({ error }) {
  console.log(error);
  return (
    <>
      <p className="text-red-500">
        You're offline. This action is unavailable until you're connected again
      </p>
    </>
  );
}
