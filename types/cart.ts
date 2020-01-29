interface Item {
    price?: number
    title?: string
    quantity?: number
}

export interface Cart {
    items: Item
    totalAmount: number;
}