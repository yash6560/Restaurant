import { useEffect } from "react";
import { useOrderStore } from "../store/useOrderStore"

const VerifySuccess = () => {
    const {listenForOrderUpdate, orderStatus} = useOrderStore();

    const orderId = new URLSearchParams(window.location.search).get("orderId");

    useEffect(() => {
      const order = async () => {
        if (orderId) {
            await listenForOrderUpdate(orderId);
        }
        
      }
      order();
  }, [orderId,listenForOrderUpdate]);
    
  return (
    <div><p>Order Status: {orderStatus}</p>;</div>
  )
}

export default VerifySuccess