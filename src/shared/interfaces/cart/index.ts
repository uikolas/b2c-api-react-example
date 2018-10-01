
export type TCartType = string;
export type TCartId = string;
export type TCartPriceMode = string;
export type TCartStore = string;

export type TCartDisplayName = string;
export type TCartAmount = number;
export type TCartCode = string;
export type TCartExpenseTotal = number;
export type TCartDiscountTotal = number;
export type TCartTaxTotal = number;
export type TCartSubtotal = number;
export type TCartGrandTotal = number;

export interface ICartDiscounts {
  displayName: TCartDisplayName;
  amount: TCartAmount;
  code: TCartCode;
}

export interface ICartTotals {
  expenseTotal: TCartExpenseTotal;
  discountTotal: TCartDiscountTotal;
  taxTotal: TCartTaxTotal;
  subtotal: TCartSubtotal;
  grandTotal: TCartGrandTotal;
}
