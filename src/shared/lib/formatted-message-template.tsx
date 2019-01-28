import React from 'react';
import { FormattedMessage } from 'react-intl';

export const FormattedMessageTemplate: React.SFC<any> = (message: string) => <FormattedMessage id={ message } />;
