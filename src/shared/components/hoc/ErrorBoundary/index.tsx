import * as React from 'react';

interface IState {
    hasError: boolean;
    error: Error | null;
    info: object;
}

interface IProps {
}

export class ErrorBoundary extends React.PureComponent<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            hasError: false,
            error: null,
            info: null,
        };
    }

    public componentDidCatch(error: Error | null, info: object) {
        // Display fallback UI
        this.setState({hasError: true, error, info});
        console.error('ErrorBoundary->componentDidCatch->error', error);
        console.error('ErrorBoundary->componentDidCatch->info', info);
    }

    public render() {
        if (this.state.hasError) {
            // You can render any custom fallback UI
            return <h1>{this.state.error.toString()}</h1>;
        }

        return this.props.children;
    }
}
