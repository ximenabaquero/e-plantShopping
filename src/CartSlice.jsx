import { createSlice } from "@reduxjs/toolkit";

const initialState = { items: [] };

export const CartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action) => {
      const p = action.payload;
      const id = p.id ?? p.name;
      const existing = state.items.find((i) => i.id === id || i.name === id);
      if (existing) {
        existing.qty = (existing.qty ?? existing.quantity ?? 0) + (p.qty ?? 1);
        existing.quantity = existing.qty;
      } else {
        state.items.push({
          id,
          name: p.name,
          image: p.image ?? "",
          cost: p.cost ?? "$0",
          qty: p.qty ?? 1,
          quantity: p.qty ?? 1,
        });
      }
    },

    removeItem: (state, action) => {
      state.items = state.items.filter((item) => item.name !== action.payload);
    },

    updateQuantity: (state, action) => {
      const { name, quantity } = action.payload; // Destructure product name and new quantity
      const itemToUpdate = state.items.find((item) => item.name === name);
      if (itemToUpdate) {
        itemToUpdate.quantity = quantity; // Actualiza quantity
        itemToUpdate.qty = quantity; // Mantener compatibilidad con `qty` si se usa en otras partes
      }
    },

    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const { addItem, removeItem, updateQuantity, clearCart } = CartSlice.actions;
export default CartSlice.reducer;

