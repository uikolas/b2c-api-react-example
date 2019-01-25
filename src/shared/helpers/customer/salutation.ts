import { TSalutationVariant } from 'src/shared/interfaces/customer';
import { SalutationVariants } from 'src/shared/constants/customer';

export const getSalutationToShow = (salutation: TSalutationVariant['value']) => {
    const salutationVariantData = SalutationVariants.filter((item: TSalutationVariant) => (item.value === salutation));

    return (salutationVariantData && salutationVariantData[0])
        ? salutationVariantData[0].label
        : salutation;
};
