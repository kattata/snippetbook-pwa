import LoadingCover from "../components/loadingCover.jsx";
import { useTransition } from "@remix-run/react";

export default function Index() {
  // const allPosts = useActionData();
  const transition = useTransition();

  return (
    <div className="wrapper hidden lg:block">
      <LoadingCover remixTransition={transition} />
      <div className="wrapper-inner">
        <p className="text-slate-400 text-xs">No folder selected.</p>
      </div>
    </div>
  );
}
