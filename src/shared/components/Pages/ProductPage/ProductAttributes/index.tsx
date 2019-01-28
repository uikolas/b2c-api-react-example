import * as React from 'react';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { IProductAttributeNames, IProductAttributes } from 'src/shared/interfaces/product';
import { styles } from './styles';
import { FormattedMessage } from 'react-intl';


interface ProductAttributesProps extends WithStyles<typeof styles> {
    attributes: IProductAttributes;
    attributeNames: IProductAttributeNames | null;
}

export const ProductAttributesBase: React.SFC<ProductAttributesProps> = (props): JSX.Element => {
    const { classes, attributes, attributeNames } = props;
    if (!attributes) {
        return null;
    }

    return (
        <div>
            <Typography component="h3" color="inherit" className={ classes.attributesTitle }>
                <FormattedMessage id={ 'product.details.title' } />
            </Typography>
            <Grid container justify="center" className={ classes.root }>
                { Object.entries(attributes).map((data: [ string, string ]) => {
                    return (
                        <Grid key={ data[ 0 ] } item xs={ 12 } sm={ 12 } md={ 6 } className={ classes.element }>
                            <Typography component="div" color="inherit" gutterBottom={ true }
                                        className={ classes.valuesBlock }>
                                <p>
                                    <Typography variant="subheading" component="strong">
                                        { `${attributeNames[ data[ 0 ] ]
                                            ? attributeNames[ data[ 0 ] ]
                                            : <FormattedMessage id={ 'no.tramslations.title' } />}: `
                                        }
                                    </Typography>
                                </p>
                                <Typography variant="subheading" component="span">
                                    { data[ 1 ] }
                                </Typography>
                            </Typography>
                        </Grid>
                    );
                })
                }
            </Grid>
        </div>
    );
};

export const ProductAttributes = withStyles(styles)(ProductAttributesBase);
