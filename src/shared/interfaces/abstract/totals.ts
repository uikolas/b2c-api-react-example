export type TExpenseTotal = number;
export type TDiscountTotal = number;
export type TTaxTotal = number;
export type TSubtotal = number;
export type TGrandTotal = number;
export type TCanceledTotal = number;

export interface IAbstractTotals {
  expenseTotal: TExpenseTotal;
  discountTotal: TDiscountTotal;
  taxTotal: TTaxTotal;
  subtotal: TSubtotal;
  grandTotal: TGrandTotal;
}
