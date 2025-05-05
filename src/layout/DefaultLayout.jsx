import { Outlet } from "react-router-dom";

// Components
import Navbar from "../components/Navbar";

export default function DefaultLayout() {
  return (
    <div className="wrapper d-flex flex-column min-vh-100">
      <header>
        <Navbar />
      </header>

      <main className="flex-grow-1 mt-4">
        <Outlet />
      </main>

      <footer className="mt-auto">
        <div className="text-center py-3 bg-primary text-light">
          <p className="mb-0">© 2025 CELXPERT. Tutti i diritti riservati.</p>
          <p className="mb-0">Realizzato da [Carlo Elvisi]</p>
        </div>
      </footer>
    </div>
  );
}
