import React from "react";

function ProductCard({
  product,
  isFavorite,
  toggleFavorite,
  toggleFavoriteColor,
  goToDetail,
  toggleCompareProduct,
  isInComparison,
  disableCheckbox,
}) {
  return (
    <div className="col-md-4 mb-4">
      <div className="card shadow-sm">
        <div className="card-body position-relative">
          <h5 className="card-title">{product.title}</h5>
          <h6 className="card-subtitle mb-2 text-muted">{product.category}</h6>

          {/* Cuore */}
          <button
           
            onClick={() => {
              toggleFavorite(product);
              toggleFavoriteColor(product.id);
            }}
            style={{
              background: "none",
              border: "none",
              padding: 0,
              cursor: "pointer",
                position: "absolute",
                top: "-4%",
                right: "2px",
            }}
          >
            <span
              style={{
                color: isFavorite ? "red" : "gray",
                fontSize: "2.5rem",
                transition: "color 0.3s",
                lineHeight: 1,
              }}
            >
              {isFavorite ? "♥" : "♡"}
            </span>
          </button>

          <button
            className="btn btn-primary btn-sm mt-4"
            onClick={() => goToDetail(product.id)}
          >
            Vedi dettagli
          </button>

          <div className="form-check mt-2">
            <input
              className="form-check-input"
              type="checkbox"
              checked={isInComparison}
              onChange={() => toggleCompareProduct(product)}
              disabled={disableCheckbox}
              id={`compare-${product.id}`}
            />
            <label
              className="form-check-label"
              htmlFor={`compare-${product.id}`}
            >
              Confronta
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}

// ✅ Memoizzazione per evitare render inutili
export default React.memo(ProductCard);
// ✅ React.memo() è una funzione di ordine superiore che memoizza un componente funzionale. Se le props non cambiano, il componente non viene ri-renderizzato. Questo è utile per ottimizzare le prestazioni dei componenti che ricevono props complesse o costose da calcolare.
// ✅ In questo caso, il componente ProductCard viene memoizzato per evitare render inutili quando le props non cambiano. Questo è particolarmente utile quando il componente viene utilizzato in un ciclo di rendering, come in una lista di prodotti. La memoizzazione aiuta a migliorare le prestazioni e a ridurre il carico sulla CPU, specialmente in applicazioni con molti componenti o dati complessi.
