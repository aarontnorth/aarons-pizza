import {createContext, useContext, useEffect, useState} from "react";
import {useMutation, useQuery} from "@tanstack/react-query";
import authContext from "../contexts/AuthContext";
import {deleteOrderById, getOrders} from "../api/orders";
import {Order} from "../types";

interface ContextProps {
  orders: Order[];
  deleteOrder: (orderId: string) => void;
}

const OrderContext = createContext<ContextProps>({
  orders: [],
  deleteOrder: (orderId: string) => {},
});

export const OrderProvider = ({ children }: any) => {
  const [orders, setOrders] = useState<Order[]>([])
  const auth = useContext(authContext)

  const deleteMutation = useMutation(
      async (orderId: string) => {
        return await deleteOrderById(orderId, auth.token);
      },
  )

  const { data } = useQuery({
    queryKey: ['fetch-orders'],
    queryFn: async () => {return await getOrders(auth.token)
        .then(response => {
      return response.data
    });
    }
  })

  const deleteOrder = (orderId: string) => {
    deleteMutation.mutate(orderId);
  }

  useEffect(() => {
    if(data){
      setOrders(data)
    }
  },[data])

  return (
    <OrderContext.Provider value={{ orders, deleteOrder }}>
      {children}
    </OrderContext.Provider>
  );
};

export default OrderContext;
