import React from "react";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../context/GlobalContext";

export default function Navbar() {
  const { favorites } = useGlobalContext(); // ✅ Usato correttamente dentro il componente

  return (
    <nav className="z-3 navbar navbar-expand-lg bg-primary  w-100">
      <div className="container-fluid d-flex justify-content-between align-items-center">
        {/* Logo */}
        <Link className="fs-2 fw-semibold text-light" to="/">
          <i className="fa-brands fa-airbnb"></i> CELXPERT
        </Link>

        {/* Link ai Preferiti */}
        <Link to="/preferiti" className="btn btn-danger">
          Vai ai Preferiti ({favorites.length})
        </Link>
      </div>
    </nav>
  );
}
