import { TSalutationVariant } from 'src/interfaces/customer/index';
import { SalutationVariants } from 'src/constants/customer/index';

export const getSalutationToShow = (salutation: TSalutationVariant['value']) => {
    const salutationVariantData = SalutationVariants.filter((item: TSalutationVariant) => (item.value === salutation));

    return (salutationVariantData && salutationVariantData[0])
        ? salutationVariantData[0].label
        : salutation;
};
