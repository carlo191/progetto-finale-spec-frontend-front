import React from "react";
import { useGlobalContext } from "../context/GlobalContext";
import { useNavigate } from "react-router-dom";

export default function PreferitiPage() {
  const { favorites, toggleFavorite } = useGlobalContext();
  const navigate = useNavigate();

  const goToDetail = (id) => {
    navigate(`/product/${id}`);
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center">I tuoi preferiti</h2>
      {favorites.length === 0 ? (
        <p className="text-center">Non hai ancora aggiunto prodotti ai preferiti.</p>
      ) : (
        <div className="row mt-4">
          {favorites.map((product) => (
            <div className="col-md-4 mb-4" key={product.id}>
              <div className="card shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">{product.title}</h5>
                  <h6 className="card-subtitle mb-2 text-muted">{product.category}</h6>
                  <p><strong>Prezzo:</strong> €{product.price}</p>
                  <button
                    className="btn btn-outline-danger btn-sm me-2"
                    onClick={() => toggleFavorite(product)}
                  >
                    Rimuovi dai preferiti
                  </button>
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() => goToDetail(product.id)}
                  >
                    Vedi dettagli
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
