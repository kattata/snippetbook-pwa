import { Link } from "remix";
import "../styles/global.css";
import plus from "~/assets/ant-design_plus-outlined.svg";

const FolderList = ({ data }) => {
  return (
    <div className="w-52">
      <div className="flex justify-between items-center mb-3">
        <h3 className="font-bold">Folders</h3>
        <Link to="/folders/new">
          <div className="bg-slate-800 w-5 h-5 rounded-full flex items-center justify-center">
            <img src={plus} alt="Plus" className="h-3 w-3" />
          </div>
        </Link>
      </div>
      <div className="h-[97%] overflow-y-scroll pb-5">
        {data.map((folder) => {
          return (
            <div key={folder?._id} className="relative">
              <Link to={`/folders/${folder?._id}/snippets`}>
                <div className="grey-border p-3 mt-2 w-full" key={folder._id}>
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
