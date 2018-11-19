import * as React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import { styles } from './styles';
import {IFormWrapperProps} from "src/shared/components/Pages/CheckoutPage/CheckoutForms/FormWrapper/types";


export const FormWrapperBase: React.SFC<IFormWrapperProps> = (props): JSX.Element => {
  const {classes, title, isDisabled}  = props;

  return (
    <Grid container className={ classes.root }>
      <Grid item xs={12}>

        <ExpansionPanel
          disabled={isDisabled}
          classes={{
            root: classes.panelRoot,
            expanded: classes.panelExpanded,
          }}
        >
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            classes={{
              expandIcon: classes.icon,
              root: classes.panelSummaryRoot,
              content: classes.panelSummaryContent,
              expanded: classes.panelSummaryExpanded,
            }}
          >
            <Typography className={classes.title} component="h3" >{title}</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails
            classes={{root: classes.panelDetailRoot}}
          >
            <Grid container >
              <Grid item xs={12} className={classes.formOuter}>
                {props.children}
              </Grid>
            </Grid>
          </ExpansionPanelDetails>
        </ExpansionPanel>

      </Grid>
    </Grid>
  );
};

export const FormWrapper = withStyles(styles)(FormWrapperBase);
