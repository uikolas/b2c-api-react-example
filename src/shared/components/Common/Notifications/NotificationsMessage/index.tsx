import React from 'react';
import {
    NotificationsMessageTemplate,
    INotificationsMessageTemplate
} from 'src/shared/components/Common/Notifications/NotificationsMessageTemplate';

export const NotificationsMessage: React.SFC<INotificationsMessageTemplate> = (props) =>
    <NotificationsMessageTemplate { ...props } />;
