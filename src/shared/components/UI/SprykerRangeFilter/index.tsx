import * as React from 'react';
import {ChangeEvent} from "react";
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import { styles } from './styles';
import {RangeInput} from "src/shared/components/UI/SprykerRangeFilter/RangeInput/index";


export type TRangeInputName = 'min' | 'max';

export interface IRangeInputError {
  isMoreError: boolean;
  isLessError: boolean;
}

interface SprykerRangeProps extends WithStyles<typeof styles> {
  title: string;
  attributeName?: string;
  handleChange: Function;
  min?: number;
  max?: number;
  currentValue?: {min: number, max: number};
  Wrapper?: React.SFC<any>;
  handleBlur: (event: any) => void;
}

export interface SprykerRangeState {
  isMinError: IRangeInputError;
  isMaxError: IRangeInputError;
}

export class SprykerRangeFilter extends React.Component<SprykerRangeProps, SprykerRangeState> {

  public state: SprykerRangeState = {
    isMinError: {
      isMoreError: false,
      isLessError: false,
    },
    isMaxError: {
      isMoreError: false,
      isLessError: false,
    },
  };

  public componentDidUpdate = (prevProps: any, prevState: any): void => {
    /*console.log('SprykerRangeFilter componentDidUpdate');
    console.log('prevProps', prevProps);
    console.log('this.props ', this.props);*/
    if (this.props.currentValue.min !== prevProps.currentValue.min
      || this.props.currentValue.max !== prevProps.currentValue.max) {
      console.log('***** SprykerRangeFilter *****');
      /*this.setState((prevState: SprykerRangeState) => ({
        isMinError: {
          isMoreError: false,
          isLessError: false,
        },
        isMaxError: {
          isMoreError: false,
          isLessError: false,
        },
      }));*/
    }

  }

  public handleChangeValues = ( event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement>,
                                param: TRangeInputName) => {
    const newValue = +event.target.value;
    if (!newValue) {
      return;
    }

    if (param === 'min') {
      if (newValue < this.props.min) {
        this.setState((prevState: SprykerRangeState) => ({
          ...prevState,
          isMinError: {
            isMoreError: false,
            isLessError: true,
          }
        }));
      } else if (newValue > this.props.max) {
        this.setState((prevState: SprykerRangeState) => ({
          ...prevState,
          isMinError: {
            isMoreError: true,
            isLessError: false,
          }
        }));

      } else {
        this.setState((prevState: SprykerRangeState) => ({
          ...prevState,
          isMinError: {
            isMoreError: false,
            isLessError: false,
          },
        }));
      }
    } else if (param === 'max') {
      if (newValue < this.props.min) {
        this.setState((prevState: SprykerRangeState) => ({
          ...prevState,
          isMaxError: {
            isMoreError: false,
            isLessError: true,
          }
        }));

      } else if (newValue > this.props.max) {
        this.setState((prevState: SprykerRangeState) => ({
          ...prevState,
          isMaxError: {
            isMoreError: true,
            isLessError: false,
          }
        }));

      } else {
        this.setState((prevState: SprykerRangeState) => ({
          ...prevState,
          isMaxError: {
            isMoreError: false,
            isLessError: false,
          },
        }));
      }
    }

    this.props.handleChange(this.props.attributeName, {...this.props.currentValue, [param]: newValue});
  };

  public render() {
    const {
      classes,
      attributeName,
      min,
      max,
      currentValue,
      title,
      Wrapper,
      handleBlur,
    } = this.props;

    if (min === 0 && max === 0) {
      return null;
    }

    const maxRange = (
      <RangeInput
        isMin={false}
        className={ classes.root }
        title={title}
        handleChangeValues={(
          event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement>,
          param: TRangeInputName) => this.handleChangeValues(event, 'max')}
        currentValue={currentValue.max}
        min={min}
        max={max}
        attributeName={`${attributeName}-max`}
        handleBlur={handleBlur}
        isMoreError={this.state.isMaxError.isMoreError}
        isLessError={this.state.isMaxError.isLessError}
      />
    );

    const minRange = (
      <RangeInput
        isMin={true}
        className={ classes.root }
        title={title}
        handleChangeValues={(
          event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement>,
          param: TRangeInputName
        ) => this.handleChangeValues(event, 'min')}
        currentValue={currentValue.min}
        min={min}
        max={max}
        attributeName={`${attributeName}-min`}
        handleBlur={handleBlur}
        isMoreError={this.state.isMinError.isMoreError}
        isLessError={this.state.isMinError.isLessError}
      />
    );

    if (Wrapper) {
      return (
        <React.Fragment>
          <Wrapper
            filter={minRange}
            keyValue={`${title}-min`}
            key={`${title}-min`}
          />
          <Wrapper
            filter={maxRange}
            keyValue={`${title}-max`}
            key={`${title}-max`}
          />
        </React.Fragment>
      );
    }
    return (
      <React.Fragment>{minRange}{maxRange}</React.Fragment>
    );
  }
}

export const SprykerRange = withStyles(styles)(SprykerRangeFilter);
