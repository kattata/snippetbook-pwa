import "../styles/global.css";
import FolderList from "./folderList";
import SnippetList from "./snippetList";

const SideBar = ({ data }) => {
  return (
    <div className="bg-white h-full fixed p-5 shadow-md flex gap-x-5">
      <FolderList data={data.folders} />
      <span className="block h-full w-[1px] bg-slate-300"></span>
      <SnippetList data={data.snippets} />
    </div>
  );
};

export default SideBar;
