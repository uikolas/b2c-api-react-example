import * as React from 'react';
import { FormEvent } from 'react';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import {styles} from '../styles';
import { SprykerButton } from 'src/shared/components/UI/SprykerButton';
import { DeleteAccountTitle, DeleteAccountMessage } from 'src/shared/translation/translations';

interface AccountActionsProps extends WithStyles<typeof styles> {
  submitDeleteHandler: (event: FormEvent<HTMLFormElement>) => void;
}

export const AccountActionsBase: React.SFC<AccountActionsProps> = (props): JSX.Element => {
  const {
    classes,
    submitDeleteHandler,
  } = props;

  return (
    <Grid container justify="flex-start" className={ classes.section }>
      <Grid item xs={ 12 }>
        <Typography variant="title" className={ classes.sectionTitle }>
          { DeleteAccountTitle }
        </Typography>

        <Divider />
      </Grid>

      <Grid item xs={ 12 }>
        <Typography variant="body1" className={ classes.warningTitle }>
          { DeleteAccountMessage }
        </Typography>
      </Grid>

      <Grid item xs={ 12 } sm={ 2 }>
        <SprykerButton
          title={ DeleteAccountTitle }
          onClick={ submitDeleteHandler }
          extraClasses={ classes.deleteBtn }
        />
      </Grid>
    </Grid>
  );
};

export const AccountActions = withStyles(styles)(AccountActionsBase);

