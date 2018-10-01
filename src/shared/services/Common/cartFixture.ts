export const cartCreateFixture: any = {
  data: {
    type: "carts",
    id: "dd15caa1-382b-5809-b6e4-b6ee23a28ec8",
    attributes: {
      priceMode: "priceMode",
      currency: "currency_data",
      store: "DE",
      /*discounts: [
        {
          displayName: "displayName_data",
          amount: 0,
          code: "code_data"
        }
      ],*/
      discounts: {},
      totals: {
        /*expenseTotal: 0,
        discountTotal: 0,
        taxTotal: 0,
        subtotal: 0,
        grandTotal: 0,*/

        expenseTotal: null,
        discountTotal: null,
        taxTotal: null,
        subtotal: null,
        grandTotal: null
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
