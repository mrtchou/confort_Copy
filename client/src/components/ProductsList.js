import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { Context } from '..';
import ProductsItem from './ProductsItem';
import { Row } from 'react-bootstrap';

const ProductsList = observer(() => {
    const { products } = useContext(Context);

    // structure la liste des produits
    return (
        <Row className='d-flex'>
            {products.products.map(product =>
                <ProductsItem key={product.id} product={product} />
            )}
        </Row>
    );
});

export default ProductsList;