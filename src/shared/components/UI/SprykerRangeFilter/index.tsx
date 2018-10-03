import * as React from "react";
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import {styles} from './styles';

interface SprykerRangeProps extends WithStyles<typeof styles> {
  attributeName?: string;
  handleChange?: Function;
  min?: number | string;
  max?: number | string;
}

export interface SprykerRangeState {
  min: number | string;
  max: number | string;
  [key: string]: any;
}

export class SprykerRangeFilter extends React.Component<SprykerRangeProps, SprykerRangeState> {

  public state: SprykerRangeState = {
    min: this.props.min,
    max: this.props.max,
  };

  private handleChangeValues = (param: string) => (event: any) => {
    this.setState({ [param]: event.target.value }, () => {
      this.props.handleChange(this.props.attributeName, this.state);
    });
  }

  public render() {
    const {
      classes,
      attributeName,
      min,
      max,
    } = this.props;

    return (
      <FormControl className={classes.root}>
        <Grid container alignItems="center" justify="space-between">
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
              value={this.state.min}
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
              value={this.state.max}
              onChange={this.handleChangeValues('max')}
            />
          </div>
        </Grid>
      </FormControl>
    );
  }
}

export const SprykerRange = withStyles(styles)(SprykerRangeFilter);
