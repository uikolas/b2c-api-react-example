import * as React from 'react';
import { INotFoundProps as Props, INotFoundState as State } from './types';
import { FormattedMessage } from 'react-intl';

export class NotFound extends React.PureComponent<Props, State> {
    public displayName: string = 'NotFound';

    public componentDidCatch(error: Error | null, info: object) {
        console.error('NotFound->componentDidCatch->error', error);
        console.error('NotFound->componentDidCatch->info', info);
    }

    public render() {
        return (
            <React.Fragment>
                <div className={this.props.className || ''}>
                    <FormattedMessage id={ 'page.not.found.message' } />
                </div>
            </React.Fragment>
        );
    }
}

export default NotFound;
