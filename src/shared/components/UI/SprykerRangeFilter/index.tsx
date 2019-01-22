import * as React from 'react';
import { ChangeEvent } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import { styles } from './styles';
import { RangeInput } from 'src/shared/components/UI/SprykerRangeFilter/RangeInput';
import {
  getSprykerRangeStateLessError,
  getSprykerRangeStateMoreError,
  getSprykerRangeStateNoError,
} from 'src/shared/components/UI/SprykerRangeFilter/helpers';
import {InputChangeEvent} from 'src/shared/interfaces/common/react';
import {
  ISprykerRangeProps,
  ISprykerRangeState,
  TRangeInputName
} from "src/shared/components/UI/SprykerRangeFilter/types";


export class SprykerRangeFilter extends React.Component<ISprykerRangeProps, ISprykerRangeState> {
  public state: ISprykerRangeState = {
    isMinError: {
      isMoreError: false,
      isLessError: false,
    },
    isMaxError: {
      isMoreError: false,
      isLessError: false,
    },
  };

  public componentDidUpdate = (prevProps: ISprykerRangeProps, prevState: ISprykerRangeState): void => {

    if (this.props.isReset && !prevProps.isReset) {
      this.setState((prevState: ISprykerRangeState) => ({
        isMinError: {...getSprykerRangeStateNoError()},
        isMaxError: {...getSprykerRangeStateNoError()},
      }));
      return;
    }

    if (this.props.currentValue.max !== prevProps.currentValue.max) {
      this.validateInputs('max', this.props.currentValue.max);
    }

    if (this.props.currentValue.min !== prevProps.currentValue.min) {
      this.validateInputs('min', this.props.currentValue.min);
    }

  };

  public handleChangeValues = async (event: InputChangeEvent, param: TRangeInputName): Promise<void> => {
    const newValue: number = parseInt(event.target.value, 10);
    if (!newValue || newValue > 999999999) { return; }

    await this.validateInputs(param, newValue);
    this.props.handleChange(this.props.attributeName, {...this.props.currentValue, [param]: newValue});
  };

  private validateInputs = (param: TRangeInputName, newValue: number): boolean => {
    if (param === 'min') {
      if (newValue < this.props.min) {
        this.setState((prevState: ISprykerRangeState) => {
          if (prevState.isMinError.isLessError) { return; }
          return {
            isMinError: {
              ...getSprykerRangeStateLessError(),
            },
          };
        });
        return false;

      } else {
        if (newValue > this.props.max) {
          this.setState((prevState: ISprykerRangeState) => {
            if (prevState.isMinError.isMoreError) { return; }
            return {
              isMinError: {
                ...getSprykerRangeStateMoreError(),
              },
            };
          });
          return false;

        } else {
          this.setState((prevState: ISprykerRangeState) => {
            if (!prevState.isMinError.isMoreError && !prevState.isMinError.isLessError) { return; }
            return {
              isMinError: {
                ...getSprykerRangeStateNoError(),
              },
            };
          });
          return true;
        }
      }
    } else {
      if (param === 'max') {
        if (newValue < this.props.min) {
          this.setState((prevState: ISprykerRangeState) => {
            if (prevState.isMaxError.isLessError) { return; }
            return {
              isMaxError: {
                ...getSprykerRangeStateLessError(),
              },
            };
          });
          return false;

        } else {
          if (newValue > this.props.max) {
            this.setState((prevState: ISprykerRangeState) => {
              if (prevState.isMaxError.isMoreError) { return; }
              return {
                isMaxError: {
                  ...getSprykerRangeStateMoreError(),
                },
              };

            });
            return false;

          } else {
            this.setState((prevState: ISprykerRangeState) => {
              if (!prevState.isMaxError.isMoreError && !prevState.isMaxError.isLessError) { return; }
              return {
                ...prevState,
                isMaxError: {
                  ...getSprykerRangeStateNoError(),
                },
              };
            });
            return true;
          }
        }
      }
    }
  };

  public render() {
    const {classes, attributeName, min, max, currentValue, title, Wrapper, handleBlur} = this.props;

    if (min === 0 && max === 0) { return null;}

    const maxRange = (
      <RangeInput
        isMin={ false }
        className={ classes.root }
        title={ title }
        handleChangeValues={ (
          event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement>,
          param: TRangeInputName) => this.handleChangeValues(event, 'max') }
        currentValue={ currentValue.max }
        min={ min }
        max={ max }
        attributeName={ `${attributeName}-max` }
        handleBlur={ handleBlur }
        isMoreError={ this.state.isMaxError.isMoreError }
        isLessError={ this.state.isMaxError.isLessError }
      />
    );

    const minRange = (
      <RangeInput
        isMin={ true }
        className={ classes.root }
        title={ title }
        handleChangeValues={ (
          event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement>,
          param: TRangeInputName,
        ) => this.handleChangeValues(event, 'min') }
        currentValue={ currentValue.min }
        min={ min }
        max={ max }
        attributeName={ `${attributeName}-min` }
        handleBlur={ handleBlur }
        isMoreError={ this.state.isMinError.isMoreError }
        isLessError={ this.state.isMinError.isLessError }
      />
    );

    if (Wrapper) {
      return (
        <React.Fragment>
          <Wrapper filter={ minRange } keyValue={ `${title}-min` } key={ `${title}-min` }/>
          <Wrapper filter={ maxRange } keyValue={ `${title}-max` } key={ `${title}-max` }/>
        </React.Fragment>
      );
    }
    return (
      <React.Fragment>{ minRange }{ maxRange }</React.Fragment>
    );
  }
}
export const SprykerRange = withStyles(styles)(SprykerRangeFilter);
