import React from 'react';
import {
    NotificationsMessageTemplate,
    INotificationsMessage
} from 'src/shared/components/Common/Notifications/NotificationsMessageTemplate';

export const NotificationsMessage: React.SFC<INotificationsMessage> = (props) => <NotificationsMessageTemplate { ...props } />;
