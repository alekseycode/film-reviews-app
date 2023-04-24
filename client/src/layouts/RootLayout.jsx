import { Outlet } from "react-router-dom";
import { Navigation } from "../components/Navigation";
import { Title } from "../components/Title";
import "../stylesheets/rootLayout.css";
import Footer from "../components/Footer";

const RootLayout = () => {
  return (
    <div className="root-layout">
      <header>
        <Title />
        <Navigation />
      </header>
      <main>
        <Outlet />
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default RootLayout;
