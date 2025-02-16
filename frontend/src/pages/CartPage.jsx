import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useMenuSelectionStore } from '../store/useMenuSelectionStore';
import { FaCircleMinus } from "react-icons/fa6";
import { FaCirclePlus } from "react-icons/fa6";

const CartPage = () => {
  const { cartItems, fetchCartData, fetchingcart, increaseCartItem, decreseCartItem, removeFromCart } = useMenuSelectionStore();

  useEffect(() => {
    const fetchData = async () => {
      await fetchCartData();
    };
    fetchData();
  }, [fetchCartData]);

  const incrementData = async(itemId) => {
    await increaseCartItem(itemId);
    await fetchCartData();
  }

  const decrementData = async(itemId) => {
    await decreseCartItem(itemId);
    await fetchCartData();
  }

  const removeCart = async(itemId) => {
    await removeFromCart(itemId);
    await fetchCartData();
  }

  if (fetchingcart) {
    return <div>Loading...</div>;
  }

  const isCartEmpty = !cartItems || !cartItems.items || cartItems.items.length === 0;

  const totalPrice = isCartEmpty ? 0  : cartItems.items.reduce((total, food) => total + food.quantity * food.price, 0);

  return (
    <div className='h-screen'>
      <div className="overflow-x-auto p-5 min-h-[50vh]">
        <table className="table">
          <thead>
            <tr>
              <th></th>
              <th className='w-[20%]'>Title</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
              <th>Remove</th>
            </tr>
          </thead>
          <tbody>
            {
              isCartEmpty ? (
                <tr>
                  <td className=' text-center font-bold text-lg' colSpan={6}><p>Item is Not Present in cart</p></td>
                </tr>
              )
              :  (
                cartItems.items.map((item, index) => (
                  <tr key={item.foodId}>
                    <td>{index + 1}</td>
                    <td>{item.name}</td>
                    <td>{item.price}</td>
                    <td>
                      <div className="bg-base-100 p-1 rounded-full flex gap-2 items-center">
                        <button onClick={() => decrementData(item.foodId)} className='text-error'><FaCircleMinus size={25}/></button>
                        <div className='px-2 rounded-lg'>{item.quantity}</div>
                        <button onClick={() => incrementData(item.foodId)} className="text-success"><FaCirclePlus size={25}/></button>
                      </div>
                    </td>
                    <td>{item.price * item.quantity}</td>
                    <td>
                      <button onClick={() => removeCart(item.foodId)} className=' hover:underline'>Remove</button>
                    </td>
                  </tr>
                ))
              )
            }
            <tr>
              <td colSpan={5}>Total Amount</td>
              <td>{totalPrice}</td>
            </tr>
          </tbody>
        </table>
        
      </div>
      <div className=' flex justify-end w-full p-4'>
          <Link to='/order' className=' btn btn-success'>Proceed</Link>
        </div>
    </div>
  );
};

export default CartPage;