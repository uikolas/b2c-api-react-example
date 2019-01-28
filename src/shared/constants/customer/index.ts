import { TSalutationVariant } from '@interfaces/customer';
import {
    SalutationVariantMr,
    SalutationVariantMs,
    SalutationVariantMrs,
    SalutationVariantDr
} from 'src/shared/translation';

export const SalutationVariants: TSalutationVariant[] = [
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
