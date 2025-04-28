import React, { useState } from "react";
import { useGlobalContext } from "../context/GlobalContext";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const [search, setSearch] = useState("");
  const { productsList } = useGlobalContext();
  const navigate = useNavigate();

  const goToDetail = (id) => {
    navigate(`/product/${id}`);
  };
  // 👇 Filtro i prodotti
  const filteredProducts = productsList.filter((product) =>
    product.title.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <>
      <div className="container mt-5">
        <h1 className="text-center">CELXPERT</h1>
        <p className="text-center">Tutto quello che pensi, noi l'abbiamo!</p>

        <div className="row justify-content-center mt-4">
          <div className="col-md-6">
            <div className="input-group">
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
      </div>

      <div className="container mt-5">
        <h2 className="text-center">I nostri prodotti</h2>
        <div className="row mt-4">
          {filteredProducts.map((product) => (
            <div className="col-md-4 mb-4" key={product.id}>
              <div className="card shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">{product.title}</h5>
                  <h5 className="card-title">{product.category}</h5>
                  <button onClick={() => goToDetail(product.id)}>
                    Vedi dettagli
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
