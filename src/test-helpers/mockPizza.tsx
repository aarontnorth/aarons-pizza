export const mockPizza = () => {
  return {
    'Crust': 'Regular',
    'Flavor': 'Cheese',
    'Size': 'Medium',
    'Table_No': 1
  };
};

export const customPizza = (crust: string, flavor: string, size: string, table: number) => {
  return {
    'Crust': crust,
    'Flavor': flavor,
    'Size': size,
    'Table_No': table
  };
};