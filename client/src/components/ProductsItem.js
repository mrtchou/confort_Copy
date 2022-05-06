import React from 'react';
import { Col, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { PRODUCT_ROUTE } from '../utils/consts';

const ProductsItem = ({ product }) => {
    const navigate = useNavigate();     // on utilise useNavigate pour la redirection

    // On structure l'affichage des produits pour la page shop
    return (
        <Col className='productItem' /* className='mt-5 d-flex -justify-content-between' */ md={3} onClick={() => navigate(PRODUCT_ROUTE + '/' + product.id)}>
            <Card className='productItemCard' /* style={{width: 200, height: 330, cursor: 'pointer'}} border='light' */>
                <Card.Img className='productItemImg' src={process.env.REACT_APP_API_URL + product.img} width={200} height={200} />
                <Card.Body>
                    <Card.Title>{product.name}</Card.Title>
                    <Card.Text>{product.price}€</Card.Text>
                </Card.Body>
            </Card>
        </Col>
    );
};

export default ProductsItem;