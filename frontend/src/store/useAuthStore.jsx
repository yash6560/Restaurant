import { create } from 'zustand';
import {axiosInstance} from '../utils/axios';
import toast from 'react-hot-toast';


export const useAuthStore = create((set, get) => ({
    authUser : null,
    isSigningUp : false,
    isLoggingn : false,
    isForgotPassword : false,
    isOtpVerified : false,
    isEmailforOtp : null,
    isUpdatingProfile : false,

    isCheckedAuth : true,

    chechAuth : async() => {
        set({isCheckedAuth: true})
        try {
            const res = await axiosInstance.get('/user/check-auth')
            set({authUser : res.data});
            
        } catch (error) {
            toast.error(error.response.data.message);
            set({isCheckedAuth: false})
        } finally{
            set({isCheckedAuth: false})
        }
    },

    userLogin : async (data) => {
        set({isLoggingn : true});
        try {
            const res = await axiosInstance.post('/user/login', data);
            set({authUser : res.data});
            toast.success(res.data.message);
            return res.data;
            
        } catch (error) {
            toast.error(error.response.data.message);
            set({isSigningUp: false})
        } finally {
            set({isLoggingn : false});
        }
    },

    userSignup : async (data) => {
        set({isSigningUp: true})
        try {
            const res = await axiosInstance.post('/user/signup', data)
            toast.success(res.data.message);
            return res.data;
        } catch (error) {
            toast.error(error.response.data.message);
            set({isSigningUp: false})
        } finally{
            set({isSigningUp: false})
        }
    },

    forgotPassword : async (email) => {
        set({isForgotPassword: true})
        
        try {
          const res = await axiosInstance.post('/user/forgot-password', {email});  
          toast.success(res.data.message);
          set({isEmailforOtp : email})
          return res.data;
          
        } catch (error) {
            toast.error(error.response.data.message);
            set({isForgotPassword: false});
            
        } finally{
            set({isForgotPassword: false});
        }
    },

    verifyOtp : async (otp) => {
        set({isOtpVerified: true});
        const {isEmailforOtp} = get();
        try {
            const res = await axiosInstance.post('/user/verify', {otp, email : isEmailforOtp})
            toast.success(res.data.message);
            return res.data;
        } catch (error) {
            toast.error(error.response.data.message);
            set({isForgotPassword: false});
        } finally {
            set({isOtpVerified: false});
        }
    },

    resetPassword : async(newpassword) => {
        const {isEmailforOtp} = get();
        try {
            const res = await axiosInstance.post('/user/reset-password', {newpassword, email : isEmailforOtp})
            toast.success(res.data.message);
            return res.data;
        } catch (error) {
            toast.error(error.response.data.message);
            set({isForgotPassword: false});
        } finally {
            set({isEmailforOtp : null});
        }

    },

    userLogout : async() => {
        try {
            console.log("here");
            const res = await axiosInstance.post('/user/logout');
            set({authUser : null});
            toast.success(res.data.message);
            
            return res.data;
            
        } catch (error) {
            toast.error(error.response.data.message);
            set({isSigningUp: false})
        } 
    },

    updateProfile : async(data) => {
        
        set({isUpdatingProfile : true});
        console.log(data)
        try {
            const res = await axiosInstance.post('/user/update-profile', data ,{
                headers: { "Content-Type": "multipart/form-data" },
            });
            toast.success(res.data.message);
            await get.chechAuth();

        } catch (error) {
            toast.error(error.response.data.message);
            set({isSigningUp: false})
        } finally {
            set({isUpdatingProfile : false});
        }
    }
}))