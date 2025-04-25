import { BrowserRouter, Route, Routes } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

// Global variables

// Default Layout
import DefaultLayout from "./layout/DefaultLayout";


// Pages
import HomePage from "./Pages/Homepage";
import { GlobalProvider } from "./context/GlobalContext";

function App() {
  return (
    <>
      <GlobalProvider>
        <BrowserRouter>
          <Routes>
            <Route Component={DefaultLayout}>
              <Route index element={<HomePage />}></Route>

              <Route path="*" element={""}></Route>
            </Route>
          </Routes>
        </BrowserRouter>
        </GlobalProvider>
      
    </>
  );
}

export default App;
