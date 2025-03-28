
import React from "react";
import { Link } from "react-router-dom";

export const Logo = () => {
  return (
    <div className="flex-shrink-0 mr-4">
      <Link to="/" className="flex items-center space-x-1.5 text-xl">
        <img 
          src="/lovable-uploads/8a55e27c-a460-46a6-9f26-dd32ef3512ff.png" 
          alt="Book of Scams Logo" 
          className="h-6 w-6"
          style={{ objectFit: "contain" }}
        />
        <span className="font-wanted text-western-parchment"></span>
      </Link>
    </div>
  );
};

export default Logo;
