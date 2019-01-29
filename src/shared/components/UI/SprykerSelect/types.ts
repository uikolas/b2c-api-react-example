export interface IMenuItemSelect {
  value: string | number;
  name: string | number | React.ReactNode;
}

export interface IMenuItemFirst extends IMenuItemSelect {
  selected?: boolean;
  disabled?: boolean;
}

