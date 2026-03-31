import React from "react";
import useAuthUser from "../hooks/useAuthUser.js";
import { Link, useLocation } from "react-router";
import AppLogo from "./AppLogo";
import { BellIcon, LogOutIcon, Menu } from "lucide-react";
import ButtonLink from "./ButtonLink";
import ThemeSelector from "./ThemeSelector";
import useLogout from "../hooks/useLogout.js";
import Sidebar from "./Sidebar.jsx";

const Navbar = ({ toggleSidebar }) => {
  const { authUser } = useAuthUser();
  const location = useLocation();
  const isChatPage = location.pathname?.startsWith("/chat");
  const isHomePage = location.pathname === "/";

  const { logoutMutation } = useLogout();

  return (
    <>
      <nav className="bg-base-200 px-6 border-b border-base-300 sticky top-0 z-30 h-16 flex items-center">
        <div className="w-full">
          <div className="flex items-center justify-between w-full">
            {/* logo only in the chatpage */}
            {/* {(isChatPage || isHomePage) && ( */}
            {/* <div className={` ${isHomePage ? "lg:hidden" : ""} sm:pl-5 `}> */}
            <AppLogo />
            {/* </div> */}
            {/* )} */}

            <div className="flex items-center gap-1 sm:gap-3 md:gap-4">
              {/* NOTIFICATION LINK */}
              <ButtonLink
              icon={BellIcon} routePath={"/notifications"} />

              {/* THEMESELECTOR */}
              <ThemeSelector />

              {/* USER AVATAR */}
              <Link to="/">
                <div className="avatar">
                  <div className="w-7 sm:w-9 rounded-full border border-base-300">
                    <img
                      src={authUser?.profilePic}
                      alt="User Avatar"
                      rel="noreferrer"
                    />
                  </div>
                </div>
              </Link>

              {/* MENU BUTTON */}
              <button
                className="btn btn-ghost btn-circle"
                onClick={toggleSidebar}
              >
                <Menu className="h-4 w-4  sm:h-6 sm:w-6 text-base-content opacity-70" />
              </button>

              {/* LOGOUT BUTTON */}
              <button
                className="btn btn-ghost btn-circle hidden md:inline-flex"
                onClick={logoutMutation}
              >
                <LogOutIcon className="h-4 w-4  sm:h-6 sm:w-6 text-base-content opacity-70" />
              </button>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
