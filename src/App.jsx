import { BrowserRouter, Route, Routes } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

// Global variables

import { GlobalProvider } from "./context/GlobalContext";

// Default Layout
import DefaultLayout from "./layout/DefaultLayout";


// Pages
import HomePage from "./Pages/Homepage";
import DetailPage from "./Pages/DetailPage";


function App() {
  return (
    <>
      <GlobalProvider>
        <BrowserRouter>
          <Routes>
            <Route Component={DefaultLayout}>
              <Route index element={<HomePage />}></Route>
              <Route path="/product/:id" element={<DetailPage />} />
              <Route path="*" element={""}></Route>
            </Route>
          </Routes>
        </BrowserRouter>
        </GlobalProvider>
      
    </>
  );
}

export default App;
