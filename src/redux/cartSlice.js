import { createSlice } from '@reduxjs/toolkit';

const savedItems = JSON.parse(localStorage.getItem('techstore_cart') || '[]');

const initialState = {
  items: savedItems,
  totalCount: savedItems.reduce((sum, item) => sum + item.quantity, 0),
  totalPrice: savedItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
  discountPercent: 0
};

const recalculateTotals = (state) => {
  state.totalCount = state.items.reduce((sum, item) => sum + item.quantity, 0);
  state.totalPrice = state.items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  localStorage.setItem('techstore_cart', JSON.stringify(state.items));
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action) => {
      const existing = state.items.find((item) => item.id === action.payload.id);
      if (existing) {
        // Immer converts direct mutation into an immutable snapshot
        existing.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
      recalculateTotals(state);
    },
    removeItem: (state, action) => {
      const existing = state.items.find((item) => item.id === action.payload);
      if (existing) {
        if (existing.quantity > 1) {
          existing.quantity -= 1;
        } else {
          state.items = state.items.filter((item) => item.id !== action.payload);
        }
      }
      recalculateTotals(state);
    },
    clearCart: (state) => {
      state.items = [];
      state.totalCount = 0;
      state.totalPrice = 0;
      state.discountPercent = 0;
      
      localStorage.removeItem('techstore_cart');

    },
    setDiscount: (state, action) => {
      const percent = Number(action.payload);
      state.discountPercent = Number.isFinite(percent)
        ? Math.min(Math.max(percent, 0), 100)
        : 0;
    }
  }
});

export const { addItem, removeItem, clearCart, setDiscount } = cartSlice.actions;
export default cartSlice.reducer;
