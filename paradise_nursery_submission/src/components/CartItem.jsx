import { useDispatch, useSelector } from "react-redux";
import { removeItem, updateQuantity } from "../redux/CartSlice.jsx";

export default function CartItem({ onContinueShopping }) {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.cart.items);
  const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <main className="page-wrap">
      <div className="page-heading">
        <div>
          <p className="eyebrow" style={{ color: "#64855d" }}>YOUR SELECTION</p>
          <h1>Shopping Cart</h1>
          <p className="muted">{totalQuantity} {totalQuantity === 1 ? "plant" : "plants"} in your cart</p>
        </div>
        <button className="text-button" onClick={onContinueShopping}>← Continue shopping</button>
      </div>

      {items.length === 0 ? (
        <div className="cart-list empty-cart">
          <h2>Your cart is waiting for a little green.</h2>
          <p className="muted">Browse the collection and add a plant you love.</p>
          <button className="primary-button" onClick={onContinueShopping}>Browse plants</button>
        </div>
      ) : (
        <div className="cart-layout">
          <section className="cart-list" aria-label="Items in shopping cart">
            {items.map((item) => (
              <article className="cart-row" key={item.id}>
                <img src={item.image} alt={item.name} />
                <div>
                  <h3>{item.name}</h3>
                  <p>${item.price.toFixed(2)} each</p>
                  <div className="quantity-controls" aria-label={`Quantity for ${item.name}`}>
                    <button onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }))} aria-label={`Decrease ${item.name} quantity`}>−</button>
                    <strong>{item.quantity}</strong>
                    <button onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }))} aria-label={`Increase ${item.name} quantity`}>+</button>
                  </div>
                  <button className="remove-button" onClick={() => dispatch(removeItem(item.id))}>Remove</button>
                </div>
                <div><strong>${(item.price * item.quantity).toFixed(2)}</strong></div>
              </article>
            ))}
          </section>

          <aside className="summary-card">
            <h2>Order summary</h2>
            <div className="summary-line"><span>Items ({totalQuantity})</span><span>${subtotal.toFixed(2)}</span></div>
            <div className="summary-line"><span>Delivery</span><span>Calculated later</span></div>
            <div className="summary-line summary-total"><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
            <p className="muted" style={{ fontSize: 13 }}>Delivery and taxes, if applicable, are not included.</p>
            <button className="primary-button" style={{ width: "100%" }} onClick={() => window.alert("Thank you! Checkout is a demo for this student project.")}>Checkout</button>
          </aside>
        </div>
      )}
    </main>
  );
}