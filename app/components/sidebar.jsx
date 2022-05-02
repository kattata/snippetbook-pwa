import "../styles/global.css";
import FolderList from "./folderList";
import SnippetList from "./snippetList";

const SideBar = ({ data }) => {
  return (
    <div className="lg:bg-white lg:h-full lg:fixed lg:p-5 lg:shadow-md lg:flex lg:gap-x-5 hidden">
      <FolderList data={data.folders} />
      <span className="block h-full w-[1px] bg-slate-300"></span>
      <SnippetList data={data.snippets} />
    </div>
  );
};

export default SideBar;
