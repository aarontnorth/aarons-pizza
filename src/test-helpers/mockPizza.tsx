export const mockPizza = () => {
    return {
        "Crust": "Regular",
        "Flavor": "Cheese",
        "Size": "Medium",
    }
};

export const customPizza = (crust: string, flavor: string, size: string) => {
    return {
        "Crust": crust,
        "Flavor": flavor,
        "Size": size,
    }
}