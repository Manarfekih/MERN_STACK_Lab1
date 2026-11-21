import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addItem, removeItem, clearCart, setDiscount } from '../redux/cartSlice';

export default function Cart() {
  const { items, totalCount, totalPrice, discountPercent } = useSelector(
    (state) => state.cart
  );

  const dispatch = useDispatch();
  const [promoCode, setPromoCode] = useState('');
  const [promoMessage, setPromoMessage] = useState('');

  const handleApplyPromo = () => {
    if (promoCode.trim().toUpperCase() === 'POLY2027') {
      dispatch(setDiscount(20));
      setPromoMessage('20% discount applied!');
    } else {
      dispatch(setDiscount(0));
      setPromoMessage('Invalid promo code.');
    }
  };

  const discountedPrice = totalPrice * (1 - discountPercent / 100);

  return (
    <div className="cart-card">
      <div className="cart-header">
        <h3>My Redux Cart</h3>
        {items.length > 0 && (
          <button className="btn-clear" onClick={() => dispatch(clearCart())}>Clear</button>
        )}
      </div>

      {items.length === 0 ? (
        <div className="cart-empty"><p>Your cart is currently empty.</p></div>
      ) : (
        <>
          {items.map((item) => (
            <div key={item.id} className="cart-row">
              <div className="cart-item-details">
                <span className="cart-item-name">{item.name}</span>
                <span className="cart-item-price">{item.price} DT × {item.quantity}</span>
              </div>
              <div className="cart-item-qty">
                <button className="btn-qty" onClick={() => dispatch(removeItem(item.id))}>−</button>
                {item.quantity}
                <button className="btn-qty" onClick={() => dispatch(addItem(item))}>+</button>
              </div>
            </div>
          ))}

          <div className="cart-total-box">
            <p className="total-row"><span>Total Items</span><strong>{totalCount}</strong></p>
            <p className="total-row"><span>Subtotal</span><strong>{totalPrice.toFixed(2)} DT</strong></p>
            {discountPercent > 0 && <p className="total-row discount-row"><span>Discount ({discountPercent}%)</span><strong>-{(totalPrice * discountPercent / 100).toFixed(2)} DT</strong></p>}
            <p className="total-row total-highlight"><span>Grand Total</span><strong className="total-amount">{discountedPrice.toFixed(2)} DT</strong></p>
          </div>

          <div className="promo-section">
            <input
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
              placeholder="Enter promo code"
            />
            <button onClick={handleApplyPromo}>Apply</button>
          </div>

          {promoMessage && <p>{promoMessage}</p>}

        </>
      )}
    </div>
  );
}
