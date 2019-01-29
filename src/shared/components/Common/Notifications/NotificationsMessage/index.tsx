import React from 'react';
import {
    NotificationsMessageTemplate,
    INotificationsMessage
} from 'src/shared/components/Common/Notifications/NotificationsMessageTemplate';
import { toast } from 'react-toastify';

export const NotificationsMessage: Function = (props: INotificationsMessage) => {
    const {type} = props;
    let toastType;

    switch (type) {
        case 'error':
            toastType = toast.TYPE.ERROR;
            break;
        case 'success':
            toastType = toast.TYPE.SUCCESS;
            break;
        case 'warning':
            toastType = toast.TYPE.WARNING;
            break;
        default:
            toastType = toast.TYPE.DEFAULT;
    }

    return (
        toast(<NotificationsMessageTemplate {...props} />, {
            type: toastType
        })
    );
};
