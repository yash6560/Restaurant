import { create } from "zustand";
import { axiosInstance } from "../utils/axios";
import toast from "react-hot-toast";
import {useMenuSelectionStore} from './useMenuSelectionStore'
import { io } from 'socket.io-client';

const socket = io("http://localhost:5001");

export const useOrderStore = create((set) =>({
    orderList : [],
    isOrderPlace : false,
    isOrderFetch : false,
    orderStatus: "pending",
    orderId: null,

    PlaceOrder : async (data) => {
        set({isOrderPlace:true});
        try {
            const res = await axiosInstance.post('/order/place', data);
            if(res.data.success){
                useMenuSelectionStore.getState().clearCart();
                const {success_url, orderId  } = res.data;
                set({ orderId });
                window.location.replace(success_url);
            }else{
                toast.error("error in payment");
            }
            
        } catch (error) {
            console.log(error);
            toast.error("failed to place order");
        } finally {
            set({isOrderPlace:false});
        }
    },

    getAllOrders : async () => {  // Added 'async'
        set({ isOrderFetch: true });
        try {
            const res = await axiosInstance.post('/order/all');  // Added 'await'
            if(res.data.success){
                set({ orderList: res.data.orderlist });  // Accessing orders properly
            }
        } catch (error) {
            console.log("Error fetching orders:", error);
        } finally {
            set({ isOrderFetch: false });
        }
    },

    listenForOrderUpdate : (orderId) => {

        if (!orderId) {
            console.warn("No orderId provided for real-time updates.");
            return;
        }

        socket.off(`order_status_${orderId}`);
        
        socket.on(`order_status_${orderId}`, (data) => {
            console.log("here")
            console.log("status", data)
            console.log("Order Status Updated:", data);
            set({ orderStatus: data.status });
        })
    }
}))