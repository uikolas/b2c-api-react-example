import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { SuccessIcon, RejectIcon } from '..//MessageIcons';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import { styles } from './styles';

export interface INotificationsMessageTemplate  {
    message?: string;
    icon?: string;
    id?: string;
}

export interface INotificationsMessageTemplateWithStyles
    extends WithStyles<typeof styles>, INotificationsMessageTemplate  {}

export const NotificationsMessageTemplateBanse: React.SFC<INotificationsMessageTemplateWithStyles> = (props) => {
    const { message, icon, id, classes } = props;
    let iconComponent;

    switch (icon) {
        case 'error':
            iconComponent = <RejectIcon />;
            break;
        case 'success':
            iconComponent = <SuccessIcon />;
            break;
        default:
            iconComponent = null;
    }

    return (
        <>
            { icon &&
                <span className={ classes.icon }>
                    { iconComponent }
                </span>
            }
            { id
                ? <FormattedMessage id={ id } />
                : message
            }
        </>
    );
};

export const NotificationsMessageTemplate = withStyles(styles)(NotificationsMessageTemplateBanse);
