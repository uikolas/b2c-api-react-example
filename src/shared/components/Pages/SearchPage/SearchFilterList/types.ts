import { WithStyles } from '@material-ui/core/styles/withStyles';
import { styles } from './styles';
import { RangeFacets, ValueFacets } from 'src/shared/interfaces/searchPageData';
import { TActiveFilters, TActiveRangeFilters } from 'src/shared/components/Pages/SearchPage/types';

export interface ISearchFilterListProps extends WithStyles<typeof styles> {
    filters: ValueFacets[];
    updateFilterHandler: Function;
    activeValuesFilters: TActiveFilters;
    ranges: RangeFacets[];
    activeValuesRanges: TActiveRangeFilters;
    updateRangeHandler: Function;
    onCloseFilterHandler: Function;
    onAfterChangeRangeFilter: (value: number[]) => void;
    isFiltersReset: boolean;
    isProductsExist?: boolean;
}
