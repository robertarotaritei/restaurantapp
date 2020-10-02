import React from 'react';
import Grid from '@material-ui/core/Grid';
import Product from './Product';

const ProductsList = (props) => {
    return(
    <Grid container spacing={24} style={{padding: 15}}>
        { props.products.map(currentProduct => (
            <Grid item xs={12} sm={6} lg={4} xl={3}>
                <Product key={currentProduct.id} product={currentProduct} productType={props.productType}/>
            </Grid>
        ))}
    </Grid>
    )
}
export default ProductsList