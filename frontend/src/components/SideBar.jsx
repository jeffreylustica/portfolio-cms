import {
  UserIcon,
  FolderIcon,
  SparklesIcon,
  BriefcaseIcon,
  DocumentIcon,
  ArrowLeftIcon,
  ArrowLeftEndOnRectangleIcon,
} from "@heroicons/react/24/outline";
import Spinner from "./ui/Spinner";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { authActions } from "../store";
import toast from "react-hot-toast";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const SideBar = ({
  isSidebarOpen,
  toggleSidebar,
  stopPropagation,
  collections,
  documents,
  activeCollection,
  activeDocument,
  changeActiveDocument,
  changeActiveCollection,
  isDocumentsLoading,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const collectionMapping = {
    personaldetails: {
      displayName: "Profiles",
      icon: <UserIcon className="w-6 h-6" />,
    },
    projects: {
      displayName: "Projects",
      icon: <FolderIcon className="w-6 h-6" />,
    },
    skills: {
      displayName: "Skills",
      icon: <SparklesIcon className="w-6 h-6" />,
    },
    experiences: {
      displayName: "Experiences",
      icon: <BriefcaseIcon className="w-6 h-6" />,
    },
    files: {
      displayName: "Files",
      icon: <DocumentIcon className="w-6 h-6" />,
    },
  };

  const handleItemClick = (id) => {
    changeActiveDocument(id);
    toggleSidebar();
  };

  const handleCollectionClick = (name) => {
    changeActiveCollection(name);
  };

  const handleLogout = async () => {
    try {
      const res = await axios.post(`${API_BASE_URL}/api/logout`, null, {
        withCredentials: true,
      });

      if (res.status === 200) {
        dispatch(authActions.logout());
        navigate("/");
        return;
      }
    } catch (error) {
      if (import.meta.env.MODE === "development") {
        console.error(error);
      }

      toast.error("Unable to logout. Please try again");
    }
  };

  return (
    <div
      className={`fixed top-0 left-0 z-20 h-full w-full md:w-0 bg-black/50  transition-transform duration-300 ${
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      }  md:translate-x-0`}
    >
      <div className="w-full md:min-w-[320px] h-full" onClick={stopPropagation}>
        <div className="flex h-full">
          {/* main menu */}
          <div className="p-2 px-4 h-full w-auto flex flex-col text-center bg-white">
            <h1 className="text-3xl font-bold text-blue-900">CMS</h1>
            <ul className="mt-4">
              {collections.map((collectionName, index) => {
                if (collectionName !== "users") {
                  const { displayName, icon } = collectionMapping[
                    collectionName.toLowerCase()
                  ] || { displayName: collectionName, icon: null };
                  const isActive = activeCollection === collectionName;
                  const activeClass = isActive ? "active-nav" : "nav";

                  return (
                    <li
                      key={index}
                      className="cursor-pointer flex justify-center items-center flex-col py-2"
                      onClick={() => handleCollectionClick(collectionName)}
                    >
                      {icon && (
                        <div
                          className={`w-10 h-10 flex justify-center items-center rounded-xl mb-2 hover:shadow-md hover:shadow-blue-300 transition-shadow ${activeClass}`}
                        >
                          {icon}
                        </div>
                      )}
                      <div
                        className={`whitespace-nowrap text-[.625rem] font-semibold ${
                          isActive ? "text-blue-500" : "text-neutral-800"
                        }`}
                      >
                        {displayName}
                      </div>
                    </li>
                  );
                }
              })}
            </ul>
            <div className="mt-auto">
              <ul>
                <li
                  className="cursor-pointer flex justify-center items-center flex-col py-2"
                  onClick={handleLogout}
                >
                  <div className="w-10 h-10 flex justify-center items-center bg-neutral-100 hover:bg-neutral-200 rounded-full">
                    <ArrowLeftEndOnRectangleIcon className="w-6 h-6" />
                  </div>
                  <div className="whitespace-nowrap text-neutral-800 text-[.625rem] font-semibold">
                    Logout
                  </div>
                </li>
              </ul>
            </div>
          </div>
          {/* sub menu */}
          <div className="p-2 px-4 h-full w-full max-w-[260px] md:max-w-[220px] relative bg-blue-50">
            {isDocumentsLoading && <Spinner />}
            <div className="flex justify-end p-2 md:hidden">
              <ArrowLeftIcon
                className="w-6 h-6 text-neutral-400"
                onClick={toggleSidebar}
              />
            </div>
            <div className="my-6 text-sm">Items Overview</div>
            <ul className="max-h-[80vh] md:max-h-[86vh] overflow-y-auto hide-scroll-thumb pb-4">
              {documents.map((doc) => {
                const isActive = doc._id === activeDocument._id;
                const activeClass = isActive ? "active-sub-menu" : "sub-menu";
                return (
                  <li
                    key={doc._id}
                    className={`p-2 px-4 cursor-pointer border-1 mb-2 text-sm rounded-md hover:shadow-md hover:shadow-blue-200 transition-shadow truncate ${activeClass}`}
                    onClick={() => handleItemClick(doc._id)}
                  >
                    {doc.name}
                  </li>
                );
              })}
              <li
                className={`p-2 cursor-pointer border-1 mb-2 text-sm rounded-md text-center hover:shadow-md hover:shadow-blue-200 transition-shadow ${
                  activeDocument?._id === "new" ? "active-sub-menu" : "sub-menu"
                }`}
                onClick={() => handleItemClick("new")}
              >
                +
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
