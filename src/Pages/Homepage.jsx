import React, { useState } from "react";
import { useGlobalContext } from "../context/GlobalContext";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sortOption, setSortOption] = useState("");
  const [comparisonList, setComparisonList] = useState([]);
  const { favorites, toggleFavorite } = useGlobalContext();

  const { productsList } = useGlobalContext();
  const navigate = useNavigate();

  const goToDetail = (id) => {
    navigate(`/product/${id}`);
  };

  const toggleCompareProduct = (product) => {
    setComparisonList((prev) => {
      if (prev.find((p) => p.id === product.id)) {
        return prev.filter((p) => p.id !== product.id);
      } else if (prev.length < 2) {
        return [...prev, product];
      } else {
        return prev;
      }
    });
  };

  const filteredProducts = productsList
    .filter((product) => {
      const matchesSearch = product.title
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesCategory = selectedCategory
        ? product.category === selectedCategory
        : true;

      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      if (sortOption === "title-asc") return a.title.localeCompare(b.title);
      if (sortOption === "title-desc") return b.title.localeCompare(a.title);
      if (sortOption === "category-asc")
        return a.category.localeCompare(b.category);
      if (sortOption === "category-desc")
        return b.category.localeCompare(a.category);
      return 0;
    });

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
                placeholder="Cerca un prodotto..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <div className="mt-3">
              {["Smartphone", "Games", "Laptop", "TV", "HeadPhones"].map(
                (cat) => (
                  <div className="form-check form-check-inline" key={cat}>
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id={cat.toLowerCase()}
                      checked={selectedCategory === cat}
                      onChange={() =>
                        setSelectedCategory(selectedCategory === cat ? "" : cat)
                      }
                    />
                    <label
                      className="form-check-label"
                      htmlFor={cat.toLowerCase()}
                    >
                      {cat}
                    </label>
                  </div>
                )
              )}

              <div className="mt-3">
                <select
                  className="form-select"
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value)}
                >
                  <option value="" disabled>
                    Ordina per...
                  </option>
                  <option value="title-asc">Titolo A-Z</option>
                  <option value="title-desc">Titolo Z-A</option>
                  <option value="category-asc">Categoria A-Z</option>
                  <option value="category-desc">Categoria Z-A</option>
                </select>
              </div>
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
                  <h6 className="card-subtitle mb-2 text-muted">
                    {product.category}
                  </h6>
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() => goToDetail(product.id)}
                  >
                    Vedi dettagli
                  </button>
                  <button
                    className="btn btn-outline-danger btn-sm mt-2"
                    onClick={() => toggleFavorite(product)}
                  >
                    {favorites.some((p) => p.id === product.id)
                      ? "★ Rimuovi dai preferiti"
                      : "☆ Aggiungi ai preferiti"}
                  </button>

                  <div className="form-check mt-2">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id={`compare-${product.id}`}
                      checked={comparisonList.some((p) => p.id === product.id)}
                      onChange={() => toggleCompareProduct(product)}
                      disabled={
                        !comparisonList.some((p) => p.id === product.id) &&
                        comparisonList.length >= 2
                      }
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
          ))}
        </div>

        {comparisonList.length === 2 && (
          <div className="mt-5">
            <h3 className="text-center">Confronto prodotti</h3>
            <div className="row">
              {comparisonList.map((product) => (
                <div className="col-md-6" key={product.id}>
                  <div className="card border border-success shadow-sm">
                    <div className="row g-0">
                      <div className="col-md-8">
                        <div className="card-body">
                          <h5 className="card-title">{product.title}</h5>
                          <p>
                            <strong>Categoria:</strong> {product.category}
                          </p>
                          <p>
                            <strong>Prezzo:</strong> €{product.price}
                          </p>
                          <p>
                            <strong>Brand:</strong> {product.brand}
                          </p>
                          <p>
                            <strong>Disponibile:</strong>{" "}
                            {product.inStock ? "Sì" : "No"}
                          </p>
                          <p>
                            <strong>Voto:</strong> {product.rating}
                          </p>
                        </div>
                      </div>
                      <div className="col-md-4 d-flex align-items-center justify-content-center">
                        <img
                          src={`http://localhost:3001/img/${product.image}`}
                          alt={product.title}
                          className="img-fluid rounded"
                          style={{ maxHeight: "150px" }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
