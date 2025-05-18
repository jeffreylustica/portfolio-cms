import {UserIcon, FolderIcon, SparklesIcon, BriefcaseIcon, DocumentIcon, ArrowRightStartOnRectangleIcon} from "@heroicons/react/24/outline"

const SideBar = ({isSidebarOpen, toggleSidebar, stopPropagation, collections, documents}) => {

  const collectionMapping = {
    'personaldetails': { displayName: 'Personal Details', icon: <UserIcon className="md:hidden w-7 h-7" /> },
    'projects': { displayName: 'Projects', icon: <FolderIcon className="md:hidden w-7 h-7" /> },
    'skills': { displayName: 'Skills', icon: <SparklesIcon className="md:hidden w-7 h-7" /> },
    'works': { displayName: 'Works', icon: <BriefcaseIcon className="md:hidden w-7 h-7" /> },
    'files': { displayName: 'Files', icon: <DocumentIcon className="md:hidden w-7 h-7" /> },
  };

  return (
    <div className={`fixed top-0 left-0 h-full w-full md:w-0 bg-black/50  transition-transform duration-300 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}  md:translate-x-0`} onClick={toggleSidebar}>
      <div className="w-[300px] h-full bg-white" onClick={stopPropagation}>
        <hr />
        <div className="flex h-full">
          {/* main menu */}
          <div className="p-2 bg-gray-100 h-full w-auto flex flex-col">
            <ul>
              {collections.map((collectionName, index) => {
                if (collectionName !== "users") {
                  const { displayName, icon } = collectionMapping[collectionName.toLowerCase()] || { displayName: collectionName, icon: null };
                   return (
                     <li key={index} className="py-2 px-1">{icon && icon} <span className="hidden md:block whitespace-nowrap">{displayName}</span></li>
                   )
                }
              })}
              {/* <li className="py-2 px-1"><UserIcon className="md:hidden w-7 h-7"/> <span className="hidden md:block whitespace-nowrap">Personal Details</span></li>
              <li className="py-2 px-1"><FolderIcon className="md:hidden w-7 h-7"/> <span className="hidden md:block">Projects</span></li>
              <li className="py-2 px-1"><SparklesIcon className="md:hidden w-7 h-7"/> <span className="hidden md:block">Skills</span></li>
              <li className="py-2 px-1">< BriefcaseIcon className="md:hidden w-7 h-7"/> <span className="hidden md:block">Works</span></li>
              <li className="py-2 px-1"><DocumentIcon className="md:hidden w-7 h-7"/> <span className="hidden md:block">Files</span></li> */}
            </ul>
            <div className="mt-auto">
              <ul>
                <li className="py-2 px-1"><ArrowRightStartOnRectangleIcon className="w-7 h-7"/></li>
              </ul>
            </div>
          </div>
          {/* sub menu */}
          <div className="p-2 bg-gray-200 h-full w-full">
            <ul>
              {/* <li className="py-2 px-1">Submenu 1</li>
              <li className="py-2 px-1">Submenu 2</li>
              <li className="py-2 px-1">Submenu 3</li> */}
              {documents.map((doc, index) => {
                return (
                  <li key={index} className="py-2 px-1">{doc.name}</li>
                )
              })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
