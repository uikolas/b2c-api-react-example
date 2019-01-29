import React from 'react';
import {
    NotificationsMessageTemplate,
    INotificationsMessage
} from 'src/shared/components/Common/Notifications/NotificationsMessageTemplate';

export const NotificationsMessage: Function = (props: INotificationsMessage) => <NotificationsMessageTemplate {...props} />;
