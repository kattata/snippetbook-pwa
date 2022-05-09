import { Link } from "remix";
import logo from "~/assets/bi_code-slash.svg";
import burger from "~/assets/bx_menu-alt-right.svg";

const NavBar = ({ setMenuOpen }) => {
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
    </>
  );
};

export default NavBar;
