import { Link } from "remix";
import "../styles/global.css";
import plus from "~/assets/ant-design_plus-outlined.svg";
import DeleteFolder from "~/components/deleteFolder";
import close from "~/assets/charm_cross.svg";

const FolderList = ({ data, setMenuOpen, menuOpen }) => {
  return (
    <div
      className={
        menuOpen
          ? "block bg-slate-100 h-full w-full absolute z-30 top-0 left-0 p-5"
          : "w-52 hidden lg:block"
      }
    >
      <img
        src={close}
        alt="Close"
        onClick={() => setMenuOpen(false)}
        className={menuOpen ? "block ml-auto mr-0" : "hidden"}
      />
      <div className="flex justify-between items-center mb-3">
        <h3 className="font-bold">Folders</h3>
        <Link to="/folders/new" onClick={() => setMenuOpen(false)}>
          <div className="bg-slate-800 w-5 h-5 rounded-full flex items-center justify-center">
            <img src={plus} alt="Plus" className="h-3 w-3" />
          </div>
        </Link>
      </div>
      <div className="h-[97%] overflow-y-scroll pb-5">
        <div
          className="relative"
          onClick={setMenuOpen && (() => setMenuOpen(false))}
        >
          <Link to={`/folders/all/snippets`}>
            <div className="grey-border p-3 mt-2 w-full">
              <div className="flex justify-between">
                <h3 className="font-bold mb-4">All</h3>
              </div>
            </div>
          </Link>
        </div>
        {data.map((folder) => {
          return (
            <div
              key={folder?._id}
              className="relative"
              onClick={setMenuOpen && (() => setMenuOpen(false))}
            >
              <DeleteFolder folder={folder} />
              <Link to={`/folders/${folder?._id}/snippets`}>
                <div className="grey-border p-3 mt-2 w-full">
                  <div className="flex justify-between">
                    <h3 className="font-bold mb-4">{folder?.name}</h3>
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
