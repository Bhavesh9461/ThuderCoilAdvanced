import {
  BellIcon,
  CloudLightning,
  HomeIcon,
  LogOutIcon,
  UsersIcon,
} from "lucide-react";
import React from "react";
import { Link, useLocation } from "react-router";
import NavLink from "./NavLink";
import useAuthUser from "../hooks/useAuthUser.js";
import AppLogo from "./AppLogo";
import { AnimatePresence, motion } from "framer-motion";
import useLogout from "../hooks/useLogout.js";

const Sidebar = ({ isOpen, onClose }) => {
  const { authUser } = useAuthUser();
  const location = useLocation();
  const currentPath = location.pathname;

  const { logoutMutation } = useLogout();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* 🔥 BACKDROP */}
          <motion.div
            className="fixed inset-0 bg-black/40 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* 🔥 SIDEBAR */}
          <motion.aside
            className="fixed top-0 left-0 h-full w-60 bg-base-200 border-r border-base-300 z-50 flex flex-col"
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", stiffness: 260, damping: 25 }}
          >
            {/* Nav Items */}
            <nav className="flex-1 p-4 space-y-1">
              <NavLink
                routePath={"/"}
                icon={HomeIcon}
                currentPath={currentPath === "/"}
                LinkName={"Home"}
              />

              {/* FRIENDS */}
              <Link
                className={`btn btn-ghost justify-start w-full gap-3 px-3 cursor-not-allowed opacity-50 normal-case
                ${currentPath === "/friends" ? "btn-active" : ""} `}
              >
                <UsersIcon className="size-5 text-base-content opacity-70" />
                <span>Friends</span>
              </Link>

              <NavLink
                routePath="/notifications"
                icon={BellIcon}
                currentPath={currentPath === "/notifications"}
                LinkName={"Notifications"}
              />

              {/* LOGOUT BUTTON */}
              <button
                className="btn btn-ghost justify-start w-full gap-3 normal-case"
                onClick={logoutMutation}
              >
                <LogOutIcon className="size-5 text-base-content opacity-70" />
                <span className="text-error text-[1.1rem]">LogOut</span>
              </button>
            </nav>

            {/* user profile section */}
            <div className="p-4 border-t border-base-300 mt-auto">
              <div className="flex items-center gap-3">
                <div className="avatar">
                  <div className="w-10 rounded-full border border-base-300">
                    <img src={authUser?.profilePic} alt="User Avatar" />
                  </div>
                </div>

                <div className="flex-1">
                  <p className="font-semibold text-sm">{authUser?.userName}</p>
                  <p className="text-xs">{authUser?.fullName}</p>
                  <p className="text-xs text-green-600 flex items-center gap-1">
                    <span className="size-2 rounded-full bg-green-700 inline-block" />
                    Online
                  </p>
                </div>
              </div>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
};

export default Sidebar;
