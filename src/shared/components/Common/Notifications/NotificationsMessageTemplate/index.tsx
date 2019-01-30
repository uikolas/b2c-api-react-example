import * as React from 'react';
import { FormattedMessage } from 'react-intl';

import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import { styles } from './styles';

export interface INotificationsMessage {
    message?: string;
    messageWithCustomText?: string;
    type?: string;
    id?: string;
    icon?: React.ReactNode;
}

export interface INotificationsMessageWithStyles extends WithStyles<typeof styles>, INotificationsMessage {

}

export const NotificationsMessageTemplateBase: React.SFC<INotificationsMessageWithStyles> = props => {
    const {message, messageWithCustomText, icon, id, classes} = props;

    const messageWithInformation = messageWithCustomText
        ? <FormattedMessage id={messageWithCustomText} values={{messageText: message}} />
        : message;

    return (
        <>
            {icon &&
                <span className={classes.icon}>
                    {icon}
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
