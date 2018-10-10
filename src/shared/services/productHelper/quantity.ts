import {IMenuItemsDropdown} from "../../components/UI/DropdownControlled";

export const createQuantityVariants = (quantity: number | null):  Array<IMenuItemsDropdown> | boolean => {
  if (!quantity) {
    return null;
  }

  const arr = Array(quantity);
  for (let ii = 0; ii < quantity; ii++) {
    arr[ii] = ii+1;
  }

  const data: Array<IMenuItemsDropdown> = [];
  arr.forEach((value: string) => {
    data.push(
      {
        value,
        name: value,
      }
    );
  });

  return data;
};
