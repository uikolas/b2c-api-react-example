import * as React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import { SuperAttributeItem } from '../SuperAttributeItem/index';
import { SuperAttributeBlockProps as Props } from './types';
import { styles } from './styles';
import { FormattedMessage } from 'react-intl';

export const SuperAttributeBlockComponent: React.SFC<Props> = props => {
    const {classes, attributeData, selectedItemValue} = props;

    const selectAttribute = (value: string) => {
        const {onValueChanged, attributeData: {name}} = props;

        onValueChanged({name, value});
    };

    return (
        <div className={classes.attributeBlock}>
            <h4 className={classes.attributeTitle}>
                <FormattedMessage id={ 'word.select.title' } /> { attributeData.nameToShow }:
            </h4>

            <div className={classes.attributesList}>
                {attributeData.data.map(attribute => (
                    <SuperAttributeItem
                        key={attribute.value.length > 0 ? attribute.value : attribute.name}
                        attributeItemData={attribute}
                        onSelect={() => selectAttribute(attribute.value)}
                        isSelected={
                            attribute.value.length > 0
                                ? attribute.value === selectedItemValue
                                : attribute.name === selectedItemValue
                        }
                    />
                ))}
            </div>
        </div>
    );
}

export const SuperAttributeBlock = withStyles(styles)(SuperAttributeBlockComponent);
