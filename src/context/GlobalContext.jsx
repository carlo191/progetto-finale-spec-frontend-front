import { createContext, useContext, useState, useEffect } from "react";

// Crea il contesto globale
const GlobalContext = createContext();

// Custom hook per usare il contesto
export const useGlobalContext = () => useContext(GlobalContext);

// GlobalProvider per fornire lo stato globale
export const GlobalProvider = ({ children }) => {
  const [productsList, setProductsList] = useState([]); // Stato per i prodotti
  const [product, setProduct] = useState({
    id: 0,
    title: "",
    description: "",
    price: 0,
    category: "",
    image: "",
    rating: 0,
    brand: "",
    inStock: false,
  });

  // Funzione per caricare i prodotti
  const indexProperty = () => {
    fetch(`http://localhost:3001/products`)
      .then((res) => res.json())
      .then((res) => {
        setProductsList(res);
      })
      .catch((error) => {
        console.error("Errore nel recupero dei prodotti:", error); // Gestione degli errori
      });
  };

  // Quando il componente si monta, eseguiamo la funzione per caricare i prodotti
  useEffect(() => {
    indexProperty();
  }, []);

  const showProduct = (id) => {
    fetch(`http://localhost:3001/products/${id}`)
      .then((res) => res.json())
      .then((res) => {
        setProduct(res.product);
      })
      .catch((error) => {
        console.error("Errore nel recupero del prodotto:", error);
      });
  };

  // Inizializza i preferiti leggendo dal localStorage
  const [favorites, setFavorites] = useState(() => {
    const stored = localStorage.getItem("favorites");
    return stored ? JSON.parse(stored) : [];
  });

  // Salva i preferiti nel localStorage ogni volta che cambiano
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (product) => {
    setFavorites((prev) => {
      const isFavorite = prev.find((p) => p.id === product.id);
      if (isFavorite) {
        return prev.filter((p) => p.id !== product.id);
      } else {
        return [...prev, product];
      }
    });
  };

  return (
    <GlobalContext.Provider
      value={{
        productsList, // Esponiamo la lista dei prodotti
        setProductsList, // Esponiamo la funzione per aggiornare i prodotti
        indexProperty, // Esponiamo la funzione per ricaricare i prodotti
        product, // Esponiamo la proprietà selezionata
        setProduct, // Esponiamo la funzione per aggiornare la proprietà
        showProduct, // Esponiamo la funzione per mostrare i dettagli della proprietà
        favorites, // Esponiamo la lista dei preferiti
        setFavorites, // Esponiamo la funzione per aggiornare i preferiti
        toggleFavorite, // Esponiamo la funzione per aggiungere/rimuovere dai preferiti
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
