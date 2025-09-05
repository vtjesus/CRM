export type Order = {
    number: number;
    price: number;
    currency: string;
    itemName: string;
    amount: number;
    createdAt: number;
    shippedAt: number;
};

export const formatPrice = (price: number, currency: string): string => 
    `${price.toFixed(2)} ${currency}`;

export const formatDate = (timestamp: number): string => 
    new Date(timestamp).toLocaleDateString();

export const getTotalPrice = (price: number, amount: number): number => 
    price * amount;

export const formatTotalPrice = (order: Order): string => 
    formatPrice(getTotalPrice(order.price, order.amount), order.currency);