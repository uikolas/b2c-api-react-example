import { TSalutationVariant } from '../../interfaces/customer';
import {
    SalutationVariantMr,
    SalutationVariantMs,
    SalutationVariantMrs,
    SalutationVariantDr
} from '../../translation/index';

export const SalutationVariants: Array<TSalutationVariant> = [
    {
        value: SalutationVariantMr,
        label: `${SalutationVariantMr}.`,
    },
    {
        value: SalutationVariantMs,
        label: `${SalutationVariantMs}.`,
    },
    {
        value: SalutationVariantMrs,
        label: `${SalutationVariantMrs}.`,
    },
    {
        value: SalutationVariantDr,
        label: `${SalutationVariantDr}.`,
    },
];
