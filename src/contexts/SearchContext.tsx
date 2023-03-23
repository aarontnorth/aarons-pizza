import React, {useEffect} from 'react';
import {createContext, useContext, useState} from 'react';
import OrderContext from '../contexts/OrderContext';
import lunr from 'lunr';
import {Order} from '../types';

interface ContextProps {
  filteredOrders: Order[] | undefined;
  search: (searchTerm: string) => void;
  resetSearch: () => void;
}

const SearchContext = createContext<ContextProps>({
  filteredOrders: [],
  // eslint-disable-next-line
  search: (searchTerm: string) => {},
  resetSearch: () => {},
});

export const SearchProvider = ({ children }: any) => {
  const {orders} = useContext(OrderContext);
  const [filteredOrders, setFilteredOrders] = useState<Order[]>();

  const isEmpty = (orderList: Order[] | undefined) => {
    return orderList === undefined || orderList.length === 0;
  };

  // eslint-disable-next-line
  useEffect(() => {
    isEmpty(filteredOrders) && setFilteredOrders(orders);
  }, [orders]);

  const idx = lunr(function () {
    this.ref('Order_ID');
    this.field('Order_ID');
    this.field('Crust');
    this.field('Flavor');
    this.field('Size');
    this.field('Table_No');
    this.field('Timestamp');

    orders.forEach(function (order) {
      // @ts-ignore
      this.add(order);
    }, this);
  });

  const resetSearch = () => {
    setFilteredOrders([]);
  };

  const search = (searchTerm: string) => {
    const isOrderInResults = (order: Order) => {
      return orderIdsFromResults.includes(order.Order_ID.toString());
    };
    const searchResults = idx.search(searchTerm);
    const orderIdsFromResults = searchResults.map(result => result.ref);
    setFilteredOrders(orders.filter(order => isOrderInResults(order)));
  };

  return (
    <SearchContext.Provider value={{ filteredOrders , search, resetSearch }}>
      {children}
    </SearchContext.Provider>
  );
};

export default SearchContext;
