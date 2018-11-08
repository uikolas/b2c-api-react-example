import * as React from 'react';
import { WithStyles } from '@material-ui/core/styles/withStyles';
import {ChangeEvent} from "react";
import {fieldStyles} from "src/shared/components/Common/FormFields/fieldStyles";
import {TFormInputValue} from "src/shared/components/Common/FormFields/types";

export interface IFieldTextInputProps extends WithStyles<typeof fieldStyles> {
  value: TFormInputValue;
  formName: string;
  inputName: string;
  onChangeHandler: (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement>) => void;
  handleBlur?: React.EventHandler<any>;
  label?: string;
  isError: boolean;
}
