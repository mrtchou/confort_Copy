import React, { useContext, useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import ProductsList from '../components/ProductsList';
import { observer } from 'mobx-react-lite';
import { Context } from '..';
import { fetchTypes } from '../http/typeAPI';
import { fetchProducts } from '../http/productAPI';

const Shop = observer(() => {
    const { products } = useContext(Context);         // On va chercher les produits et les types grace a useContexte

    // Fonction pour afficher les categories dans la NavBar
    useEffect(() => {
        fetchTypes().then(data => products.setTypes(data))
        fetchProducts(null).then(data => products.setProducts(data))
    }, [products]);


    // On importe la liste des produits depuis le component ProductList et on l'affiche
    return (
        <Container>
            <Row>
                <Col>
                    <ProductsList />
                </Col>
            </Row>
        </Container>
    );
});

export default Shop;