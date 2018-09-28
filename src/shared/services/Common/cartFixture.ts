export const cartCreateFixture: any = {
  data: {
    type: "type_string",
    id: "id_string",
    attributes: {
      priceMode: "string",
      currency: "string",
      store: "string",
      discounts: [
        {
          displayName: "string",
          amount: 0,
          code: "string"
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
