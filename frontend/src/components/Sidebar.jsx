import { BellIcon, CloudLightning, HomeIcon, UsersIcon } from "lucide-react";
import React from "react";
import { Link, useLocation } from "react-router";
import NavLink from "./NavLink";
import useAuthUser from "../hooks/useAuthUser.js";
import AppLogo from "./AppLogo";

const Sidebar = () => {

  const {authUser} = useAuthUser()  
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <aside className="w-62 bg-base-200 border-r border-base-300 hidden lg:flex flex-col h-screen sticky top-0">
      {/* Logo */}
      <div className="p-5 border-b border-base-300">
        <AppLogo/>
      </div>

      {/* Nav Items */}
      <nav className="flex-1 p-4 space-y-1">
        {/* HOME */}
        <NavLink
          routePath={"/"}
          icon={HomeIcon}
          currentPath={currentPath === "/"}
          LinkName={"Home"}
        />

        {/* FRIENDS */}
        <NavLink
          routePath="/friends"
          icon={UsersIcon}
          currentPath={currentPath === "/friends"}
          LinkName={"Friends"}
        />

        {/* NOTIFICTIONS */}
        <NavLink
          routePath="/notifications"
          icon={BellIcon}
          currentPath={currentPath === "/notification"}
          LinkName={"Notifications"}
        />
      </nav>

      {/* user profile section */}
      <div className='p-4 border-t border-base-300 mt-auto'>
            <div className='flex items-center gap-3'>
                <div className='avatar'>
                    <div className='w-10 rounded-full border border-base-300'>
                        <img src={authUser?.profilePic} alt="User Avatar" />
                    </div>
                </div>

                <div className='flex-1'>
                    <p className='font-semibold text-sm'> {authUser?.fullName} </p>
                    <p className='text-xs text-green-600 flex items-center gap-1'>
                        <span className='size-2 rounded-full bg-green-700 inline-block' />
                        Online
                    </p>
                </div>
            </div>
        </div>
    </aside>
  );
};

export default Sidebar;
