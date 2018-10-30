import * as React from 'react';
import {ChangeEvent} from "react";
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';

import { styles } from './styles';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';

interface RangeInputProps extends WithStyles<typeof styles> {
  title: string;
  className: string;
  handleChangeValues: (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement>) => void;
  currentValue: string | number;
  max: number;
  min: number;
  attributeName: string;
  isMin: boolean;
  handleBlur: (event: any) => void;
}

const titlePartMax = ' to';
const titlePartMin = ' from';

export const RangeInputBase: React.SFC<RangeInputProps> = (props) => {
  const {
    classes,
    className,
    isMin,
    title,
    handleChangeValues,
    currentValue,
    min,
    max,
    attributeName,
    handleBlur,
  } = props;

  return (
    <FormControl className={ className }>
      <Grid container justify="flex-start" alignItems="center">
        <Grid item>
          <span className={ classes.title }>{isMin ? `${title} ${titlePartMin}` : `${title} ${titlePartMax}`}</span>
        </Grid>
        <Grid item>
          <TextField
            id={ `${attributeName}` }
            inputProps={{min, max}}
            InputProps={{disableUnderline: true, classes: {input: classes.value}}}
            type="number"
            value={ currentValue }
            onChange={ handleChangeValues }
            onBlur={handleBlur}
          />
        </Grid>
      </Grid>
    </FormControl>
  );
};

export const RangeInput = withStyles(styles)(RangeInputBase);
