import api from 'src/shared/services/api';
import { parseProductResponse } from 'src/shared/helpers/product';
import {
    getProductAvailabilityFulfilledStateAction,
    getProductAvailabilityPendingStateAction,
    getProductAvailabilityRejectedStateAction,
    getProductDataFulfilledStateAction,
    getProductDataItemPendingStateAction,
    getProductDataRejectedStateAction,
} from '@stores/actions/pages/product';
import { ApiServiceAbstract } from 'src/shared/services/apiAbstractions/ApiServiceAbstract';
import { IConcreteProductAvailability, IProductDataParsed, TProductSKU } from 'src/shared/interfaces/product/index';
import { parseProductAvailabilityResponse } from 'src/shared/helpers/product/productResponse';
import { IApiResponseData } from 'src/shared/services/types';
import { NotificationsMessage } from '@components/Common/Notifications/NotificationsMessage';
import { typeMessageError } from 'src/shared/constants/notifications';

export class ProductService extends ApiServiceAbstract {
    public static async getAbstractData(dispatch: Function, sku: string): Promise<void> {
        try {
            dispatch(getProductDataItemPendingStateAction());
            const response: IApiResponseData = await api.get(`abstract-products/${sku}`, {
                include: 'abstract-product-image-sets,' +
                'abstract-product-prices,' +
                'abstract-product-availabilities,' +
                'concrete-products,' +
                'concrete-product-image-sets,' +
                'concrete-product-prices,' +
                'concrete-product-availabilities',
            });

            if (response.ok) {
                const responseParsed: IProductDataParsed = parseProductResponse(response.data);
                dispatch(getProductDataFulfilledStateAction(responseParsed));
            } else {
                const errorMessage = this.getParsedAPIError(response);
                dispatch(getProductDataRejectedStateAction(errorMessage));
                NotificationsMessage({
                    messageWithCustomText: 'request.error.message',
                    message: errorMessage,
                    type: typeMessageError
                });
            }

        } catch (error) {
            dispatch(getProductDataRejectedStateAction(error.message));
            NotificationsMessage({
                messageWithCustomText: 'unexpected.error.message',
                message: error.message,
                type: typeMessageError
            });
        }
    }

    public static async getConcreteProductAvailability(dispatch: Function,
                                                       sku: TProductSKU): Promise<IConcreteProductAvailability | null> {
        try {
            dispatch(getProductAvailabilityPendingStateAction());
            const response: IApiResponseData = await api.get(
                `concrete-products/${sku}/concrete-product-availabilities`
            );

            if (response.ok) {
                const responseParsed: null | IConcreteProductAvailability = parseProductAvailabilityResponse(
                    response.data
                );
                dispatch(getProductAvailabilityFulfilledStateAction(responseParsed));

                return responseParsed;
            } else {
                const errorMessage = this.getParsedAPIError(response);
                dispatch(getProductAvailabilityRejectedStateAction(errorMessage));
                NotificationsMessage({
                    messageWithCustomText: 'request.error.message',
                    message: errorMessage,
                    type: typeMessageError
                });
            }

        } catch (error) {
            dispatch(getProductAvailabilityRejectedStateAction(error.message));
            NotificationsMessage({
                messageWithCustomText: 'unexpected.error.message',
                message: error.message,
                type: typeMessageError
            });
        }
    }
}
