import { CloudLightning } from "lucide-react";
import React from "react";
import { Link } from "react-router";

const AppLogo = () => {
  return (
    <Link to="/" className="flex items-center gap-1.5 sm:gap-2.5">
      <CloudLightning className="size-4 sm:size-7 md:size-9 text-primary" />
      <span className="text-md sm:text-xl md:text-3xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent tracking-wider">
        ThunderCoil
      </span>
    </Link>
  );
};

export default AppLogo;
