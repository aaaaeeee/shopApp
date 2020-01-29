interface Orders {
    orders: Order[]
}

interface Order {
    id: string
    items: any
    date: string
    totalAmount: string
}