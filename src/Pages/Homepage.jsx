import React, { useState } from "react";
import { useGlobalContext } from "../context/GlobalContext";

export default function HomePage() {
  const [search, setSearch] = useState("");
  const { productsList } = useGlobalContext();

  return (
    <>
      <div className="container mt-5">
        <h1 className="text-center">CELXPERT</h1>
        <p className="text-center">Tutto quello che pensi, noi l'abbiamo!</p>

        <div className="row justify-content-center mt-4">
          <div className="col-md-6">
            <input
              type="text"
              className="form-control"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="container mt-5">
        <h2 className="text-center">Prodotti in evidenza</h2>
        <div className="row mt-4">
          {productsList.map((product) => (
            <div className="col-md-4 mb-4" key={product.id}>
              <div className="card shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">{product.title}</h5>
                  <h5 className="card-title">{product.category}</h5>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
