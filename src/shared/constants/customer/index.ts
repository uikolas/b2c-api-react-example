import { TSalutationVariant } from '@interfaces/customer';
import { FormattedMessageTemplate } from 'src/shared/lib/formatted-message-template';

const SalutationVariantMrValue = 'Mr';
const SalutationVariantMrsValue = 'Mrs';
const SalutationVariantDrValue = 'Dr';
const SalutationVariantMsValue = 'Ms';

export const SalutationVariants: Array<TSalutationVariant> = [
    {
        value: SalutationVariantMrValue,
        label: FormattedMessageTemplate('salutation.variant.mr')
    },
    {
        value: SalutationVariantMsValue,
        label: FormattedMessageTemplate('salutation.variant.ms')
    },
    {
        value: SalutationVariantMrsValue,
        label: FormattedMessageTemplate('salutation.variant.mrs')
    },
    {
        value: SalutationVariantDrValue,
        label: FormattedMessageTemplate('salutation.variant.dr')
    },
];
