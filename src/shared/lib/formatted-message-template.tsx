import React from 'react';
import { FormattedMessage } from 'react-intl';

export const FormattedMessageTemplate: React.SFC<React.ReactNode> = (message: string) =>
    <FormattedMessage id={ message } />;
