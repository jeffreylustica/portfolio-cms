import React from "react";

const SideBar = () => {
  return (
    <div className="bg-amber-400 w-[300px] fixed top-0 left-0 h-full p-2 transition-transform duration-300 -translate-x-full min-md:translate-x-0">
      <h1>Account</h1>
      <hr />
      <div className="flex">
        {/* main menu */}
        <div className="mr-2">
          <ul>
            <li>Links</li>
            <li>Projects</li>
            <li>Skills</li>
            <li>Works</li>
            <li>Files</li>
          </ul>
        </div>
        {/* sub menu */}
        <div>
          <ul>
            <li>Submenu 1</li>
            <li>Submenu 2</li>
            <li>Submenu 3</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
