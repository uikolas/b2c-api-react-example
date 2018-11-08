import { WithStyles } from '@material-ui/core/styles/withStyles';
import {TCustomerFirstName} from "src/shared/interfaces/customer/index";
import {ChangeEvent} from "react";
import {fieldStyles} from "src/shared/components/Common/FormFields/fieldStyles";


export interface IFieldFirstNameProps extends WithStyles<typeof fieldStyles> {
  value: TCustomerFirstName;
  formName: string;
  onChangeHandler: (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement>) => void;
}
