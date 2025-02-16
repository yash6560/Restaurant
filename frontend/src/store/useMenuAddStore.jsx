import { create } from "zustand";
import { axiosInstance } from "../utils/axios";
import toast from "react-hot-toast";
import {useMenuSelectionStore} from './useMenuSelectionStore'

export const useMenuAddStore = create((set) => ({
    IsAddMenuItem : false,
    
    addMenuItems : async(data) => {
        set({IsAddMenuItem : true});
        
        try {
            const res = await axiosInstance.post('/food/add-food', data, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            toast.success(res.data.message)
            useMenuSelectionStore.getState().displayFood();

        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to add Menu data");
            console.log(error);
        } finally {
            set({IsAddMenuItem : false });
        }

    },

    removeMenuItems : async(itemId) => {
        try {
            const res = await axiosInstance.post('/food/remove-food', {Id : itemId});
            toast.success(res.data.message);
            useMenuSelectionStore.getState().displayFood();

        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to remove Menu data");
            console.log(error);
        }
    },

    editMenuItems : async(id, data) => {
        try {
            const res = await axiosInstance.put(`/food/edit-menu/${id}`, data, {
                headers: { "Content-Type": "multipart/form-data" },
            })
            toast.success(res.data.message)
            useMenuSelectionStore.getState().displayFood();

        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to Edit Menu data");
            console.log(error);
        }
    }
}))
