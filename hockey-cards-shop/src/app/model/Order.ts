
export interface Order {
    key_doc: string;
    total: Number;
    cards: [
        {
            name: String;
            quantity: Number;
            subtotal: Number;
        }
    ]
    user_key_doc: String;
};
