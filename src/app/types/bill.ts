export interface BillItem {
    id: string;
    name: string;
    quantity: number;
    price: number;
}

export interface Friend {
    id: number;
    name: string;
}

export interface itemConsume {
    itemName: string;
    itemPrice: number;
    consumedBy: string[];
    valueToPay: number;
}

export interface FriendConsume {
    friendName: string;
    consume: itemConsume[];
    total: number;
}