import {useMenuSelectionStore} from '../store/useMenuSelectionStore';
import {useAuthStore} from '../store/useAuthStore';
import { useState } from 'react';
import { useOrderStore } from '../store/useOrderStore';

const PlaceOrder = () => {
  const { cartItems } = useMenuSelectionStore();
  const {authUser} = useAuthStore();
  const {PlaceOrder} = useOrderStore();

  const [formData, setformData] = useState({
    name : authUser.name,
    email : authUser.email,
    contact : authUser.contact,
    address : authUser.address,
    city : authUser.city,
    country : authUser.country,
    pincode : authUser.pincode,
  })

  const handleChange = (e) => {
    const {name, value} = e.target;
    setformData((prev) => ({...prev, [name] : value}))
  }

  const handleSubmit = async(e) => {
    e.preventDefault();
    const data = {deliveryDetails : formData, cartId : cartItems._id, totalAmount : totalPrice};
    await PlaceOrder(data);
  }

  const isCartEmpty = !cartItems || !cartItems.items || cartItems.items.length === 0;

  const totalPrice = isCartEmpty ? 0  : cartItems.items.reduce((total, food) => total + food.quantity * food.price, 0);

  return (
    <div className="p-5 min-h-screen">
    <h1 className="text-2xl font-bold mb-4">Order Summary</h1>
    <form onSubmit={handleSubmit}>
    <div className="card w-full bg-base-100 shadow-xl p-5">
      <h2 className="text-lg font-semibold">Order ID:</h2>
      <div className="divider"></div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="input input-bordered w-full"
            placeholder="Full Name"
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="input input-bordered w-full"
            placeholder="Email"
          />
          <input
            type="tel"
            name="contact"
            value={formData.contact}
            onChange={handleChange}
            className="input input-bordered w-full"
            placeholder="Contact Number"
          />
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="input input-bordered w-full"
            placeholder="Address"
          />
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            className="input input-bordered w-full"
            placeholder="City"
          />
          <input
            type="text"
            name="country"
            value={formData.country}
            onChange={handleChange}
            className="input input-bordered w-full"
            placeholder="Country"
          />
          <input
            type="text"
            name="pincode"
            value={formData.pincode}
            onChange={handleChange}
            className="input input-bordered w-full"
            placeholder="Zip Code"
          />
        </div>
      

      <div className="divider"></div>
      <table className="table overflow-x-auto">
        <thead>
          <tr>
            <th>Item</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {
            isCartEmpty ? (
              <tr>
                <td colSpan={4}>No Item Available</td>
              </tr>
            ) : (
              cartItems.items.map((item) => (
                <tr key={item.foodId}>
                <td>{item.name}</td>
                <td>{item.quantity}</td>
                <td>{item.price}</td>
                <td>{item.price * item.quantity}</td>
              </tr>
              ))
            )
            
          }
            
        </tbody>
      </table>
        <div className=" divider"></div>
      <div className="text-right text-lg font-bold">Total: {totalPrice} Rs.</div>

      <button type='submit'
        className="btn btn-primary w-full mt-4" 
        
      >
        Proceed to Payment
      </button>
    </div>
    </form>
  </div>
  )
}

export default PlaceOrder