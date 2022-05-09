import { Link } from "remix";
import "../styles/global.css";
import plus from "~/assets/ant-design_plus-outlined.svg";
import DeleteFolder from "~/components/deleteFolder";
import close from "~/assets/charm_cross.svg";
import logo from "~/assets/bi_code-slash.svg";

const FolderList = ({ data, setMenuOpen, menuOpen }) => {
  return (
    <div
      className={
        menuOpen
          ? "bg-slate-100 block h-full w-full absolute z-30 top-0 left-0 p-5"
          : "w-52 hidden lg:block bg-slate-100"
      }
    > 
      <div className="flex flex-row align-middle">
        <Link to="/">
          <div className="flex items-center p-2 mb-6">
            <img src={logo} alt="SnippetBook Logo" className="h-5" />
            <h2 className="font-bold text-lg ml-3">SnippetBook</h2>
          </div>
        </Link>
          <img
            src={close}
            alt="Close"
            onClick={() => setMenuOpen(false)}
            className={menuOpen ? "block ml-auto mr-0" : "hidden"}
          />
      </div>
      <div className="h-[97%] pb-5 overflow-hidden">
        <div
          className="relative"
          onClick={setMenuOpen && (() => setMenuOpen(false))}
        >
          <Link to={`/folders/all/snippets`}>
            <div className="py-1 px-2 w-full">
              <div className="flex justify-between">
                <h3 className="font-bold">All snippets</h3>
              </div>
            </div>
          </Link>
        </div>
        <Link to={`/folders/all/snippets`}>
            <div className="py-1 px-2 w-full">
              <div className="flex justify-between">
                <h3 className="font-bold">Favorites</h3>
              </div>
            </div>
          </Link>
        <div className="flex justify-between items-center py-1 px-2">
          <h3 className="font-bold">Collections</h3>
          <Link to="/folders/new" onClick={() => setMenuOpen(false)}>
            <div className="bg-slate-800 w-5 h-5 rounded-full flex items-center justify-center">
              <img src={plus} alt="Plus" className="h-3 w-3" />
            </div>
          </Link>
        </div>

        {data.map((folder) => {
          return (
            <div
              key={folder?._id}
              className="relative pl-4"
              onClick={setMenuOpen && (() => setMenuOpen(false))}
            >
              <DeleteFolder folder={folder} />
              <Link to={`/folders/${folder?._id}/snippets`}>
                <div className="p-2 w-full">
                  <div className="flex justify-between">
                    <h3>{folder?.name}</h3>
                  </div>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FolderList;
