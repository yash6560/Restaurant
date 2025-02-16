import { useEffect } from "react";
import { useOrderStore } from "../store/useOrderStore"

const MyOrder = () => {
    const {getAllOrders, isOrderFetch, orderList} = useOrderStore();

    useEffect(() => {
         const getOrder = async() => {
            await getAllOrders();
         }
         getOrder()
       }, [getAllOrders])

       if(isOrderFetch){
        return (
            <div>Loading...</div>
        )
       }

  return (
    <div className="w-full mx-auto p-6">
            <h2 className="text-3xl font-bold  mb-6 text-center">📦 Your Orders</h2>
            
            {orderList.length === 0 ? (
                <p className="text-center  text-lg">No orders found.</p>
            ) : (
                <div className="grid md:grid-cols-3 gap-6">
                    {orderList.map((order) => (
                        <div 
                            key={order._id} 
                            className=" shadow-lg rounded-lg p-6 border  transition transform hover:scale-105"
                        >
                            <h4 className="text-lg font-semibold ">
                                🆔 Order ID: <span className="text-blue-500">{order._id}</span>
                            </h4>
                            <p className=" mt-2">
                                <strong>👤 Name:</strong> {order.deliveryDetails.name}
                            </p>
                            <p className="">
                                <strong>💰 Total Amount:</strong> <span className=" font-semibold">₹{order.totalAmount}</span>
                            </p>
                            <p className="">
                                <strong>💰 Payment Status:</strong> <span className=" font-semibold">{order.status}</span>
                            </p>

                            <h5 className="text-md font-medium mt-4">🍽️ Items Ordered:</h5>
                            <ul className="mt-2 space-y-2">
                                {order.items.map((item, index) => (
                                    <li 
                                        key={index} 
                                        className="p-3 rounded-md flex justify-between items-center"
                                    >
                                      <span className=""><img src={item.image} className=" size-12 rounded-lg"/></span>
                                        <span className="">{item.name}</span>
                                        <span className="">x{item.quantity} @ ₹{item.price}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            )}
        </div>
  )
}

export default MyOrder