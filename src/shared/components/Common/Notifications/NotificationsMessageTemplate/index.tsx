import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { SuccessIcon, RejectIcon } from '..//MessageIcons';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import { styles } from './styles';

export interface INotificationsMessage {
    message?: string;
    messageWithCustomText?: string;
    type?: string;
    id?: string;
}

export interface INotificationsMessageWithStyles extends WithStyles<typeof styles>, INotificationsMessage {

}

export const NotificationsMessageTemplateBase: React.SFC<INotificationsMessageWithStyles> = (props) => {
    const {message, messageWithCustomText, type, id, classes} = props;
    let iconComponent: boolean | React.ReactNode = false;

    switch (type) {
        case 'error':
            iconComponent = <RejectIcon />;
            break;
        case 'success':
            iconComponent = <SuccessIcon />;
            break;
        default:
            iconComponent = null;
    }

    const messageWithInformation = messageWithCustomText
        ? <FormattedMessage id={messageWithCustomText} values={{messageText: message}} />
        : message;

    return (
        <>
            {iconComponent &&
                <span className={classes.icon}>
                    {iconComponent}
                </span>
            }
            {id
                ? <FormattedMessage id={id} />
                : messageWithInformation
            }
        </>
    );
};

export const NotificationsMessageTemplate = withStyles(styles)(NotificationsMessageTemplateBase);
