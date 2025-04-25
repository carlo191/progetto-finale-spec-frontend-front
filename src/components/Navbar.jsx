import React from "react";

import { Link, NavLink } from "react-router-dom";

export default function Navbar() {
  

  return (
    <nav className="z-3 navbar navbar-expand-lg bg-primary position-fixed w-100">
      <div className="container-fluid">
        {/* Logo */}
        <Link className="fs-2 fw-semibold pe-4 text-light" to="/">
          <i className="fa-brands fa-airbnb"></i> CELXPERT
        </Link>
        
      </div>
    </nav>
  );
}
