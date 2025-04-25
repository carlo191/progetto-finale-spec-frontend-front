import { createContext, useContext, useState, useEffect } from "react";

// Crea il contesto globale
const GlobalContext = createContext();

// Custom hook per usare il contesto
export const useGlobalContext = () => useContext(GlobalContext);

// GlobalProvider per fornire lo stato globale
export const GlobalProvider = ({ children }) => {
  const [productsList, setProductsList] = useState([]); // Stato per i prodotti

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

  return (
    <GlobalContext.Provider
      value={{
        productsList, // Esponiamo la lista dei prodotti
        setProductsList, // Esponiamo la funzione per aggiornare i prodotti
        indexProperty, // Esponiamo la funzione per ricaricare i prodotti
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
