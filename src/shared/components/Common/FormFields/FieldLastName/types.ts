import { WithStyles } from '@material-ui/core/styles/withStyles';
import {ChangeEvent} from "react";
import {fieldStyles} from "src/shared/components/Common/FormFields/fieldStyles";
import {TCustomerLastName} from "src/shared/interfaces/customer/index";


export interface IFieldLastNameProps extends WithStyles<typeof fieldStyles> {
  value: TCustomerLastName;
  formName: string;
  onChangeHandler: (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement>) => void;
}
