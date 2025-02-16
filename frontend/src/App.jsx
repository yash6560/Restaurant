import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import MainLayout from './MainLayout';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ForgotPassword from './pages/ForgotPassword';
import MyOrder from './pages/MyOrder';
import Settings from './pages/Settings';
import VerifyOtp from './pages/VerifyOtp';
import ResetPassword from './pages/ResetPassword';
import { useAuthStore } from './store/useAuthStore';
import { useEffect } from 'react';
import CartPage from './pages/CartPage';
import PlaceOrder from './pages/PlaceOrder';
import { useMenuSelectionStore } from './store/useMenuSelectionStore';
import Dashboard from './pages/Dashboard';
import VerifySuccess from './pages/VerifySuccess';
import ProfilePage from './pages/ProfilePage';
import { useThemeStore } from './store/useThemeStore';

const appRouter = createBrowserRouter([
  {
    path:'/',
    element:<MainLayout/>,
    children:[{
      path:'/',
      element:<Home/>
    },
    {
      path:'/cart',
      element: <CartPage/>
    },
    {
      path:'/order',
      element: <PlaceOrder/>
    },
    {
      path:'/myorder',
      element: <MyOrder/>
    },
    {
      path:'/dashboard',
      element: <Dashboard/>
    },
    {
      path:'/verify',
      element:<VerifySuccess/>
    },
    {
      path:'/profile',
      element:<ProfilePage/>
    },
    {
      path:'/settings',
      element: <Settings/>
    }
  ]
  },
  {
    path:'/login',
    element:<Login />
  },
  {
    path:'/signup',
    element:<Signup />
  },
  {
    path:'/forgot-password',
    element:<ForgotPassword/>
  },
  {
    path:'/verifyOTP',
    element:<VerifyOtp/>
  },
  {
    path:'/reset-password',
    element:<ResetPassword/>
  },
  
  
])

function App() {
  const {chechAuth, isCheckedAuth, authUser} = useAuthStore();
  const {fetchCartData, displayFood} = useMenuSelectionStore();
  const {theme} = useThemeStore();

  useEffect(() => {  
    chechAuth();
    fetchCartData();
    displayFood();
  }, [chechAuth, fetchCartData, displayFood])

  if(isCheckedAuth && !authUser){
    return(
      <div className='h-screen items-center justify-center'>Loading...</div>
    )
  }
  
  return (
    <div data-theme={theme}>
      <RouterProvider router={appRouter}/>
      <Toaster/>
    </div>
  );
}

export default App;