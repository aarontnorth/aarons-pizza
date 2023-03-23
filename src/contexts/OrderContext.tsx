import {createContext, useContext} from "react";
import {useMutation} from "@tanstack/react-query";
import authContext from "../contexts/AuthContext";
import {deleteOrderById} from "../api/orders";

const OrderContext = createContext({
  deleteOrder: (orderId: string) => {},
});

export interface deleteOrderInfo {
  token: string,
  orderId: string,
}

export const OrderProvider = ({ children }: any) => {
  const auth = useContext(authContext)

  const deleteMutation = useMutation(
      async ({token, orderId}: deleteOrderInfo) => {
        return await deleteOrderById(orderId, token);
      },
  )

  const deleteOrder = (orderId: string) => {
    deleteMutation.mutate({orderId: orderId, token: auth.token});
  }

  return (
    <OrderContext.Provider value={{ deleteOrder }}>
      {children}
    </OrderContext.Provider>
  );
};

export default OrderContext;
