import React, { useState } from "react";
import { useGlobalContext } from "../context/GlobalContext";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sortOption, setSortOption] = useState("");

  const { productsList } = useGlobalContext();
  const navigate = useNavigate();

  const goToDetail = (id) => {
    navigate(`/product/${id}`);
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
      if (sortOption === "title-asc") {
        return a.title.localeCompare(b.title);
      }
      if (sortOption === "title-desc") {
        return b.title.localeCompare(a.title);
      }
      if (sortOption === "category-asc") {
        return a.category.localeCompare(b.category);
      }
      if (sortOption === "category-desc") {
        return b.category.localeCompare(a.category);
      }
      return 0; // Se non è selezionato nessun ordinamento, lasciali così come sono
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
                aria-label="Cerca un prodotto"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            {/* Categoria checkboxes */}
            <div className="mt-3">
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value="Smartphone"
                  id="smartphone"
                  checked={selectedCategory === "Smartphone"}
                  onChange={(e) =>
                    setSelectedCategory(
                      selectedCategory === "Smartphone" ? "" : "Smartphone"
                    )
                  }
                />
                <label className="form-check-label" htmlFor="smartphone">
                  Smartphone
                </label>
              </div>

              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value="Games"
                  id="games"
                  checked={selectedCategory === "Games"}
                  onChange={(e) =>
                    setSelectedCategory(
                      selectedCategory === "Games" ? "" : "Games"
                    )
                  }
                />
                <label className="form-check-label" htmlFor="tablet">
                  Games
                </label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value="Laptop"
                  id="laptop"
                  checked={selectedCategory === "Laptop"}
                  onChange={(e) =>
                    setSelectedCategory(
                      selectedCategory === "Laptop" ? "" : "Laptop"
                    )
                  }
                />
                <label className="form-check-label" htmlFor="tablet">
                  Laptop
                </label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value="Games"
                  id="games"
                  checked={selectedCategory === "Games"}
                  onChange={(e) =>
                    setSelectedCategory(
                      selectedCategory === "Games" ? "" : "Games"
                    )
                  }
                />
                <label className="form-check-label" htmlFor="tablet">
                  Games
                </label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value="TV"
                  id="tv"
                  checked={selectedCategory === "TV"}
                  onChange={(e) =>
                    setSelectedCategory(selectedCategory === "TV" ? "" : "TV")
                  }
                />
                <label className="form-check-label" htmlFor="tablet">
                  TV
                </label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value="HeadPhones"
                  id="headphones"
                  checked={selectedCategory === "HeadPhones"}
                  onChange={(e) =>
                    setSelectedCategory(
                      selectedCategory === "HeadPhones" ? "" : "HeadPhones"
                    )
                  }
                />
                <label className="form-check-label" htmlFor="tablet">
                  HeadPhones
                </label>
              </div>
              <div className="mt-3">
                <select
                  className="form-select"
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value)}
                >
                  <option value="">Ordina per...</option>
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
