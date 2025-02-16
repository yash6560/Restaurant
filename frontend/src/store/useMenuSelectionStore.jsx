import { create } from "zustand";
import { menu_list } from "../assets/assets";
import { axiosInstance } from "../utils/axios";
import toast from "react-hot-toast";

export const useMenuSelectionStore = create((set) => ({
  foodDisplay: [],
  cartItems: {},
  category: "All",
  menuItems: [],
  fetchingFood: false,
  fetchingcart: false,

  displayFood: async () => {
    set({ fetchingFood: true });
    try {
      const res = await axiosInstance.get("/food/food-list");
      set({ foodDisplay: res.data });
    } catch (error) {
      console.log(error);
    } finally {
      set({ fetchingFood: false });
    }
  },

  menuListe: async () => {
    set({ menuItems: menu_list });
  },

  chooseCategory: (name) => {
    set({ category: name });
  },

  fetchCartData: async () => {
    set({ fetchingcart: true });
    try {
      const res = await axiosInstance.get('/cart/data');
      set({ cartItems: res.data.cart });
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch cart data");
      console.log(error);
    } finally {
      set({ fetchingcart: false });
    }
  },

  addToCart: async (items) => {
    set({fetchingcart : true});
    try {
      const res = await axiosInstance.post("/cart/add", { items: [items] });
      toast.success("item add in cart");
      set({ cartItems: res.data.cart.items });
      set({fetchingcart : false});
      
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
      set({fetchingcart : false});
    }
  },

  increaseCartItem : async (itemId) => {
    const id = itemId
    try {
      const res = await axiosInstance.put(`/cart/add/${id}`)
      set({ cartItems: res.data.cart.items });
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
    }
  },

  decreseCartItem: async (itemId) => {
    const id = itemId
    try {
      const res = await axiosInstance.put(`/cart/minus/${id}`)
      set({ cartItems: res.data.cart.items });
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
    }
  },

  removeFromCart : async(itemId) => {
    const id = itemId
    try {
      const res = await axiosInstance.put(`/cart/remove/${id}`)
      set({ cartItems: res.data.cart.items });
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
    }
  },

  clearCart: async () => {

    try {
      const res = await axiosInstance.delete('/cart/delete')
      if(res.data.success){
        set({ cartItems: {} });
      }

    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
    }
  } 
    
}));
