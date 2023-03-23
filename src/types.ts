export interface Pizza {
    Crust: string;
    Flavor: string;
    Size: string;
}

export interface Order extends Pizza{
    Order_ID: string;
    Table_No: number;
    Timestamp: string;
}