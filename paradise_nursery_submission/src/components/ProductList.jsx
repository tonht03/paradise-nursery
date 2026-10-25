import { useDispatch, useSelector } from "react-redux";
import { addItem } from "../redux/CartSlice.jsx";

const products = [
  { id: 1, name: "Snake Plant", category: "Easy Care", price: 18, description: "A hardy plant that suits bright or low-light rooms.", image: "https://images.unsplash.com/photo-1593482892290-f54927ae2b41?auto=format&fit=crop&w=700&q=80" },
  { id: 2, name: "Monstera", category: "Statement Plants", price: 32, description: "Beautiful split leaves that bring a tropical feel.", image: "https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&w=700&q=80" },
  { id: 3, name: "Golden Pothos", category: "Easy Care", price: 16, description: "Trailing green leaves for shelves and hanging pots.", image: "https://images.unsplash.com/photo-1616690247656-4c4b4c5f0a2c?auto=format&fit=crop&w=700&q=80" },
  { id: 4, name: "Peace Lily", category: "Flowering Plants", price: 24, description: "Elegant dark leaves with graceful white blooms.", image: "https://images.unsplash.com/photo-1593691500743-c0e7d9d3b7d8?auto=format&fit=crop&w=700&q=80" },
  { id: 5, name: "Rubber Plant", category: "Statement Plants", price: 28, description: "Glossy leaves make this a striking indoor feature.", image: "https://images.unsplash.com/photo-1509423350716-97f9360b4e09?auto=format&fit=crop&w=700&q=80" },
  { id: 6, name: "Aloe Vera", category: "Easy Care", price: 14, description: "A sculptural succulent that prefers bright light.", image: "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=700&q=80" },
  { id: 7, name: "Calathea", category: "Leafy Favorites", price: 26, description: "Patterned foliage adds texture to your plant corner.", image: "https://images.unsplash.com/photo-1509423350716-97f9360b4e09?auto=format&fit=crop&w=700&q=80" },
  { id: 8, name: "ZZ Plant", category: "Easy Care", price: 21, description: "A low-maintenance choice with shiny green leaves.", image: "https://images.unsplash.com/photo-1593482892290-f54927ae2b41?auto=format&fit=crop&w=700&q=80" },
  { id: 9, name: "Bird of Paradise", category: "Statement Plants", price: 45, description: "Large upright leaves for a bold, tropical look.", image: "https://images.unsplash.com/photo-1545241047-6083a3684587?auto=format&fit=crop&w=700&q=80" }
];

const categories = [...new Set(products.map((product) => product.category))];

export default function ProductList({ onViewCart }) {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const quantityInCart = (id) => cartItems.find((item) => item.id === id)?.quantity || 0;

  return (
    <main className="page-wrap">
      <div className="page-heading">
        <div>
          <p className="eyebrow" style={{ color: "#64855d" }}>THE GREEN COLLECTION</p>
          <h1>Find your new favorite plant</h1>
          <p className="muted">Thoughtful picks for every corner of your home.</p>
        </div>
        <button className="small-button" onClick={onViewCart}>View cart ({cartItems.reduce((sum, item) => sum + item.quantity, 0)})</button>
      </div>

      {categories.map((category) => (
        <section key={category} aria-label={category}>
          <h2 className="category-title">{category}</h2>
          <div className="product-grid">
            {products.filter((product) => product.category === category).map((product) => {
              const quantity = quantityInCart(product.id);
              return (
                <article className="product-card" key={product.id}>
                  <img className="product-image" src={product.image} alt={product.name} loading="lazy" />
                  <div className="product-info">
                    <h3>{product.name}</h3>
                    <p>{product.description}</p>
                    <div className="product-bottom">
                      <span className="price">${product.price.toFixed(2)}</span>
                      <button
                        className="small-button"
                        onClick={() => dispatch(addItem(product))}
                        disabled={quantity > 0}
                        aria-label={`Add ${product.name} to cart`}
                      >
                        {quantity > 0 ? `Added (${quantity})` : "Add to cart"}
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      ))}
    </main>
  );
}