import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useGlobalContext } from "../context/GlobalContext";

export default function DetailPage() {
  const { id } = useParams();
  const { product, showProduct } = useGlobalContext();
  const { favorites, toggleFavorite } = useGlobalContext();

  useEffect(() => {
    if (id) {
      showProduct(id);
    }
  }, [id]);

  // Verifica se i dati del prodotto sono stati recuperati
  if (!product || product.id === 0) {
    return <div>Caricamento...</div>; // Mostra il caricamento fino a quando il prodotto non è disponibile
  }

  return (
    <div className="container mt-5">
      <h1>{product.title}</h1>
      <img
        src={`http://localhost:3001/img/${product.image}`}
        alt={product.title}
        className="img-card mb-3"
      />
      <p>{product.description}</p>
      <p>
        <strong>Brand:</strong> {product.brand}
      </p>
      <p>
        <strong>Category:</strong> {product.category}
      </p>
      <p>
        <strong>Price:</strong> ${product.price}
      </p>
      <p>
        <strong>Rating:</strong> {product.rating}
      </p>
      <p>
        <strong>Disponibilità:</strong> {product.inStock ? "SI" : "NO"}
      </p>
      <button
        onClick={() => toggleFavorite(product)}
        id="btn-detailPage"
        className="btn btn-primary mb-3"
      >
        {favorites.some((p) => p.id === product.id)
          ? " Rimuovi dai preferiti ♥"
          : " Aggiungi ai preferiti ♡ "}
      </button>
    </div>
  );
}
