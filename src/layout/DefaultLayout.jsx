import { Outlet } from "react-router-dom";

// Components
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function DefaultLayout() {
  return (
    <>
      <div className="wrapper d-flex flex-column">
        <header>
          <Navbar />
        </header>

        <main className="flex-grow-1 mt-4 mb-5">
          <Outlet />
        </main>

        <footer>
          <Footer />
        </footer>
      </div>
    </>
  );
}
