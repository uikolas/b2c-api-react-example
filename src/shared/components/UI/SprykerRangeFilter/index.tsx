import * as React from "react";
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import {styles} from './styles';

interface SprykerRangeProps extends WithStyles<typeof styles> {
  attributeName?: string;
  handleChange?: Function;
  min?: number;
  max?: number;
  currentValue?: {min: number, max: number},
}

export interface SprykerRangeState {
}

export class SprykerRangeFilter extends React.Component<SprykerRangeProps, SprykerRangeState> {

  private handleChangeValues = (param: string) => (event: any) => {
    const newValue =  +event.target.value;
    if ((param === 'min' && newValue < this.props.min) || (param === 'max' && newValue > this.props.max)) {
      return;
    }
    this.props.handleChange(this.props.attributeName, {...this.props.currentValue, [param]: newValue});
  }

  public render() {
    const {
      classes,
      attributeName,
      min,
      max,
      currentValue,
    } = this.props;

    return (
      <FormControl className={classes.root}>
        <Grid container alignItems="center">
          <span className={classes.rangeFilterName}>{attributeName.includes('price') ? 'price' : attributeName}:</span>
          <div>
            <span className={classes.padRight}>from</span>
            <TextField
              id={`${attributeName}-min`}
              inputProps={{
                min,
                max,
              }}
              type="number"
              value={currentValue.min}
              onChange={this.handleChangeValues('min')}
            />
          </div>
          <div>
            <span className={classes.padRight}>to</span>
            <TextField
              id={`${attributeName}-max`}
              inputProps={{
                min,
                max,
              }}
              type="number"
              value={currentValue.max}
              onChange={this.handleChangeValues('max')}
            />
          </div>
        </Grid>
      </FormControl>
    );
  }
}

export const SprykerRange = withStyles(styles)(SprykerRangeFilter);
