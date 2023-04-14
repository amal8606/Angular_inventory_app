export interface Isales{
    id: number,
    total: number,
    created_at: string,
    client: {
      id: number,
      first_name: string,
      last_name: string,
      address: string,
      city: string,
      state: string,
    country: string,
      phone: string,
      email: string
    },
    items: [
      {
        id: number,
        created_at: string,
        sale_id: number,
        price: number,
        quantity: number,
        product_id: number
      }
    ]
}