import React from "react";
import { Link } from "react-router-dom";
const Hero = () => {
  return (
    <div className="hero">
      <Link to="/">
        <h1>Ron Swanson</h1>
      </Link>
      <Link to="/ask">
        <button>ask me anything</button>
      </Link>
    </div>
  );
};
export default Hero;
