import * as React from 'react';
import { withStyles } from '@material-ui/core';
import { SuperAttributeBlock } from './SuperAttributeBlock';
import { ProductSuperAttributeProps as Props, ProductSuperAttributeState as State } from './types';
import { ISuperAttribute } from '@helpers/product/types';
import { styles } from './styles';

export class ProductSuperAttributeComponent extends React.PureComponent<Props, State> {
    public state: State = {
        selectedValues: null,
        selectedItemValue: ''
    };

    private onChange = ({name, value}: {name: string, value: string}) => {
        const {selectedValues} = this.state;
        const updatedValues = selectedValues === null
            ? {[name]: value}
            : {
                ...selectedValues,
                [name]: value
            };

        this.props.onChange({name, value});
        this.setState({
            selectedValues: updatedValues,
            selectedItemValue: value
        });
    };

    public render() {
        const {classes, productData} = this.props;

        return (
            <div className={classes.root}>
                {
                    productData.map((attribute: ISuperAttribute) => (
                        <SuperAttributeBlock
                            attributeData={attribute}
                            onValueChanged={this.onChange}
                            key={attribute.name}
                            selectedItemValue={this.state.selectedItemValue}
                        />
                    ))
                }
            </div>
        );
    }
}

export const ProductSuperAttribute = withStyles(styles)(ProductSuperAttributeComponent);
