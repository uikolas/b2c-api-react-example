import { WithStyles } from '@material-ui/core';
import { styles } from './styles';
import {BlurEvent, IReactSFC} from "src/shared/interfaces/common/react";

export type TRangeInputName = 'min' | 'max';

export interface IRangeInputError {
  isMoreError: boolean;
  isLessError: boolean;
}

export interface ISprykerRangeProps extends WithStyles<typeof styles> {
  title: string;
  attributeName?: string;
  handleChange: Function;
  min?: number;
  max?: number;
  currentValue?: {min: number, max: number};
  Wrapper?: IReactSFC;
  handleBlur: (event: BlurEvent) => void;
  isReset: boolean;
}

export interface ISprykerRangeState {
  isMinError: IRangeInputError;
  isMaxError: IRangeInputError;
}
