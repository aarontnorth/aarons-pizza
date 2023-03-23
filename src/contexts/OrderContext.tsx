import React from 'react';
import {createContext, useContext, useState} from 'react';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import authContext from '../contexts/AuthContext';
import {createOrderForTable, deleteOrderById, getOrders} from '../api/orders';
import {Order, Pizza} from '../types';
import useOrderSessionStorage from '../hooks/useOrderSessionStorage';
import snackBarContext from '../contexts/SnackBarContext';

interface ContextProps {
  orders: Order[];
  deleteOrder: (orderId: string) => void;
  createOrder: (pizza: Pizza) => void;
}

const OrderContext = createContext<ContextProps>({
  orders: [],
  // eslint-disable-next-line unused-imports/no-unused-vars
  deleteOrder: (orderId: string) => {},
  // eslint-disable-next-line unused-imports/no-unused-vars
  createOrder: (pizza: Pizza) => {},
});

export const OrderProvider = ({ children }: any) => {
  const {currentTable, incrementTable} = useOrderSessionStorage();
  const queryClient = useQueryClient();
  const [orders, setOrders] = useState<Order[]>([]);
  const snack = useContext(snackBarContext);
  const auth = useContext(authContext);

  useQuery({
    queryKey: ['fetch-orders'],
    queryFn: async () => {return await getOrders(auth.token!!)
      .then(response => {
        return response.data;
      });
    },
    onSuccess: (data) => {setOrders(data);},
    onError: (error) => {
      if(isExpiredToken(error)){auth.logout();}
    }
  });

  const createOrderMutation = useMutation( {
    mutationFn: async (pizza: Pizza) => {
      return await createOrderForTable(pizza, currentTable, auth.token!!);
    },
    onSuccess: () => {
      incrementTable();
      snack.handleSetAlert('Thank you for your order!');
    },
    onError: (error) => {
      if(isExpiredToken(error)){auth.logout();}
    }
  });

  const createOrder = (pizza: Pizza) => {
    createOrderMutation.mutate(pizza);
  };

  const deleteMutation = useMutation({
    mutationFn:
            async (orderId: string) => {
              return await deleteOrderById(orderId, auth.token!!);
            },
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['fetch-orders']});
    },
    onError: (error) => {
      if(isExpiredToken(error)){auth.logout();}
    }
  }
  );

  const deleteOrder = (orderId: string) => {
    deleteMutation.mutate(orderId);
  };

  const isExpiredToken = (error: string) => {
    return error.includes('Token has expired');
  };

  return (
    <OrderContext.Provider value={{ orders, createOrder, deleteOrder }}>
      {children}
    </OrderContext.Provider>
  );
};

export default OrderContext;
