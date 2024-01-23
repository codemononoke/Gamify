import React from "react";
import { Spinner } from "@material-tailwind/react";

const Loader = () => {
  return (
    <div className="w-full h-[calc(100vh-83.0667px)] flex items-center justify-center">
      <Spinner className="h-16 w-16 text-gray-900/50" />
    </div>
  );
};

export default Loader;
