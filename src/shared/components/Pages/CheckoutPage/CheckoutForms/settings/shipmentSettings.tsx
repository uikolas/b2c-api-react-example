import {
  IShippingMethodsParams
} from "src/shared/components/Pages/CheckoutPage/CheckoutForms/settings/types";
import {IFormSettings} from "src/shared/components/UI/SprykerForm/types";
import {IShipmentMethod} from "src/shared/interfaces/checkout/index";

export const getShipmentMethodsFormSettings = (formName: string, params: IShippingMethodsParams): IFormSettings => {
  const {
    shipmentMethods,
    currentValueShipmentMethod,
    submitHandler,
    inputChangeHandler,
  } = params;

  const formSettings: IFormSettings = {
    formName,
    onChangeHandler: inputChangeHandler,
    onSubmitHandler: submitHandler,
    fields: [
      [
        {
          type: 'radio',
          inputName: 'shipmentMethodSelection',
          inputValue: currentValueShipmentMethod,
          spaceNumber: 12,
          isRequired: false,
          label: 'Test',
          isError: false,
          radioItems: getRadioItems(shipmentMethods),
        }
      ],
    ],
  };
  return formSettings;
};

const getRadioItems = (collection: IShippingMethodsParams["shipmentMethods"]) => {
  let items = convertShipmentsToRadioItems(collection);
  if (!items) {
    return null;
  }
  return items;
};

const isShippingMethodsExist = (collection: IShippingMethodsParams["shipmentMethods"]) => {
  return Boolean(collection && Array.isArray(collection) && collection.length > 0);
};

const convertShipmentsToRadioItems = (collection: IShippingMethodsParams["shipmentMethods"]) => {

  return (isShippingMethodsExist(collection)
      ? collection.map((item: IShipmentMethod) => ({value: item.id, label: createRadioItemLabel(item)}))
      : null
  );
};

const createRadioItemLabel = (shipmentMethod: IShipmentMethod) => {
  let response: string = '';

  if (shipmentMethod.price) {
    response += `${shipmentMethod.price}`;
  }
  if (shipmentMethod.name) {
    response += `${shipmentMethod.name}`;
  }

  return response;
};
