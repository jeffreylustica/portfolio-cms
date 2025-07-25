import {
  UserIcon,
  FolderIcon,
  SparklesIcon,
  BriefcaseIcon,
  DocumentIcon,
  ArrowRightStartOnRectangleIcon,
} from "@heroicons/react/24/outline";
import Spinner from "./Spinner";

const SideBar = ({
  isSidebarOpen,
  toggleSidebar,
  stopPropagation,
  collections,
  documents,
  changeActiveDocument,
  changeActiveCollection,
  isDocumentsLoading,
}) => {
  const collectionMapping = {
    personaldetails: {
      displayName: "Profile",
      icon: <UserIcon className="md:hidden w-7 h-7" />,
    },
    projects: {
      displayName: "Projects",
      icon: <FolderIcon className="md:hidden w-7 h-7" />,
    },
    skills: {
      displayName: "Skills",
      icon: <SparklesIcon className="md:hidden w-7 h-7" />,
    },
    experiences: {
      displayName: "Experiences",
      icon: <BriefcaseIcon className="md:hidden w-7 h-7" />,
    },
    files: {
      displayName: "Files",
      icon: <DocumentIcon className="md:hidden w-7 h-7" />,
    },
  };

  const handleItemClick = (id) => {
    changeActiveDocument(id);
    toggleSidebar();
  };

  const handleCollectionClick = (name) => {
    changeActiveCollection(name);
  };

  return (
    <div
      className={`fixed top-0 left-0 z-20 h-full w-full md:w-0 bg-black/50  transition-transform duration-300 ${
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      }  md:translate-x-0`}
      onClick={toggleSidebar}
    >
      <div className="w-[300px] h-full" onClick={stopPropagation}>
        <hr />
        <div className="flex h-full">
          {/* main menu */}
          <div className="p-2 bg-blue-500 text-white h-full w-auto flex flex-col">
            <ul>
              {collections.map((collectionName, index) => {
                if (collectionName !== "users") {
                  const { displayName, icon } = collectionMapping[
                    collectionName.toLowerCase()
                  ] || { displayName: collectionName, icon: null };
                  return (
                    <li
                      key={index}
                      className="py-2 px-1 cursor-pointer"
                      onClick={() => handleCollectionClick(collectionName)}
                    >
                      {icon && icon}{" "}
                      <span className="hidden md:block whitespace-nowrap">
                        {displayName}
                      </span>
                    </li>
                  );
                }
              })}
            </ul>
            <div className="mt-auto">
              <ul>
                <li className="py-2 px-1">
                  <ArrowRightStartOnRectangleIcon className="w-7 h-7" />
                </li>
              </ul>
            </div>
          </div>
          {/* sub menu */}
          <div className="p-2 bg-white h-full w-full relative">
            {isDocumentsLoading && <Spinner />}
            <ul>
              {/* <li className="py-2 px-1">Submenu 1</li>
              <li className="py-2 px-1">Submenu 2</li>
              <li className="py-2 px-1">Submenu 3</li> */}
              {documents.map((doc) => {
                return (
                  <li
                    key={doc._id}
                    className="py-2 px-1 cursor-pointer"
                    onClick={() => handleItemClick(doc._id)}
                  >
                    {doc.name}
                  </li>
                );
              })}
              <li
                className="py-2 px-1 cursor-pointer"
                onClick={() => handleItemClick("new")}
              >
                + New Item
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
