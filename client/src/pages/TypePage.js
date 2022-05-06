import React, { useState, useEffect, useContext } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { fetchProducts } from '../http/productAPI';
import { fetchTypes } from '../http/typeAPI';
import { useParams, useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { PRODUCT_ROUTE } from '../utils/consts';
import { Context } from '..';

const TypePage = observer(() => {
    const { products } = useContext(Context);         // On recupere les types pour les afficher dans la NavBar 
    const [product, setProduct] = useState([]);     // On declare pour stocker les produits recuperer
    const navigate = useNavigate();                 // On utilise pour la redirection
    let { id } = useParams();                         // On recupere l'id pour charger la page avec la categorie concernee

    // On recupere les types et les produits
    useEffect(() => {
        fetchTypes().then(data => products.setTypes(data))
        fetchProducts().then(data => setProduct(data))
    }, []);


    // On filtre les produits recupere par typeId et on les affichent
    return (
        <Container className='shopContainer' >
            <Row>
                {product.filter(product => product.typeId === Number(id)).map(filteredProduct =>
                    <Col
                        md={3}
                        key={filteredProduct.id}
                        className='productItem'
                        onClick={() => navigate(PRODUCT_ROUTE + '/' + filteredProduct.id)}
                    >
                        <Card className='productItemCard'>
                            <Card.Img variant="top" src={process.env.REACT_APP_API_URL + filteredProduct.img} width={200} height={200} />
                            <Card.Body>
                                <Card.Title>{filteredProduct.name}</Card.Title>
                                <Card.Text>{filteredProduct.price}€</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                )}
            </Row>
        </Container>
    );
});

export default TypePage;