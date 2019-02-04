import * as React from 'react';
import { connect } from './connect';
import withStyles from '@material-ui/core/styles/withStyles';
import { styles } from './styles';
import {
    ProductConfiguratorAddToCartProps as Props,
    ProductConfiguratorAddToCartState as State,
    IProductQuantityParams
} from './types';
import Grid from '@material-ui/core/Grid/Grid';
import { SprykerForm } from '@components/UI/SprykerForm';
import { SprykerButton } from '@components/UI/SprykerButton';
import { FormattedMessage } from 'react-intl';
import { concreteProductType } from '@interfaces/product';
import { IFormSettings } from '@components/UI/SprykerForm/types';
import { ClickEvent } from '@interfaces/common/react';
import { NotificationsMessage } from '@components/Common/Notifications/NotificationsMessage';
import { typeNotificationError } from '@constants/notifications';
import { ICartAddItem } from '@interfaces/cart';
import { createCartItemAddToCart } from '@helpers/cart';
import { createQuantityVariants } from '@helpers/product';

const quantitySelectedInitial = 1;

@connect
export class ProductConfiguratorAddToCartBase extends React.Component<Props, State> {
    public state: any = {
        quantitySelected: quantitySelectedInitial,
        isBuyBtnDisabled: true,
        isProcessCartLoading: false,
        quantity: null,
        availability: false,
        sku: null
    };

    public static getDerivedStateFromProps(nextProps: any, prevState: any) {

        if (nextProps.productType === concreteProductType && nextProps.sku !== prevState.sku) {
            return {
                sku: nextProps.sku,
                quantitySelected: quantitySelectedInitial,
                quantity: nextProps.product.quantity,
                availability: nextProps.product.availability
            };
        }

        return null;
    }

    public componentDidUpdate(prevProps: Props, prevState: State) {
        this.checkBuyBtnStatus();
    }

    public handleProductQuantityChange = (
        event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement>
    ): void => {
        const valueParsed: number = Number.parseInt(event.target.value, 10);
        const {quantitySelected} = this.state;

        if (quantitySelected !== valueParsed) {
            this.setState({quantitySelected: valueParsed});
        }
    };

    private canShowQuantity = () => (
        Boolean(this.props.productType === concreteProductType && this.state.availability)
    );

    private checkBuyBtnStatus = () => {
        if (this.state.isProcessCartLoading) {
            return;
        }
        if (this.state.isBuyBtnDisabled && this.canShowQuantity()) {
            this.setState({isBuyBtnDisabled: false});
        } else if (!this.state.isBuyBtnDisabled && !this.canShowQuantity()) {
            this.setState({isBuyBtnDisabled: true});
        }
    };

    public handleBuyBtnClick = (event: ClickEvent): void => {
        this.runProcessCart();
    };

    private runProcessCart = async (): Promise<void> => {
        try {
            await this.setState({
                isBuyBtnDisabled: true,
                isProcessCartLoading: true
            });
            await this.runAddToCart();

            await this.setState((prevState: State) => ({
                ...prevState,
                quantity: this.props.product.quantity,
                availability: this.props.product.availability,
                quantitySelected: quantitySelectedInitial,
                isBuyBtnDisabled: false,
                isProcessCartLoading: false
            }));
        } catch (error) {
            NotificationsMessage({
                id: 'error.durning.add.product.to.cart.message',
                type: typeNotificationError
            });
        }
    };

    private runAddToCart = async (): Promise<void> => {
        const item: ICartAddItem = createCartItemAddToCart(this.props.sku, this.state.quantitySelected);
        if (this.props.isUserLoggedIn && this.props.cartId) {
            await this.props.addItemToCart(item, this.props.cartId);
        } else {
            if (this.props.isUserLoggedIn) {
                await this.props.createCartAndAddItem(this.props.payloadForCreateCart, item);
            } else {
                await this.props.addItemGuestCart(item, this.props.anonymId);
            }
        }
    };

    public getQuantityFormSettings = (params: IProductQuantityParams): IFormSettings => {
        const {
            inputValue,
            quantity,
            onChangeHandler,
            controlsGroupClassName
        } = params;
        const formSettings: IFormSettings = {
            formName: 'quantityForm',
            controlsGroupClassName,
            onChangeHandler,
            onSubmitHandler: (event: React.FormEvent<HTMLFormElement>) => {
                console.info('Empty quantity Submit');
            },
            fields: [
                [
                    {
                        type: 'select',
                        inputName: 'quantity',
                        inputValue,
                        spaceNumber: 4,
                        isRequired: false,
                        label: <FormattedMessage id={'word.quantity.title'} />,
                        isError: false,
                        menuItems: createQuantityVariants(quantity)
                    }
                ]
            ]
        };

        return formSettings;
    };

    public render(): JSX.Element {
        const {classes} = this.props;

        const formQuantitySettings: IFormSettings = this.getQuantityFormSettings({
            inputValue: this.state.quantitySelected,
            quantity: this.state.quantity,
            onChangeHandler: this.handleProductQuantityChange,
            controlsGroupClassName: classes.controlsGroupQuantity
        });

        return (
            <>
                <Grid container>
                    {this.canShowQuantity() &&
                    <Grid item xs={12} md={12} className={classes.blockControl}>
                        <SprykerForm
                            form={formQuantitySettings}
                            formClassName={classes.formQuantity}
                        />
                    </Grid>
                    }
                </Grid>

                <Grid container>
                    <Grid item xs={12} md={12} className={classes.buyBtnParent}>
                        <SprykerButton
                            title={<FormattedMessage id={'add.to.cart.button.title'} />}
                            extraClasses={classes.buyBtn}
                            onClick={this.handleBuyBtnClick}
                            disabled={this.state.isBuyBtnDisabled}
                        />
                    </Grid>
                </Grid>
            </>
        );
    }
}

export const ProductConfiguratorAddToCart = withStyles(styles)(ProductConfiguratorAddToCartBase);
