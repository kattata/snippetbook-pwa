import { useState } from "react";
import { Link } from "remix";
import logo from "~/assets/bi_code-slash.svg";
import burger from "~/assets/bx_menu-alt-right.svg";
import close from "~/assets/charm_cross.svg";
import FolderList from "./folderList";

const NavBar = ({ data }) => {
  const [menuOpen, setMenuOpen] = useState();
  return (
    <>
      <div className="lg:hidden bg-white h-20 w-full fixed z-10 flex justify-between items-center px-5 shadow-md">
        <img
          src={burger}
          alt="Burger"
          className="h-8"
          onClick={() => setMenuOpen(true)}
        />
        <Link to="/">
          <div className="flex items-center">
            <img src={logo} alt="SnippetBook Logo" className="h-5" />
            <h2 className="font-bold text-lg ml-3">SnippetBook</h2>
          </div>
        </Link>
      </div>
      <div
        className={
          menuOpen
            ? "block bg-slate-100 h-full w-full absolute z-30 top-0 left-0"
            : "hidden"
        }
      >
        <img
          src={close}
          alt="Close"
          onClick={() => setMenuOpen(false)}
          className="block ml-auto mr-0 p-5"
        />
        <div className="mt-20">
          <FolderList data={data.folders} />
        </div>
      </div>
    </>
  );
};

export default NavBar;
