import { useState } from "react";
import { useSelector } from "react-redux";
import ProductList from "./components/ProductList.jsx";
import CartItem from "./components/CartItem.jsx";
import AboutUs from "./components/AboutUs.jsx";

export default function App() {
  const [page, setPage] = useState("home");
  const cartItems = useSelector((state) => state.cart.items);
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="app-shell">
      <header className="topbar">
        <button className="brand" onClick={() => setPage("home")} aria-label="Go to home">
          <span className="brand-mark">❧</span>
          <span>Paradise Nursery</span>
        </button>
        <nav className="navigation" aria-label="Main navigation">
          <button onClick={() => setPage("home")}>Home</button>
          <button onClick={() => setPage("about")}>About Us</button>
          <button className="cart-nav" onClick={() => setPage("cart")}>
            🛒 Cart <span className="cart-count">{cartCount}</span>
          </button>
        </nav>
      </header>

      {page === "home" && (
        <main className="hero">
          <div className="hero-overlay">
            <p className="eyebrow">BRING NATURE HOME</p>
            <h1>Find your little piece of paradise.</h1>
            <p className="hero-copy">
              Thoughtfully selected houseplants to make your space feel fresher,
              calmer, and more alive.
            </p>
            <button className="primary-button" onClick={() => setPage("products")}>
              Get Started <span aria-hidden="true">→</span>
            </button>
            <button className="text-button light-text" onClick={() => setPage("about")}>
              Learn about us
            </button>
          </div>
          <div className="hero-note">
            <span>01</span>
            <span>GROW SOMETHING GOOD</span>
          </div>
        </main>
      )}

      {page === "about" && <AboutUs onShop={() => setPage("products")} />}
      {page === "products" && <ProductList onViewCart={() => setPage("cart")} />}
      {page === "cart" && <CartItem onContinueShopping={() => setPage("products")} />}

      <footer className="footer">
        <span>Paradise Nursery</span>
        <span>Small plants. Big difference.</span>
      </footer>
    </div>
  );
}