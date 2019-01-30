import React from 'react';
import {
    NotificationsMessageTemplate,
    INotificationsMessage
} from 'src/shared/components/Common/Notifications/NotificationsMessageTemplate';
import { toast } from 'react-toastify';
import { SuccessIcon, RejectIcon } from '../MessageIcons';
import {
    typeMessageWarning,
    typeMessageSuccess,
    typeMessageError
} from 'src/shared/constants/notifications';

export const NotificationsMessage: Function = (props: INotificationsMessage) => {
    const {type} = props;
    let toastType;
    let iconComponent;

    switch (type) {
        case typeMessageError:
            iconComponent = <RejectIcon />;
            toastType = toast.TYPE.ERROR;
            break;
        case typeMessageSuccess:
            iconComponent = <SuccessIcon />;
            toastType = toast.TYPE.SUCCESS;
            break;
        case typeMessageWarning:
            toastType = toast.TYPE.WARNING;
            break;
        default:
            toastType = toast.TYPE.DEFAULT;
            iconComponent = null;
    }

    const propsForMessage = {
        ...props,
        icon: iconComponent
    }

    return (
        toast(<NotificationsMessageTemplate {...propsForMessage} />, {
            type: toastType
        })
    );
};
