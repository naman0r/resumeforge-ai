"use client";

import React from "react";

const Sidebar = () => {
  return (
    <div className="w-64 bg-gray-100 dark:bg-gray-800 p-4">
      <h2 className="text-lg font-bold mb-4">Templates</h2>
      <ul>
        <li className="mb-2">
          <a href="#" className="hover:text-blue-500">
            Template 1
          </a>
        </li>
        <li className="mb-2">
          <a href="#" className="hover:text-blue-500">
            Template 2
          </a>
        </li>
        <li className="mb-2">
          <a href="#" className="hover:text-blue-500">
            Template 3
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
