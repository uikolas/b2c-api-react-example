export const cartCreateFixture: any = {
  data: {
    type: "type_data",
    id: "id_data",
    attributes: {
      priceMode: "priceMode_data",
      currency: "currency_data",
      store: "store_data",
      discounts: [
        {
          displayName: "displayName_data",
          amount: 0,
          code: "code_data"
        }
      ],
      totals: {
        expenseTotal: 0,
        discountTotal: 0,
        taxTotal: 0,
        subtotal: 0,
        grandTotal: 0
      }
    },
    links: {
      self: "string"
    },
    relationships: {
      items: [
        {
          id: 0,
          type: "string",
        }
      ]
    }
  }
};
