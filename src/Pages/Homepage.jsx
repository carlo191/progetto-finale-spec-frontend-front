import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../context/GlobalContext";
import ProductCard from "../components/ProductCard";

export default function HomePage() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sortOption, setSortOption] = useState("");
  const [comparisonList, setComparisonList] = useState([]);
  const { favorites, toggleFavorite, productsList } = useGlobalContext();
  const navigate = useNavigate();

  // Inizializzo uno stato per salvare se un cuore è acceso o spento per ogni prodotto
  // È un oggetto dove la chiave è l'ID del prodotto e il valore è true (acceso) o false (spento)
  const [favoriteStatus, setFavoriteStatus] = useState({});

  // Funzione che cambia lo stato del cuore per un prodotto
  // Se il cuore era acceso, lo spegne; se era spento, lo accende
  const toggleFavoriteColor = (productId) => {
    setFavoriteStatus((prev) => ({
      // Mantengo tutti gli stati dei cuori precedenti
      ...prev,
      // Cambio solo quello del prodotto cliccato: true diventa false, false diventa true
      [productId]: !prev[productId],
    }));
  };

  const goToDetail = (id) => {
    navigate(`/product/${id}`);
  };

  const toggleCompareProduct = (product) => {
    // Aggiorna lo stato della lista di confronto basandosi sul valore precedente
    setComparisonList((prev) => {
      // 1. Se il prodotto è già presente in confronto (id uguale)
      if (prev.find((p) => p.id === product.id)) {
        // → lo rimuovo filtrando l’array, escludendo l’ID corrispondente
        return prev.filter((p) => p.id !== product.id);

        // 2. Altrimenti, se nella lista ci sono meno di 2 prodotti
      } else if (prev.length < 2) {
        // → aggiungo il nuovo prodotto, espandendo l’array esistente
        return [...prev, product];

        // 3. Se ci sono già 2 prodotti e tento di aggiungerne un altro
      } else {
        // → non modifico nulla, restituisco lo stato precedente
        return prev;
      }
    });
  };

  // Memoizzo l'elenco dei prodotti filtrati e ordinati
  const filteredProducts = useMemo(() => {
    // 1. Filtro i prodotti in base alla ricerca e alla categoria selezionata
    const filtered = productsList.filter((product) => {
      // Controllo se il titolo del prodotto include il testo della ricerca (case-insensitive)
      const matchesSearch = product.title
        .toLowerCase()
        .includes(search.toLowerCase());

      // Controllo se la categoria del prodotto corrisponde a quella selezionata
      const matchesCategory = selectedCategory
        ? product.category === selectedCategory
        : true; // Se nessuna categoria è selezionata, passo tutti

      return matchesSearch && matchesCategory;
    });

    // 2. Ordino i prodotti filtrati in base all'opzione di ordinamento selezionata
    const sorted = filtered.sort((a, b) => {
      // Ordinamento alfabetico crescente per titolo
      if (sortOption === "title-asc") return a.title.localeCompare(b.title);

      // Ordinamento alfabetico decrescente per titolo
      if (sortOption === "title-desc") return b.title.localeCompare(a.title);

      // Ordinamento alfabetico crescente per categoria
      if (sortOption === "category-asc")
        return a.category.localeCompare(b.category);

      // Ordinamento alfabetico decrescente per categoria
      if (sortOption === "category-desc")
        return b.category.localeCompare(a.category);

      // Nessun ordinamento specifico: lascio l’ordine originale
      return 0;
    });

    // 3. Restituisco l’elenco filtrato e ordinato
    return sorted;

    // La memoizzazione viene rigenerata solo se cambia uno di questi valori
  }, [productsList, search, selectedCategory, sortOption]);

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
            <ProductCard
              key={product.id}
              product={product}
              isFavorite={favoriteStatus[product.id]}
              toggleFavorite={toggleFavorite}
              toggleFavoriteColor={toggleFavoriteColor}
              goToDetail={goToDetail}
              toggleCompareProduct={toggleCompareProduct}
              isInComparison={comparisonList.some((p) => p.id === product.id)}
              disableCheckbox={
                !comparisonList.some((p) => p.id === product.id) && comparisonList.length >= 2
              }
            />
          ))}
        </div>

        {comparisonList.length === 2 && (
          <div className="mt-5 mb-5">
            <h3 className="text-center">Confronto prodotti</h3>
            <div className="row">
              {comparisonList.map((product) => (
                <div className="col-md-6" key={product.id}>
                  <div className="card border shadow-sm">
                    <div className="row g-0">
                      <div className="col-md-8">
                        <div className="card-body">
                          <h5 className="card-title">{product.title}</h5>
                          <p><strong>Categoria:</strong> {product.category}</p>
                          <p><strong>Prezzo:</strong> €{product.price}</p>
                          <p><strong>Brand:</strong> {product.brand}</p>
                          <p><strong>Disponibile:</strong> {product.inStock ? "Sì" : "No"}</p>
                          <p><strong>Voto:</strong> {product.rating}</p>
                          {/* Cuore dei preferiti */}
                          <button
                            id="btn-favorite-homePage"
                            onClick={() => {
                              toggleFavorite(product);
                              toggleFavoriteColor(product.id);
                            }}
                            aria-label="Aggiungi ai preferiti"
                            style={{
                              background: "none",
                              border: "none",
                              padding: 0,
                              cursor: "pointer",
                            }}
                          >
                            <span
                              style={{
                                color: favoriteStatus[product.id]
                                  ? "red"
                                  : "gray",
                                fontSize: "2.5rem",
                                transition: "color 0.3s",
                                lineHeight: 1,
                                top: "5px",
                                position: "absolute",
                                right: "1px",
                              }}
                            >
                              {favoriteStatus[product.id] ? "♥" : "♡"}
                            </span>
                          </button>
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
