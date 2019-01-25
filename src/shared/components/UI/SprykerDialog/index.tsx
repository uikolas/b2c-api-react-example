import * as React from 'react';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import { styles } from './styles';
import { ButtonAgreeTitle, ButtonDisagreeTitle } from 'src/shared/translation';

interface SprykerDialogProps extends WithStyles<typeof styles> {
    title?: string;
    content: string;
    extraClasses?: string;
    handleShow: (event: React.SyntheticEvent<{}>) => void;
    handleAgree: (event: React.MouseEvent<HTMLElement>) => void;
    handleDisagree: (event: React.MouseEvent<HTMLElement>) => void;
    isOpen: boolean;
    titleAgree?: string;
    titleDisagree?: string;
}

export const SprykerDialogBase: React.SFC<SprykerDialogProps> = (props): JSX.Element => {
    const {
        classes,
        extraClasses = '',
        handleShow,
        handleAgree,
        handleDisagree,
        title,
        content,
        isOpen,
        titleAgree = ButtonAgreeTitle,
        titleDisagree = ButtonDisagreeTitle,
    } = props;

    const Transition = (props: SprykerDialogProps) => (
        <Slide direction="up" {...props} />
    );

    return (
        <Dialog
            open={isOpen}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleShow}
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
        >
            {title
                ? (
                    <DialogTitle id="alert-dialog-slide-title">
                        {title}
                    </DialogTitle>
                )
                : null
            }

            <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                    {content}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleDisagree} color="primary">
                    {titleDisagree}
                </Button>
                <Button onClick={handleAgree} color="primary">
                    {titleAgree}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export const SprykerDialog = withStyles(styles)(SprykerDialogBase);
