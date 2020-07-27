import React from "react";
import { Link } from "react-router-dom";
const BackHome = () => {
  return (
    <Link to="/" className="flex-center">
      <button>back home</button>
    </Link>
  );
};
export default BackHome;
