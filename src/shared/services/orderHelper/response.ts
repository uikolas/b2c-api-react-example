
import {
  IOrderCollectionParsed,
  IOrderCollectionResponse,
  IOrderDetailsParsed,
  IOrderDetailsResponse,
  IOrderItem,
  IOrderItemResponse,
} from "../../interfaces/order/index";


export const parseGetOrdersCollectionResponse = (data: IOrderCollectionResponse): IOrderCollectionParsed | null => {
  if (!Array.isArray(data.data) || !data.data.length) {
    return null;
  }

  const items = data.data.map((item: IOrderItemResponse): IOrderItem => (
    {
      id: item.id,
      dateCreated: item.attributes.createdAt,
      currency: item.attributes.currencyIsoCode,
      totals: item.attributes.totals,
    }
  ));

  const response = {
    items,
  };
  return response;
};

export const parseGetOrderDetailsResponse = (data: IOrderDetailsResponse): IOrderDetailsParsed | null => {
  if (!data) {
    return null;
  }

  const attributes = data.attributes;

  const response = {
    id: data.id,
    dateCreated: attributes.createdAt,
    currency: attributes.currencyIsoCode,
    totals: attributes.totals,
    expenses: attributes.expenses,
    items: attributes.items,
  };
  return response;
};
