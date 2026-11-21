import React from 'react';
import { useDispatch } from 'react-redux';
import { addItem } from '../redux/cartSlice';
import { showToast, hideToast } from '../redux/uiSlice';

const PRODUCTS = [
  { id: 1, name: 'Ecran UltraWide 4K 34"', price: 850, category: 'Affichage' },
  { id: 2, name: 'Clavier Mecanique RGB', price: 180, category: 'Peripherique' },
  { id: 3, name: 'Souris Sans Fil Ergonomique', price: 95, category: 'Accessoire' },
  { id: 4, name: 'Casque Haute Fidelite ANC', price: 320, category: 'Audio' }
];

export default function ProductList() {
  const dispatch = useDispatch();
  return (
    <div className="product-grid">
      {PRODUCTS.map((product) => (
        <div key={product.id} className="product-card">
          <h4>{product.name}</h4>
          <span>{product.price} DT</span>
          <button onClick={() => {
            dispatch(addItem(product));
            dispatch(showToast('Produit ajouté au panier!'));
            setTimeout(() => {
                  dispatch(hideToast());
                }, 3000);
          }}>
            + Ajouter
          </button>
        </div>
      ))}
    </div>
  );
}