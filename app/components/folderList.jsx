import { Link } from "remix";
import "../styles/global.css";
import plus from "~/assets/add-icon.svg";
import arrow from "~/assets/arrow.svg";
import favoriteIcon from "~/assets/favorites-icon.svg";
import allSnippets from "~/assets/all-snippets-icon.svg";
import collectionsIcon from "~/assets/collections-icon.svg";
import DeleteFolder from "~/components/deleteFolder";
import close from "~/assets/charm_cross.svg";
import logo from "~/assets/bi_code-slash.svg";

const FolderList = ({ data, setMenuOpen, menuOpen }) => {
  return (
    <div
      className={
        menuOpen
          ? "bg-slate-100 block h-full w-full absolute z-30 top-0 left-0 p-5 shadow-xl"
          : "lg:w-72 hidden lg:block bg-slate-100 p-5 shadow-xl"
      }
    >
      <div className="flex flex-row align-middle">
        <Link to="/">
          <div className="items-center mb-6 hidden lg:flex">
            <img src={logo} alt="SnippetBook Logo" className="h-5" />
            <h2 className="font-bold text-xl ml-3">SnippetBook</h2>
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
            <div className="py-2 w-full">
              <div className="flex items-center">
                <img
                  src={allSnippets}
                  alt="All snippets icon"
                  className="h-5 w-5 mr-2"
                />
                <h3 className="font-bold">All snippets</h3>
              </div>
            </div>
          </Link>
        </div>
        <Link to={`/folders/all/snippets`}>
          <div className="py-2 w-full">
            <div className="flex items-center">
              <img
                src={favoriteIcon}
                alt="Favorite icon"
                className="h-5 w-5 mr-2"
              />
              <h3 className="font-bold">Favorites</h3>
            </div>
          </div>
        </Link>
        <div className="flex justify-between items-center py-2">
          <div className="flex items-center">
            <img
              src={collectionsIcon}
              alt="Collections Icon"
              className="h-5 w-5 mr-2"
            />
            <h3 className="font-bold">Collections</h3>
          </div>
          <Link to="/folders/new" onClick={() => setMenuOpen(false)}>
            <div>
              <img src={plus} alt="Plus" className="h-5 w-5 float-right" />
            </div>
          </Link>
        </div>

        {data.map((folder) => {
          return (
            <div
              key={folder?._id}
              className="relative pl-6"
              onClick={setMenuOpen && (() => setMenuOpen(false))}
            >
              <DeleteFolder folder={folder} />
              <Link to={`/folders/${folder?._id}/snippets`}>
                <div className="py-2 w-full">
                  <div className="flex items-center">
                    <div>
                      <img src={arrow} alt="Arrow" className="h-5 w-5 mr-2" />
                    </div>
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
