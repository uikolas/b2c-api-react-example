import * as React from 'react';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import { styles } from './styles';
import {RangeInput} from "src/shared/components/UI/SprykerRangeFilter/RangeInput/index";
import {ChangeEvent} from "react";
import {TRangeInputName} from "src/shared/interfaces/serach/index";

interface SprykerRangeProps extends WithStyles<typeof styles> {
  title: string;
  attributeName?: string;
  handleChange?: Function;
  min?: number;
  max?: number;
  currentValue?: {min: number, max: number};
  Wrapper?: React.SFC<any>;
}

export interface SprykerRangeState {
}

export class SprykerRangeFilter extends React.Component<SprykerRangeProps, SprykerRangeState> {

  public handleChangeValues = ( event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement>,
                                param: TRangeInputName) => {
    const newValue = +event.target.value;
    if ((param === 'min' && newValue < this.props.min) || (param === 'max' && newValue > this.props.max)) {
      return;
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
