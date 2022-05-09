import "../styles/global.css";
import FolderList from "./folderList";
import SnippetList from "./snippetList";

const SideBar = ({ data, menuOpen, setMenuOpen }) => {
  return (
    <div className="bg-white h-full w-full lg:w-auto lg:fixed p-5 shadow-md flex gap-x-5">
      <FolderList
        data={data.folders}
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
      />
      <span className="h-full w-[1px] bg-slate-300 hidden lg:block"></span>
      <SnippetList data={data.snippets} />
    </div>
  );
};

export default SideBar;
