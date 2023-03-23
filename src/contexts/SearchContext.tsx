import {createContext, useContext, useEffect, useState} from "react";
import OrderContext from "../contexts/OrderContext";
import lunr from "lunr";
import {Order} from "../types";

interface ContextProps {
  filteredOrders: Order[];
  search: (searchTerm: string) => void;
}

const SearchContext = createContext<ContextProps>({
  filteredOrders: [],
  search: (searchTerm: string) => {},
});

export const SearchProvider = ({ children }: any) => {
  const {orders} = useContext(OrderContext);
  const [filteredOrders, setFilteredOrders] = useState<Order[]>(orders);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    setFilteredOrders(orders);
  })

  const idx = lunr(function () {
    this.ref('Order_ID')
    this.field('Order_ID')
    this.field('Crust')
    this.field('Flavor')
    this.field('Size')
    this.field('Table_No')
    this.field('Timestamp')

    orders.forEach(function (order) {
      // @ts-ignore
      this.add(order)
    }, this)
  })

  const search = (searchTerm: string) => {
    const isOrderInResults = (order: Order) => {
      return orderIdsFromResults.includes(order.Order_ID.toString())
    }
    const searchResults = idx.search(searchTerm);
    const orderIdsFromResults = searchResults.map(result => result.ref);
    setFilteredOrders(orders.filter(order => isOrderInResults(order)));
  }

  return (
    <SearchContext.Provider value={{ filteredOrders , search }}>
      {children}
    </SearchContext.Provider>
  );
};

export default SearchContext;
