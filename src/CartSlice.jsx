import { createSlice } from "@reduxjs/toolkit";

export const CartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [], // cada ítem será { id, name, image, description, cost, qty }
  },
  reducers: {
    addItem: (state, action) => {
      const plant = action.payload;
      const existing = state.items.find((item) => item.id === plant.id);
      if (existing) {
        existing.qty += 1; // si ya existe, aumenta cantidad
      } else {
        state.items.push({ ...plant, qty: 1 }); // si no existe, lo agrega con qty=1
      }
    },
    removeItem: (state, action) => {
      const id = action.payload;
      state.items = state.items.filter((item) => item.id !== id);
    },
    updateQuantity: (state, action) => {
      const { id, qty } = action.payload;
      const item = state.items.find((i) => i.id === id);
      if (item) {
        item.qty = qty;
      }
    },
    clearCart: (state) => {
      state.items = [];
    }
  },
});

// Exporta las acciones
export const { addItem, removeItem, updateQuantity, clearCart } = CartSlice.actions;

// Exporta el reducer
export default CartSlice.reducer;

